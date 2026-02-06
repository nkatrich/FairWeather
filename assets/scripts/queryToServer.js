const APIKey = '3d8e7f9f1caac1280ad2e13b68cc7d70';
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast';

let properURL = buildWeatherUrl('казань');

fetch(properURL).then(res => {
    if (!res.ok) {
        throw new Error('Something wrong');
    }
    return res.json();
}).then(data => {
    console.log(data.list);
}).catch(err => {
    console.error(err);
})

function buildWeatherUrl(city) {
    return `${baseURL}?q=${city}&units=metric&lang=ru&appid=${APIKey}`;
}