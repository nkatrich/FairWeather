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
const listNextDays = document.querySelector('.list-next-days');

function fixAPIDataToProperUI(data, data2, units) {
    // code for proper UI from API data
    console.log(data, data2)

    
    // round number
    const currentDeg = Math.round(data.main.temp);
    const currentFelDeg = Math.round(data.main.feels_like);
    const currentSpdWnd = units == "metric" ? `${Math.round(data.wind.speed)} мет/с` : `${Math.round(data.wind.speed)} мил/ч`;

    // define emoji by weather and make first letter high register
    const idOfDecsWeather = data.weather[0].id;
    // const odOfDecsForecast = dat
    let decsWeather = data.weather[0].description;
    let emojiForWeather;

    if (idOfDecsWeather >= 200 && idOfDecsWeather < 300) emojiForWeather = "⛈️";
    if (idOfDecsWeather >= 300 && idOfDecsWeather < 400) emojiForWeather = "🌦️";
    if (idOfDecsWeather >= 500 && idOfDecsWeather < 600) emojiForWeather = "🌧️";
    if (idOfDecsWeather >= 600 && idOfDecsWeather < 700) emojiForWeather = "❄️";
    if (idOfDecsWeather >= 700 && idOfDecsWeather < 800) emojiForWeather = "🌫️";
    if (idOfDecsWeather === 800) emojiForWeather = "☀️";
    if (idOfDecsWeather > 800) emojiForWeather = "☁️";

    let splitedDecsWeather = decsWeather.split("");
    splitedDecsWeather[0] = splitedDecsWeather[0].toUpperCase();
    const UIDecsWeather = `${emojiForWeather} ${splitedDecsWeather.join("")}`;

    // define direction of wind
    const drcOfWindDeg = data.wind.deg;
    let drcOfWind;

    if (drcOfWindDeg >= 337.5 || drcOfWindDeg < 22.5) drcOfWind = 'Северный';
    else if (drcOfWindDeg < 67.5) drcOfWind = 'Северо-восточный';
    else if (drcOfWindDeg < 112.5) drcOfWind = 'Восточный';
    else if (drcOfWindDeg < 157.5) drcOfWind = 'Юго-восточный';
    else if (drcOfWindDeg < 202.5) drcOfWind = 'Южный';
    else if (drcOfWindDeg < 247.5) drcOfWind = 'Юго-западный';
    else if (drcOfWindDeg < 292.5) drcOfWind = 'Западный';
    else if (drcOfWindDeg < 337.5) drcOfWind = 'Северо-западный';
    
    // define time of sunset and sunrise
    const dateSunrise = data.sys.sunrise;
    const dateSunset = data.sys.sunset;
    const timeDateSunrice = new Date(dateSunrise * 1000).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });
    const timeDateSunset = new Date(dateSunset * 1000).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });
    // other defines
    // define location
    const location = `${data.name}, ${data.sys.country}`
    // define humidity
    const humidity = `${data.main.humidity}%`

    // forecast
    const minDeg = [];
    const maxDeg = [];
    const idOfDecsforecast = [];
    const emojiForForecast = [];
    const dateForecast = [];
    const dateForecastUI = [];
    let j = 0;
    let splited;
    
    for (i of data2.list) {
        if (i.dt_txt.includes("00:00:00")) {
            idOfDecsforecast.push(i.weather[0].id);
            minDeg.push(Math.round(i.main.temp_min));
            maxDeg.push(Math.round(i.main.temp_max));
            
            if (emojiForForecast.length != 5) {
                if (idOfDecsforecast[j] >= 200 && idOfDecsforecast[j] < 300) emojiForForecast.push("⛈️");
                else if (idOfDecsforecast[j] >= 300 && idOfDecsforecast[j] < 400) emojiForForecast.push("🌦️");
                else if (idOfDecsforecast[j] >= 500 && idOfDecsforecast[j] < 600) emojiForForecast.push("🌧️");
                else if (idOfDecsforecast[j] >= 600 && idOfDecsforecast[j] < 700) emojiForForecast.push("❄️");
                else if (idOfDecsforecast[j] >= 700 && idOfDecsWeather[j] < 800) emojiForForecast.push("🌫️");
                else if (idOfDecsforecast[j] === 800) emojiForForecast.push("☀️");
                else if (idOfDecsforecast[j] > 800) emojiForForecast.push("☁️");
            }
            
            dateForecast.push(i.dt_txt);
            splited = dateForecast[j].split(' ')
            dateForecastUI.push(splited[0])
            
            j++;
        }
    }
    return {location, UIDecsWeather, currentDeg, currentFelDeg, currentSpdWnd, humidity, drcOfWind, timeDateSunrice, timeDateSunset, minDeg, maxDeg, emojiForForecast, dateForecastUI};
}

function renderData(data) {
    mainCurrentLocation.innerText = `${data.location}`;
    mainCurrentWeatherDecs.innerText = `${data.UIDecsWeather}`;
    mainCurrentWeatherDeg.innerText = `${data.currentDeg}°`;
    mainCurrentWeatherFelDegId.innerText = `${data.currentFelDeg}°`;
    extraCurrentHumidityId.innerText = `${data.humidity}`;
    extraCurrentSpdWndId.innerText = ` ${data.currentSpdWnd}`;
    extraCurrentDrctWndId.innerText = `${data.drcOfWind}`;
    sunriceId.innerText = `${data.timeDateSunrice}`;
    sunsetId.innerText = `${data.timeDateSunset}`;
    listNextDays.innerHTML = '';

    for (let i = 0; i < 5; i++) {
       listNextDays.insertAdjacentHTML('beforeend', `<div class="next-day"><span class="icon-next-day">${data.emojiForForecast[i]}</span><h2 class="min-and-max-deg">${data.minDeg[i]}° / ${data.maxDeg[i]}°</h2><h3 class="date-next-day">${data.dateForecastUI[i]}</h3></div>`);
    }
}