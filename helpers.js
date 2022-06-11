function getUserLatitude() {
  return new Promise((res) => {
    navigator.geolocation.getCurrentPosition((position) => {
    res(position.coords.latitude)
  });
  });
}
function getClosestLatitude(userLatitude, latitudes) {
  // from: https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
return latitudes.reduce(function(prev, curr) {
  return (Math.abs(curr - userLatitude) < Math.abs(prev - userLatitude) ? curr : prev);
});
}