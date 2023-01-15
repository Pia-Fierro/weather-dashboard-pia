var weatherApiKey = "866183740dfa40d11281c75ed90d5b60"

var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var city = JSON.parse(localStorage.getItem('searchedCity'));
var lat = JSON.parse(localStorage.getItem('lat'));
var lon = JSON.parse(localStorage.getItem('lon'));
var citySearched = document.getElementById("citySearched");
var currentDate = document.getElementById("date");
var iconImg = document.createElement("img");
var icon = "";
var weatherIcon = document.getElementById("weather-icon");
var currentTemperature = document.getElementById("temp");
var currentHumidity = document.getElementById("hum");
var currentWind = document.getElementById("wind");
// var now = new Date(); 
// var utc = new Date(now. getTime() + now. getTimezoneOffset() * 60000);

function main (event) {
    event.preventDefault();
    saveCity();
    getCoordinates();
}
searchBtn.addEventListener("click",main);

// save user city input in local storage when clicking search button.
function saveCity () {
    city = cityInput.value;
    localStorage.setItem("searchedCity",JSON.stringify(city));
    console.log (city);
}

// getting city coordinates to use in weather forecast and populating current weather
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getCoordinates() {
    let request = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherApiKey + "&units=metric";
    fetch(request)   
    .then(function(respose) {
            return respose.json();  
        })
    .then(function(data){
        console.log(data);

        lat =data.coord.lat;
        console.log(lat)
        lon =data.coord.lon;
        console.log(lon)
        // save latitude and longitude in local storage
        localStorage.setItem("lat",JSON.stringify(lat));
        localStorage.setItem("lon",JSON.stringify(lon));

        citySearched.textContent = " " + data.name;
        currentDate.textContent = " " + data.timezone;
        var icon = data.weather[0].icon;
        console.log(icon);
        iconImg.setAttribute("src","http://openweathermap.org/img/wn/" + icon + ".png");
        weatherIcon.appendChild(iconImg);
        currentTemperature.textContent = " " + data.main.temp + "°C";
        currentHumidity.textContent = " " + data.main.humidity + "%";
        currentWind.textContent = " " +data.wind.speed + "m/s";    

        getWeather();
    })
}

// Getting current weather and forecast usign city and lat & log from local storage:
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
function getWeather () {
    let request = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon+ "&appid=" + weatherApiKey
    fetch(request)   
    .then(function(respose) {
            return respose.json();  
        })
    .then(function(data){
        console.log(data);

    })
}
