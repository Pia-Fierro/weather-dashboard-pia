var weatherApiKey = "866183740dfa40d11281c75ed90d5b60"
// to get weather for 5 days:
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var city = JSON.parse(localStorage.getItem('searchedCity'));
var lat = JSON.parse(localStorage.getItem('lat'));
var lon = JSON.parse(localStorage.getItem('lon'));


// save user city input in local storage when clicking search button.
function saveCity () {
    var currentCity = cityInput.value;
    localStorage.setItem("searchedCity",JSON.stringify(currentCity));
    // console.log (currentCity);
}

searchBtn.addEventListener("click",saveCity,getCoordinates);

// get city coordinates using user city input
// to get coordinates by city:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

function getCoordinates() {
    let request = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + weatherApiKey;
    fetch(request)   
    .then(function(respose) {
            return respose.json();  
        })
    .then(function(data){
        console.log(data);

        var lat =data[0].lat;
        var lon =data[0].lon;
        // save latitude and longitude in local storage
        localStorage.setItem("lat",JSON.stringify(lat));
        localStorage.setItem("lon",JSON.stringify(lon));
    })
}
getCoordinates();

// to get the current weather for user city input, usign city, lat and log from local storage:
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
function getCurrentWeather () {
    let request = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + weatherApiKey
    fetch(request)   
    .then(function(respose) {
            return respose.json();  
        })
    .then(function(data){
        console.log(data);
        
    })
}
getCurrentWeather();