<template>
  <div class="positions-list">
    <div class="postions"></div>
  <div id="map" style="width: 100%; height: 500px"></div>
  <div class="container flex">
    <table border="1">
      <tr>
        <td>Latitude</td>
        <td id="latitude"></td>
      </tr>
      <tr>
        <td>Longitude</td>
        <td id="longitude"></td>
      </tr>
      <tr>
        <td>Accuracy</td>
        <td id="accuracy"></td>
      </tr>
      <tr>
        <td>Timestamp</td>
        <td id="timestamp"></td>
      </tr>
    </table>
  </div>


</template>


<script>
   

let gService=[];
let gPositions = [];
const POSITIONS = "POSITIONS";

//get currant location of user throw browser
function getPosition() {
  if (!navigator.geolocation) {
    alert("HTML5 Geolocation is not supported in your browser.");
    return;
  }
  //Geolocation : geographic location of a user or device on a Google map, through use of their browser's HTML5 Geolocation feature
  navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position,time) {
  document.getElementById("latitude").innerHTML = position.lat;
  document.getElementById("longitude").innerHTML = position.lat;
  document.getElementById("accuracy").innerHTML = 20;

  var date = new Date(time);
  document.getElementById("timestamp").innerHTML =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  // initMap(position.coords.latitude, position.coords.longitude);
}
function handleMapEvents (map){
  gPositions =  getPositions();
  // listen to click event on map, get 3 parameters : the map , the event type and a function that hold the coords info of the click.
  // on every click the  position is saved to on an array and on local storage.
  // the map is centered to the new position
  google.maps.event.addListener(map, "click", (event) => {
    //   console.log(event.latLng.toJSON())
    //   let pos = JSON.stringify(event.latLng.toJSON());

    gPositions.push(event.latLng.toJSON());
    let time = Date.now()
    showLocation(event.latLng.toJSON(),time)
    saveToStorage(POSITIONS, gPositions);
    // createPlaceService(event.latLng.toJSON().lat,event.latLng.toJSON().lng, _makeId());
    // renderService ();
    addMarker(event.latLng, map);
    map.setCenter(event.latLng, 16);
    renderPositions();
  });
}

function initMap(lat, lng) {
  let elMap = document.querySelector("#map");
  let options = {
    center: { lat, lng },
    zoom: 16,
  };

  //create the map : get 2 parameters : location on dom and options (zoom and coords)
  let map = new google.maps.Map(elMap, options);
  handleMapEvents (map)
}

function handleLocationError(error) {
  var locationError = document.getElementById("locationError");

  switch (error.code) {
    case 0:
      locationError.innerHTML =
        "There was an error while retrieving your location: " + error.message;
      break;
    case 1:
      locationError.innerHTML =
        "The user didn't allow this page to retrieve a location.";
      break;
    case 2:
      locationError.innerHTML =
        "The browser was unable to determine your location: " + error.message;
      break;
    case 3:
      locationError.innerHTML =
        "The browser timed out before retrieving the location.";
      break;
  }
}

function addMarker(coords, map) {
  let marker = new google.maps.Marker({
    position: coords,
    map: map,
  });
  return marker;
}

function renderPositions() {
  let listOfPositions = getPositions();
  let strHTML = "Positions you were on :";
  listOfPositions.forEach((pos) => {
    strHTML += `
      <ul>
      <button onclick="onRemoveLocation( ${pos.lat}, ${pos.lng})"> remove location </button>
      <li> Latitude :  ${pos.lat} </li>
      <li> Longitude : ${pos.lng} </li>
      </ul>
        `;
  });
  let elPositionList = document.querySelector(".postions");
  elPositionList.innerHTML = strHTML;
}

function onRemoveLocation(lat, lng) {
  removeLocation (lat,lng)
  renderPositions();
}
function getPositions(){
   let positions = loadFromStorage("POSITIONS")||[];
   return positions;
}

function removeLocation (lat,lng){
    let listOfPositions = getPositions();
    listOfPositions.forEach((pos, idx) => {
      if (pos.lat === lat && pos.lng === lng) gPositions.splice(idx, 1);
    });
    saveToStorage(POSITIONS, gPositions);
}

function createLocation(){
    let location = {
        id,
        name,
        lat,
        lng,
        weather,
        createdAt,
        updateAt,
    }
    return location
}

function checkIfExist (id){
  let isExist=  GeolocationPosition.every(location => location.is===id);
  if(isExist) return false;
  if(!isExist) return true;
}

</script>
