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