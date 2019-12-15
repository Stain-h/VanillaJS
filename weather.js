const weather = document.querySelector(".js-weather");

const API_KEY ="b0f91d813289efa2c0a96bba53ddfa62";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
         .then(function(response){
            return response.json();  
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)) 
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError() {
    console.log('Cannt found your geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError) 
}

function loadCoord() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null ) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init() {
    loadCoord();
}

init();