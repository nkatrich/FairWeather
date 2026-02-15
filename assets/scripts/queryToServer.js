const APIKey = '3d8e7f9f1caac1280ad2e13b68cc7d70';

const baseURLWeather = 'https://api.openweathermap.org/data/2.5/weather';
const baseURLForecast = 'https://api.openweathermap.org/data/2.5/forecast';

let units = "metric";
let unitsState = true;

// load state
const bgLoading = document.querySelector('.bg-loading');

// msg if wrong query
const messageNotFound = document.querySelector('.message-not-found');

async function getCurrentWeather(city, units) {
    const res = await fetch(`${baseURLWeather}?q=${city}&units=${units}&lang=ru&appid=${APIKey}`);
    return await res.json();
}

async function getForecast(city, units) {
    const res = await fetch(`${baseURLForecast}?q=${city}&units=${units}&lang=ru&appid=${APIKey}`);
    return await res.json();
}

async function loadWeather(city, units) {
    try {
        bgLoading.classList.add('active');
        const [weather, forecast] = await Promise.all([
        getCurrentWeather(city, units),
        getForecast(city, units)
        ])

        bgLoading.classList.remove('active');
        const data = fixAPIDataToProperUI(weather, forecast, units);
        renderData(data);
    }
    catch (err) {
        messageNotFound.classList.add('show');
        setTimeout(() => {
            messageNotFound.classList.remove('show');
        }, 5000);
    }
}

function debounce(fn, delay) {
    let timer;

    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
        fn.apply(this, args);
        }, delay);
    }
}

const inputSearchLocation = document.querySelector('.input-search-location');
let value = inputSearchLocation.value;

inputSearchLocation.addEventListener("input", debounce(e => {
    value = e.target.value.trim();
    if (value) {
        loadWeather(value, units);
    }
}, 500));

loadWeather('Казань', units)

const toggleCOrF = document.querySelector('.toggle-c-or-f');

toggleCOrF.addEventListener('click', () => {
    if (unitsState) {
        units = "imperial";
        loadWeather(value, units);
        toggleCOrF.classList.add('f');
    }
    else {
        units = "metric";
        loadWeather(value, units);
        toggleCOrF.classList.remove('f');
    }
    unitsState = !unitsState;
})