var weatherApiKey = "866183740dfa40d11281c75ed90d5b60"

var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var city = JSON.parse(localStorage.getItem('searchedCity'));
var lat = JSON.parse(localStorage.getItem('lat'));
var lon = JSON.parse(localStorage.getItem('lon'));
var citySearched = document.getElementById("citySearched");
var date = document.getElementById("date");
var iconWeather = document.getElementById("icon");
var temperature = document.getElementById("temp");
var humidity = document.getElementById("hum");
var wind = document.getElementById("wind");
var date = document.getElementById("date");
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
        // // save latitude and longitude in local storage
        localStorage.setItem("lat",JSON.stringify(lat));
        localStorage.setItem("lon",JSON.stringify(lon));

        citySearched.textContent = " " + data.name;
        date.textContent = " " + data.timezone;
        icon = data.weather[0].icon;
        console.log(icon)
        iconWeather.src="https://openweathermap.org/img/wn/" + icon + "@2x.png";
        // icon.innerHTML= "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        temperature.textContent = " " + data.main.temp + "°C";
        // temp.innerHTML = " " + data.main.temp + "°C";
        humidity.textContent = " " + data.main.humidity + "%";
        wind.textContent = " " +data.wind.speed + "m/s";    

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
