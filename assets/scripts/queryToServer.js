const APIKey = '3d8e7f9f1caac1280ad2e13b68cc7d70';

const baseURLWeather = 'https://api.openweathermap.org/data/2.5/weather';
const baseURLForecast = 'https://api.openweathermap.org/data/2.5/forecast';
const baseURLGeo = 'https://api.openweathermap.org/geo/1.0/direct';

let properURL = buildWeatherURL('казань');

fetch(properURL).then(res => {
    if (!res.ok) {
        throw new Error('Something wrong');
    }
    return res.json();
}).then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
})

function buildWeatherURL(city) {
    return `${baseURLWeather}?q=${city}&units=metric&lang=ru&appid=${APIKey}`;
}