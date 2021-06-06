// isaac razabi
let gServise=[];
let gPositions = [];
const POSTIONS = "POSTIONS";

//get currante location of user throw broswer
function getPosition() {
  if (!navigator.geolocation) {
    alert("HTML5 Geolocation is not supported in your browser.");
    return;
  }
  //Geolocation : geographic location of a user or device on a Google map, through use of their browser's HTML5 Geolocation feature
  navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position) {
  console.log("position: ", position);
  document.getElementById("latitude").innerHTML = position.coords.latitude;
  document.getElementById("longitude").innerHTML = position.coords.longitude;
  document.getElementById("accuracy").innerHTML = position.coords.accuracy;

  var date = new Date(position.timestamp);
  document.getElementById("timestamp").innerHTML =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  initMap(position.coords.latitude, position.coords.longitude);
}

function initMap(lat, lng) {
  let elMap = document.querySelector("#map");
  let options = {
    center: { lat, lng },
    zoom: 16,
  };

  //create the map : get 2 parmaters : loaction on dom and options (zoom and coords)
  let map = new google.maps.Map(elMap, options);
  gPositions = loadFromStorage("POSTIONS");

  // listen to click event on map, get 3 paramters : the map , the event type and a function that hold the coords info of the click.
  // on every click the  postion is saved to on an array and on local storage.
  // the map is centerd to the new postion
  google.maps.event.addListener(map, "click", (event) => {
    //   console.log(event.latLng.toJSON())
    //   let pos = JSON.stringify(event.latLng.toJSON());
    gPositions.push(event.latLng.toJSON());
    saveToStorage(POSTIONS, gPositions);
    // createPlaceService(event.latLng.toJSON().lat,event.latLng.toJSON().lng, _makeId());
    // renderServise ();
    addMarker(event.latLng, map);
    map.setCenter(event.latLng, 16);
    renderPositions();
  });
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
}

function renderPositions() {
  let listOfPostions = loadFromStorage("POSTIONS");
  console.log(gPositions);
  let strHTML = "postions you were on :";
  listOfPostions.forEach((pos) => {
    strHTML += `
      <ul>
      <button onclick="onRemoveLocation( ${pos.lat}, ${pos.lng})"> remove loaction </button>
      <li> Latitude :  ${pos.lat} </li>
      <li> Longitude : ${pos.lng} </li>
      </ul>
        `;
  });
  let elpostitonList = document.querySelector(".postions");
  elpostitonList.innerHTML = strHTML;
}

function onRemoveLocation(lat, lng) {
  gPositions.forEach((pos, idx) => {
    if (pos.lat === lat && pos.lng === lng) gPositions.splice(idx, 1);
  });
  saveToStorage(POSTIONS, gPositions);
  renderPositions();
}

// function createPlaceService(lat, lng, name) {
//   let service = {
//     id: _makeId(),
//     lat,
//     lng,
//     name,
//   };
//   gServise.push(service)
// }

// function renderServise (){
//   let strHTML = '';
// strHTML+=`
// <table>
// <tr>
// <td>${gServise.name}</td>
// <td>${gServise.lat}</td>
// <td>${gServise.lng}</td>
// <td>${gServise.id}</td>
// </tr>
// </table>
// `
//   let elServise = document.querySelector(".servise")
//   elServise.innerHTML=strHTML;
// }

function _makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
