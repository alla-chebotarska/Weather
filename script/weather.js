
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

function showWeather(weatherObject) {
    showCurrentWeather(weatherObject);
    showWeekForecast(weatherObject);
}

function showCurrentWeather(weatherObject) {
    document.getElementById('errorAlert').classList.add('hidden');
    document.getElementById('weather').classList.remove('hidden');
    let description = weatherObject.list[0].weather[0].description;
    document.getElementById('description').innerText = description;
    let temp = Math.round(weatherObject.list[0].main.temp);
    document.getElementById('temp').innerHTML = temp + ' &deg;C';
    let city = weatherObject.city.name;
    document.getElementById('location').innerText = city;
    showWeatherImage(weatherObject.list[0].weather[0].icon);
    let humidity = weatherObject.list[0].main.humidity;
    document.getElementById('humidity').innerText = 'Humidity: ' + humidity + ' %';
    let windSpeed = weatherObject.list[0].wind.speed;
    document.getElementById('windSpeed').innerText = 'Wing speed: ' + windSpeed + ' m/c';
}

function showWeekForecast(weatherObject) {
    let weatherList = weatherObject.list;
    let forecastArray = [];
    let tmpArray = [];
    weatherList.forEach(value => {
        if (tmpArray.length === 0) {
            tmpArray.push(value);
        } else {
            let date = extractDate(value);
            if (extractDate(tmpArray[0]) === date) {
                tmpArray.push(value);
            } else {
                forecastArray.push(tmpArray);
                tmpArray = [value];
            }
        }
    });
    console.log(forecastArray);
}

function extractDate(value) {
    return value.dt_txt.substr(0, 10);
}

function showWeatherImage(imageId) {
    let ImageForShow;
    if (imageId.startsWith('01') || imageId.startsWith('02')) {
        ImageForShow = imageId;
        console.log('imageId')
    } else {
        ImageForShow = imageId.substr(0, 2);
    }
    let imgSrc = 'images/weatherImg/' + ImageForShow + '.svg';
    document.getElementById('weatherImage').src = imgSrc;
}


let inputField = document.getElementById('cityInput');
inputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("findCityBtn").click();
    }
});
