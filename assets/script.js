const apikey = "4d653892b2e11424f6c1a302d548c236";

var lat;
var lon;
const searchCity = document.querySelector(".form-search");
const searchButton = document.querySelector("#search-butn");




// add event listener for when user enters city name and clicks on search button
document.getElementById("search-butn").addEventListener("click", getCityAPI);



//gets current weather and long and lat coordinates for city
function getCityAPI() {
    let city = searchCity.value;
    var geoURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + apikey;

    fetch(geoURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        city = data.name;
        lat = data.coord.lat;
        lon = data.coord.lon;


        getWeather(lat,lon);
    
       // adds city data to page
        var currentIconlink = "https://openweathermap.org/img/w/"+data.weather[0].icon+".png"
        var icon = document.getElementById("current-icon")
        icon.src = currentIconlink
        
        document.getElementById("card-city").innerHTML = "City:   " +city;
        var currentTemp = data.main.temp
        document.getElementById("temp").innerHTML = "Temp:  " +currentTemp +"°C";
        var currentWind = data.wind.speed
        document.getElementById("wind").innerHTML = " Wind:  "+ currentWind;
        var currentHummidity = data.main.humidity
        document.getElementById("humidity").innerHTML = " Humidity:  " + currentHummidity;

            
    })
}

function getWeather(lat,lon){
    
      var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+lon+ "&units=metric" +"&appid=" + apikey;
    fetch(forecastURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        console.log(forecastURL);


        showForecast(data)
})




}

function showForecast(data){
    for (i = 0; i < 5; i++) {
            var humidity = data.list[i].main.humidity
            var icon = data.list[i].weather[0].icon
            var wind = data.list[i].wind.speed
            var temp = data.list[i].main.temp
            document.getElementsByClassName("card-text-temp").innerHTML = " Temp:  " + temp;
            console.log(wind);
            console.log(temp);
}
}

//get only 1 instance of each data for 12:00:00 to use with forecast array

//save search to local storage