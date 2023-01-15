var weatherApiKey = "866183740dfa40d11281c75ed90d5b60"

var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var city = JSON.parse(localStorage.getItem('searchedCity'));
let lat = JSON.parse(localStorage.getItem('lat'));
let lon = JSON.parse(localStorage.getItem('lon'));


// save user city input in local storage when clicking search button.
function saveCity () {
    var currentCity = cityInput.value;
    localStorage.setItem("searchedCity",JSON.stringify(currentCity));
    console.log (currentCity);
}

searchBtn.addEventListener("click",saveCity);

// get city coordinates using user city input
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
        console.log(lat)
        var lon =data[0].lon;
        console.log(lon)
        // save latitude and longitude in local storage
        localStorage.setItem("lat",JSON.stringify(lat));
        localStorage.setItem("lon",JSON.stringify(lon));
    })
}
getCoordinates();

// Current weather and forecast for 5 days for user city input, usign city, lat and log from local storage:
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
getWeather();