var weatherApiKey = "866183740dfa40d11281c75ed90d5b60"

var citySearchForm = document.getElementById("city-search-form")
var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var city = "";
var currentCity = "";
var historyCities = [];
var historyBtns = document.querySelector(".history-btn");
var lat = JSON.parse(localStorage.getItem('lat'));
var lon = JSON.parse(localStorage.getItem('lon'));
var citySearched = document.getElementById("citySearched");
var currentDate = document.getElementById("date");
var weatherIcon = document.getElementById("weather-icon");
var currentTemperature = document.getElementById("temp");
var currentHumidity = document.getElementById("hum");
var currentWind = document.getElementById("wind");

function main (event) {
    event.preventDefault();
    if (cityInput.value === "") {
        alert('please enter a city name');
    }
    saveCityHistory();
    getCoordinatesAndCurrentWeather();
}

searchBtn.addEventListener("click",main);
citySearchForm.addEventListener("submit",main);

// create array in local story with cities searched when clicking search button.
function saveCityHistory () {
    city = cityInput.value;
    // console.log (city);
    var currentCity = city
    if(historyCities.includes(currentCity)) {
        return;
    } else {
        historyCities.push(currentCity)
        localStorage.setItem("historyCities",JSON.stringify(historyCities))
    }
}

function btnHistory () {
    historyCities.value = JSON.parse(localStorage.getItem("historyCities"));
    // historyBtns.textContent = historyCities;

    for (var i=0; i <historyCities.length; i++) {
        var hBtn= document.createElement("button");
        hBtn.textContent=historyCities[i];
        historyBtns.appendChild(hBtn); 
        hBtn.addEventListener("click",getCoordinatesAndCurrentWeather);
    }
}

// getting city coordinates to use in weather forecast and populating current weather
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getCoordinatesAndCurrentWeather() {
    let request = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherApiKey + "&units=metric";
    fetch(request)   
    .then(function(respose) {
            return respose.json();  
        })
    .then(function(data){
        lat = data.coord.lat;
        lon = data.coord.lon;
        // save latitude and longitude in local storage
        localStorage.setItem("lat",JSON.stringify(lat));
        localStorage.setItem("lon",JSON.stringify(lon));

        // render current weather information
        citySearched.textContent = " " + data.name + " ";
        var date = dayjs().format('D/M/YYYY')
        currentDate.textContent = date;
        var iconCurrent= document.getElementById("weather-icon")
        var icon = data.weather[0].icon;
        iconCurrent.src="http://openweathermap.org/img/wn/" + icon + ".png";
        currentTemperature.textContent = " " + data.main.temp + "°C";
        currentHumidity.textContent = " " + data.main.humidity + "%";
        currentWind.textContent = " " +data.wind.speed + "m/s";    

        getForecast();
        btnHistory();
    })
}

// Getting Forecast usign lat & log from local storage and populating forecast for 5 days:
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
function getForecast () {
    let request = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon+ "&appid=" + weatherApiKey + "&units=metric";
    fetch(request)   
    .then(function(respose) {
            return respose.json();  
        })
    .then(function(data){
        
        day1();
        day2();
        day3();
        day4();
        day5();
    
        function day1 () {
            // date day 1 
            var dt_txt = data.list[8].dt_txt;
            var dayF = dt_txt.slice(8,10);
            var monthF = dt_txt.slice(5,7);
            var yearF = dt_txt.slice(0,4);
            var forecastDate = dayF + "/" + monthF + "/" + yearF;
            var forecastDate1 = document.getElementById("dateF1");
            forecastDate1.textContent = forecastDate;
            var iconF1 = document.getElementById("iconF1")
            var icon = data.list[8].weather[0].icon
            iconF1.src ="https://openweathermap.org/img/wn/" + icon + ".png";
            var temperature1 = document.getElementById("tempF1");
            temperature1.textContent= data.list[8].main.temp + "°C";
            var wind1 = document.getElementById("windF1");
            wind1.textContent = data.list[8].wind.speed + "m/s"
            var humidity1 = document.getElementById("humF1");
            humidity1.textContent = data.list[8].main.humidity + "%";
            var forecastDays = document.querySelector(".day1");
            forecastDays.classList.add("color");
        }

        function day2 () {
            var dt_txt = data.list[16].dt_txt;
            var dayF = dt_txt.slice(8,10);
            var monthF = dt_txt.slice(5,7);
            var yearF = dt_txt.slice(0,4);
            var forecastDate = dayF + "/" + monthF + "/" + yearF;
            var forecastDate2 = document.getElementById("dateF2");
            forecastDate2.textContent = forecastDate;
            var iconF2 = document.getElementById("iconF2")
            var icon = data.list[16].weather[0].icon
            iconF2.src ="https://openweathermap.org/img/wn/" + icon + ".png";           
            var temperature2 = document.getElementById("tempF2");
            temperature2.textContent= data.list[16].main.temp + "°C";
            var wind2 = document.getElementById("windF2");
            wind2.textContent = data.list[16].wind.speed + "m/s"
            var humidity2 = document.getElementById("humF2")
            humidity2.textContent = data.list[16].main.humidity + "%";
            var forecastDays = document.querySelector(".day2");
            forecastDays.classList.add("color");       
        }

        function day3 () {
            var dt_txt = data.list[24].dt_txt;
            var dayF = dt_txt.slice(8,10);
            var monthF = dt_txt.slice(5,7);
            var yearF = dt_txt.slice(0,4);
            var forecastDate = dayF + "/" + monthF + "/" + yearF;
            var forecastDate3 = document.getElementById("dateF3");
            forecastDate3.textContent = forecastDate;
            var iconF3 = document.getElementById("iconF3")
            var icon = data.list[24].weather[0].icon
            iconF3.src ="https://openweathermap.org/img/wn/" + icon + ".png";
            var temperature3 = document.getElementById("tempF3");
            temperature3.textContent= data.list[24].main.temp + "°C";
            var wind3 = document.getElementById("windF3");
            wind3.textContent = data.list[24].wind.speed + "m/s"
            var humidity3 = document.getElementById("humF3")
            humidity3.textContent = data.list[24].main.humidity + "%";
            var forecastDays = document.querySelector(".day3");
            forecastDays.classList.add("color");
        }

        function day4 () {
            var dt_txt = data.list[32].dt_txt;
            var dayF = dt_txt.slice(8,10);
            var monthF = dt_txt.slice(5,7);
            var yearF = dt_txt.slice(0,4);
            var forecastDate = dayF + "/" + monthF + "/" + yearF;
            var forecastDate4 = document.getElementById("dateF4");
            forecastDate4.textContent = forecastDate;
            var iconF4 = document.getElementById("iconF4")
            var icon = data.list[32].weather[0].icon
            iconF4.src ="https://openweathermap.org/img/wn/" + icon + ".png";           
            var temperature4 = document.getElementById("tempF4");
            temperature4.textContent= data.list[32].main.temp + "°C";
            var wind4 = document.getElementById("windF4");
            wind4.textContent = data.list[32].wind.speed + "m/s"
            var humidity4 = document.getElementById("humF4")
            humidity4.textContent = data.list[32].main.humidity + "%";
            var forecastDays = document.querySelector(".day4");
            forecastDays.classList.add("color");       
        }

        function day5 () {
            var dt_txt = data.list[39].dt_txt;
            var dayF = dt_txt.slice(8,10);
            var monthF = dt_txt.slice(5,7);
            var yearF = dt_txt.slice(0,4);
            var forecastDate = dayF + "/" + monthF + "/" + yearF;
            var forecastDate5 = document.getElementById("dateF5");
            forecastDate5.textContent = forecastDate;
            var iconF5 = document.getElementById("iconF5")
            var icon = data.list[39].weather[0].icon
            iconF5.src ="https://openweathermap.org/img/wn/" + icon + ".png";           
            var temperature5 = document.getElementById("tempF5");
            temperature5.textContent= data.list[39].main.temp + "°C";            
            var wind5 = document.getElementById("windF5");
            wind5.textContent = data.list[39].wind.speed + "m/s"
            var humidity5 = document.getElementById("humF5")
            humidity5.textContent = data.list[39].main.humidity + "%";
            var forecastDays = document.querySelector(".day5");
            forecastDays.classList.add("color");
        }
    })
}

