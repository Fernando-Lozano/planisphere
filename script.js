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

let holderImg, starwheelImg, degreestoJanFirst, rotate, ratio;
let latitude = 50; // the latitude that the page initially displays
const enlarge = 1.3; // used to enlarge the viewing window of the holder

async function main(latitude) {
  holderImg = new Image();
  starwheelImg = new Image();
  await loadImage(`./images/holder${latitude}.png`, holderImg);
  await loadImage(`./images/starwheel${latitude}.png`, starwheelImg);
  scaleToFit(holderImg);
  // to make top of starwheel visible
  holderImg.offset = holderImg.width * holderImg.canvasScale / 10;
  const starwheelCenter = holderImg.canvasY + holderImg.height * holderImg.canvasScale * Math.abs(1 - ratio);
  starwheelImg.canvasX = holderImg.canvasX;
  starwheelImg.canvasY = starwheelCenter - holderImg.width / 2 * holderImg.canvasScale;
  holderImg.canvasScale;
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
    addSelectInput(latitudes);
    await main(latitude);
    draw();
    setInterval(draw, 1800000); // draw every 20 minutes--temporary
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });