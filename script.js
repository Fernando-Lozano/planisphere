const canvas = document.querySelector("#planisphereContainer");
const ctx = canvas.getContext("2d");
const dpi = window.devicePixelRatio;

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
let latitude;
let degreestoJanFirst;
let rotate;
const enlarge = 1.3; // used to enlarge the viewing window of the holder

async function init(latitude, ratio) {
  await loadImage(`./images/holder${latitude}.png`, holderImg);
  await loadImage(`./images/starwheel${latitude}.png`, starwheelImg);
  scaleToFit(holderImg);
  // to make top of starwheel visible
  holderImg.offset = holderImg.width * holderImg.canvasScale / 10;
  const starwheelCenter = holderImg.canvasY + holderImg.height * holderImg.canvasScale * Math.abs(1 - ratio);
  starwheelImg.canvasX = holderImg.canvasX;
  starwheelImg.canvasY = starwheelCenter - holderImg.width / 2 * holderImg.canvasScale;
  holderImg.canvasScale;

  draw();
  setInterval(draw, 1800000); // every 20 minutes.
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
    ratio = data.ratio;
    degreestoJanFirst = data.degreestoJanFirst;
    // get user latitude
    const userLatitude = await getUserLatitude();
    latitude = getClosestLatitude(userLatitude, latitudes);
    // initialize with correct images
    init(latitude, ratio);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });