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
    showTodayImage(weatherObject.list[0].weather[0].icon);
    let humidity = weatherObject.list[0].main.humidity;
    document.getElementById('humidity').innerText = 'Humidity: ' + humidity + ' %';
    let windSpeed = weatherObject.list[0].wind.speed;
    document.getElementById('windSpeed').innerText = 'Wind speed: ' + windSpeed + ' m/s';
}

function showWeekForecast(weatherObject) {
    let weatherList = weatherObject.list;
    let forecastArray = groupByDays(weatherList);
    forecastArray.forEach(showDayForecast);
}

function showDayForecast(dayData, index) {
    showWeekDay(dayData, index);
    showDayTemp(dayData, index);
    showDayImage(dayData, index);

}

function showWeekDay(dayData, index) {
    let date = dayData[0].dt_txt;
    let tmp = new Date(date);
    let weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    document.getElementsByClassName('day-of-week')[index].innerText = weekday[tmp.getDay()];
}

function showDayTemp(dayData, index) {
    let maxTemp, minTemp;
    maxTemp = minTemp = dayData[0].main.temp;
    for (var i = 1; i < dayData.length; i++) {
        if (dayData[i].main.temp > maxTemp) {
            maxTemp = dayData[i].main.temp;
        }
        if (dayData[i].main.temp < minTemp) {
            minTemp = dayData[i].main.temp;
        }
    }
    document.getElementsByClassName('max-temp')[index].innerText = Math.round(maxTemp) + String.fromCharCode(176);
    document.getElementsByClassName('min-temp')[index].innerText = Math.round(minTemp) + String.fromCharCode(176);

}

function getImageSrc(weatherImageId) {
    let ImageForShow;
    if (weatherImageId.startsWith('01') || weatherImageId.startsWith('02')) {
        ImageForShow = weatherImageId;
    } else {
        ImageForShow = weatherImageId.substr(0, 2);
    }
    return 'images/weatherImg/' + ImageForShow + '.svg';
}

function showDayImage(dayData, index){
    console.log("dayData: ", dayData, "Index: ", index);
    if (index === 0) {
        let weatherImageId = dayData[0].weather[0].icon;
        document.getElementsByClassName('weatherForecastImg')[0].src = getImageSrc(weatherImageId);
     }else {
        for(var i = 0; i < dayData.length; i++){
            let weatherImageId = dayData[4].weather[0].icon;
            document.getElementsByClassName('weatherForecastImg')[index].src = getImageSrc(weatherImageId);
        }
    }
}

function groupByDays(weatherList) {
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
    return forecastArray;
}

function extractDate(value) {
    return value.dt_txt.substr(0, 10);
}

function showTodayImage(imageId) {
    document.getElementById('weatherImage').src = getImageSrc(imageId);
}


let inputField = document.getElementById('cityInput');
inputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("findCityBtn").click();
    }
});
