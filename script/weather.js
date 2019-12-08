function findCity() {
    let city = document.getElementById('cityInput').value;
    if (city === '') {
        return;
    }
    let weather = getWeatherForCity(city);
    if (weather != null) {
        showWeather(weather);
    }
}

function getWeatherForCity(city) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=607cd3f34435efcbf7e597f25330293b&units=metric';
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

function showWeather(weatherObject) {
    document.getElementById('errorAlert').classList.add('hidden');
    document.getElementById('weather').classList.remove('hidden');
    let description = weatherObject.weather[0].description;
    document.getElementById('description').innerText = description;
    let temp = Math.round(weatherObject.main.temp);
    document.getElementById('temp').innerHTML = temp + ' &deg;C';
    let city = weatherObject.name;
    document.getElementById('location').innerText = city;
    showWeatherImage(weatherObject.weather[0].icon);
}

function showWeatherImage(imageId) {
    let cutImageId = imageId.substr(0, 2);
    let imgSrc = 'images/weatherImg/' + cutImageId + '.svg';
    document.getElementById('weatherImage').src = imgSrc ;
}

