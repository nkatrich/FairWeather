// DOM vars (render elements)
const mainCurrentLocation = document.querySelector('.main-current-location');
const mainCurrentWeatherDecs = document.querySelector('.main-current-weather-decs');
const mainCurrentWeatherDeg = document.querySelector('.main-current-weather-deg');
const mainCurrentWeatherFelDegId = document.querySelector('.main-current-weather-fel-deg-id');
const extraCurrentHumidityId = document.querySelector('.extra-current-humidity-id');
const extraCurrentSpdWndId = document.querySelector('.extra-current-spd-wnd-id');
const extraCurrentDrctWndId = document.querySelector('.extra-current-drct-wnd-id');
const sunriceId = document.querySelector('.sunrice-id');
const sunsetId = document.querySelector('.sunset-id');

function fixAPIDataToProperUI(data) {
    // code for proper UI from API data
    // round number
    const currentDeg = Math.round(data.main.temp);
    const currentFelDeg = Math.round(data.main.feels_like);
    const currentSpdWnd = Math.round(data.wind.speed);

    // define emoji by weather and make first letter high register
    

    mainCurrentLocation.innerText = `${data.name}, ${data.sys.country}`;
    mainCurrentWeatherDecs.innerText = `${data.weather[0].description}`;
    mainCurrentWeatherDeg.innerText = `${data.main.temp}°`;
    mainCurrentWeatherFelDegId.innerText = `${data.main.feels_like}°`;
    extraCurrentHumidityId.innerText = `${data.main.humidity}%`;
    extraCurrentSpdWndId.innerText = `${data.wind.speed} м/с`;
    extraCurrentDrctWndId.innerText = `${data.wind.deg}`;
    sunriceId.innerText = `${data.sys.sunrise}`;
    sunsetId.innerText = `${data.sys.sunset}`;
}

function renderData() {
    
}