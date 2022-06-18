function addSelectInput(latitudes) {
  console.log("hey");

  // add event listener
}
// from: https://riptutorial.com/html5-canvas/example/19169/scaling-image-to-fit-or-fill-
// scales the images to fit into canvas while preserving their aspect ratio
function scaleToFit(img){
    // get the scale
    img.canvasScale = Math.min(canvas.width / img.width, canvas.height / img.height) * enlarge;
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
// gets the degree to rotate the star wheel to.
function getRotation(latitude, degreestoJanFirst) {
  // get local time
  const now = new Date();
  let hour = now.getHours();
  // from: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay) - 1;
  const degPerDay = 360 / 365;
  const degPerHour = 360 / 24;
  let janFirst, currentHourDeg, deg, currentDayDeg;
  if (latitude >= 0) { // north of equator
    janFirst = degreestoJanFirst.north;
    hour = 24 - hour;
    currentHourDeg = (hour * degPerHour + 270) % 360 ;
    currentDayDeg = (janFirst + degPerDay * day) % 360;
  } else { // south of equator
    janFirst = degreestoJanFirst.south;
    currentHourDeg = (hour * degPerHour + 270) % 360;
    day = 365 - day;
    currentDayDeg = (janFirst + degPerDay * day) % 360;
  }
  if (currentDayDeg > currentHourDeg) {
    deg = 360 - currentDayDeg + currentHourDeg;
  } else {
    deg = currentHourDeg - currentDayDeg;
  }
  return deg;
}
// make function to draw images(should be callable at intervals to update relative to time)
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let rotate = getRotation(latitude, degreestoJanFirst);
  const x = holderImg.canvasX + (holderImg.width * holderImg.canvasScale) / 2;
  const y = starwheelImg.canvasY + holderImg.offset + (holderImg.width * holderImg.canvasScale) / 2;
  // Matrix transformation
  ctx.translate(x, y);
  ctx.rotate(rotate * Math.PI / 180);
  ctx.translate(-x, -y);
  // rotate starwheel
  ctx.drawImage(starwheelImg, holderImg.canvasX, starwheelImg.canvasY + holderImg.offset, holderImg.width * holderImg.canvasScale, holderImg.width * holderImg.canvasScale);

    // Matrix transformation
  ctx.translate(x, y);
  ctx.rotate(-rotate * Math.PI / 180);
  ctx.translate(-x, -y);

  ctx.drawImage(holderImg, holderImg.canvasX, holderImg.canvasY + holderImg.offset, holderImg.width * holderImg.canvasScale, holderImg.height * holderImg.canvasScale);  
}
    // get data to rotate starwheel to the correct position
  // move the draw image functions below into the function mentioned above
  // load starwheel image