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

// load images
const holderImg = new Image();
const starwheelImg = new Image();

async function init(latitude) {
  await loadImage(`./images/holder${latitude}.png`, holderImg);
  await loadImage(`./images/starwheel${latitude}.png`, starwheelImg);
  scaleToFit(holderImg);
  const x = holderImg.canvasX;
  const y = holderImg.canvasY;
  const scale = holderImg.canvasScale;
  const starwheelCenter = y + holderImg.height * scale * Math.abs(1 - ratio);
  // to make top of starwheel visible
  const offset = holderImg.width * scale / 20;
  // load starwheel image
  ctx.drawImage(starwheelImg, x, starwheelCenter - holderImg.width / 2 * scale + offset, holderImg.width * scale, holderImg.width * scale);
  ctx.drawImage(holderImg, x, y + offset, holderImg.width * scale, holderImg.height * scale);  
  console.log(starwheelCenter); 
}

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
    // const latitude = 50;
    // initialize with correct images
    init(latitude);
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