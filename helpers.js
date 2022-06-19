function addSelectInput(latitudes) {
  const select = document.createElement("select");
  latitudes.forEach(latitude => {
    const option = document.createElement("option");
    option.setAttribute("value", latitude);
    option.innerHTML = `Latitude ${latitude}`;
    select.appendChild(option);
  });
  select.value = latitude;
  document.querySelector(".container").appendChild(select);

  select.addEventListener("change", function(e) {
    main(e.target.value);
  });
}
// from: https://riptutorial.com/html5-canvas/example/19169/scaling-image-to-fit-or-fill-
// scales the images to fit into canvas while preserving their aspect ratio
function scaleToFit(){
  // get the scale
  holderImg.canvasScale = Math.min(canvas.width / holderImg.width, canvas.height / holderImg.height) * enlarge;
  // get the top left position of the image
  holderImg.canvasX = (canvas.width / 2) - (holderImg.width / 2) * holderImg.canvasScale;
  holderImg.canvasY = (canvas.height / 2) - (holderImg.height / 2) * holderImg.canvasScale;

    // to make top of starwheel visible
  holderImg.offset = holderImg.width * holderImg.canvasScale / 10;
  const starwheelCenter = holderImg.canvasY + holderImg.height * holderImg.canvasScale * Math.abs(1 - ratio);
  starwheelImg.canvasX = holderImg.canvasX;
  starwheelImg.canvasY = starwheelCenter - holderImg.width / 2 * holderImg.canvasScale;
  holderImg.canvasScale;
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