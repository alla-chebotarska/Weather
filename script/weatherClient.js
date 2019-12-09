
let CITY_PLACEHOLDER = '${CITY}';
let API_KEY = '607cd3f34435efcbf7e597f25330293b';
let BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + CITY_PLACEHOLDER + '&appid=' + API_KEY + '&units=metric';

function getWeatherForCity(city) {
    let url = BASE_URL.replace(CITY_PLACEHOLDER, city);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send();
    if (xmlHttp.status === 200) {
        let weather = JSON.parse(xmlHttp.responseText);
        return weather;
    } else {
        document.getElementById('errorAlert').classList.remove('hidden');
        document.getElementById('weather').classList.add('hidden');
        return null;
    }
}

