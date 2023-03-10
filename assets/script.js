const apikey = "4d653892b2e11424f6c1a302d548c236";

var lat;
var lon;
const searchCity = document.querySelector(".form-search");
const searchButton = document.querySelector("#search-butn");




// add event listener for when user enters city name and clicks on search button
document.getElementById("search-butn").addEventListener("click", getCityAPI);



//gets current weather and long and lat coordinates for city
async function getCityAPI() {
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
        saveSearch(searchCity);
    
       // adds city weather variables and adds city data to page
        var currentIconlink = "https://openweathermap.org/img/w/"+data.weather[0].icon+".png"
        var icon = document.getElementById("current-icon")
        icon.src = currentIconlink
        
        document.getElementById("card-city").innerHTML = "City:   " +city;
        var currentTemp = data.main.temp
        document.getElementById("temp").innerHTML = "Temp:  " +currentTemp +"°C";
        var currentWind = data.wind.speed
        document.getElementById("wind").innerHTML = " Wind:  "+ currentWind + "MPH";
        var currentHummidity = data.main.humidity
        document.getElementById("humidity").innerHTML = " Humidity:  " + currentHummidity + "%";

        //save search to local storage
        function saveSearch(){

          localStorage.setItem("City", city);
        }

            
    })
}

// get the 5 day forecast weather data
async function getWeather(lat,lon){
    
      var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+lon+ "&units=metric" +"&appid=" + apikey;
        fetch(forecastURL)
           .then(function (response) {
            return response.json();
         })
           .then(function (data) {
            console.log(data)
        
          showForecast(data)    
});

// add the 5 day weather data to the cards
 function showForecast(data){
    for (i = 0; i < 5; i++) {
            
     
      var forecastIconLink = "https://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png"
      
           var icon = document.querySelector("#card"+i + "-icon")
            icon.src = forecastIconLink
            var temp = document.querySelector("#card"+i + "-temp")
            temp.innerHTML = "Temp: " + data.list[i].main.temp + "°C"
            var wind = document.querySelector("#card"+i + "-wind")
            wind.innerHTML = "Wind: " + data.list[i].wind.speed + "MPH"
            var humidity = document.querySelector("#card"+i + "-humidity")
            humidity.innerHTML = "Humidity: " + data.list[i].main.humidity + "%"
        
}}

}

//need to get only 1 instance of each data for 12:00:00 to use with forecast array as it is showing every 3 hours for each day
// dt_txt 
//"2023-01-17 12:00:00"

