const canvas = document.querySelector("#planisphereContainer");
const ctx = canvas.getContext("2d");
const dpi = window.devicePixelRatio;

// temporary: the amount used to offset the starwheel relative to the height of the holder
const ratio = 0.529032258064516;

// fixes canvas blur
(function fix_dpi() {
    //create a style object that returns width and height
    let style = {
        height() {
            return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
        },
        width() {
            return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
        }
    }
    //set the correct attributes for a crystal clear image!
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
})();

function loadImage(url, imgObj) {
  return new Promise((res, rej) => {
    imgObj.addEventListener('load', function() {
      res();
    }, false);
    imgObj.src = url; // Set source path
  });
}

// from: https://riptutorial.com/html5-canvas/example/19169/scaling-image-to-fit-or-fill-
// scales the images to fit into canvas while preserving their aspect ratio
function scaleToFit(img){
    // get the scale
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    // ctx.drawImage(img, x, y, img.width * scale, img.height * scale); 
    return {scale, x, y};   
}

// load holder image
const holderImg = new Image();
loadImage("./images/holder52.png", holderImg)
.then(() => {
  const {scale, x, y} = scaleToFit(holderImg)
  const starwheelCenter = holderImg.height * scale * (1 - ratio);
  // to make top of starwheel visible
  const offset = holderImg.width * scale / 20;
  // load starwheel image
  const starwheelImg = new Image();
  loadImage("./images/starwheel52.png", starwheelImg)
  .then(() => {
    ctx.drawImage(starwheelImg, x, starwheelCenter - holderImg.width / 2 * scale + offset, holderImg.width * scale, holderImg.width * scale);    
    ctx.drawImage(holderImg, x, y + offset, holderImg.width * scale, holderImg.height * scale);    
  });
});

fetch("./data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then(async function(data) {
    const { latitudes } = data;
    // get user latitude
    const userLatitude = await getUserLatitude();
    const latitude = getClosestLatitude(userLatitude, latitudes);
    console.log(latitude);
    // get correct images
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });



// get local time
// const date = new Date();
// const hours = date.getHours();
// const minutes = date.getMinutes();
// get latitude
// navigator.geolocation.getCurrentPosition((position) => {
//   console.log(position.coords.latitude);
// });

// might need to make an async function to await image and latitude