function getUserLatitude() {
  return new Promise((res) => {
    navigator.geolocation.getCurrentPosition((position) => {
    res(position.coords.latitude);
  });
  // if geolocation can't get location within 4 seconds, set default to 50
  setTimeout(function() {
    res(50);
  }, 4000);
  });
}
function getClosestLatitude(userLatitude, latitudes) {
  // from: https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
return latitudes.reduce(function(prev, curr) {
  return (Math.abs(curr - userLatitude) < Math.abs(prev - userLatitude) ? curr : prev);
});
}
// from: https://riptutorial.com/html5-canvas/example/19169/scaling-image-to-fit-or-fill-
// scales the images to fit into canvas while preserving their aspect ratio
function scaleToFit(img){
    // get the scale
    img.canvasScale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    img.canvasX = (canvas.width / 2) - (img.width / 2) * img.canvasScale;
    img.canvasY = (canvas.height / 2) - (img.height / 2) * img.canvasScale;
}
function loadImage(url, imgObj) {
  return new Promise((res, rej) => {
    imgObj.addEventListener('load', function() {
      res();
    }, false);
    imgObj.src = url; // Set source path
  });
}