var apiKey = "d3c97a47070993975a1faeb682d45853";
var cityInput = document.querySelector("#cityInput");


var currentCity = document.querySelector("#currentCity");
var currentDate = document.querySelector("#currentDate");
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")

// local storage
var search0 = "";
var search1 = "";
var search2 = "";
var search3 = "";
var search4 = "";
var search5 = "";
var search6 = "";
var search7 = "";

var getWeatherByCity = function (city) {
   
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
   
   
    fetch(apiUrl).then(function (response) {
       
        if (response.ok) {
            response.json().then(function (data) {
                // use this example
                console.log(data);


                search7 = search6;
                search6 = search5;
                search5 = search4;
                search4 = search3;
                search3 = search2;
                search2 = search1;
                search1 = search0;
                search0 = city;
                lat = data.coord.lat
                lon = data.coord.lon
               

                // append to html
                $("#currentCity").append(data.name);
                
                // call other API functions
               getWeatherByCoord(lat,lon);
               getFiveDayByCity(city);
            });
        } else {
            alert("Error: city not found");
        }
        
    })
    .catch(function(error) {
        
        alert("Unable to connect to weather");
    });
};

var getWeatherByCoord= function (lat,lon) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=" + apiKey;
   
   
    fetch(apiUrl).then(function (response) {
       
        if (response.ok) {
            response.json().then(function (data) {
        
               console.log(data);
            //    var icon = "http://openweathermap.org/img/wn/10d@2x.png";
               uvi = data.current.uvi
                // append to html
                $("#icon").append(data.current.weather[0].icon);
                $("#currentCity").append(data.name);
                $("#temp").append(data.current.temp + " F");
                $("#wind").append(data.current.wind_speed + " MPH");
                $("#humidity").append(data.current.humidity + " %");
                $("#uvIndex").append(data.current.uvi);

                // not working
                if (uvi > 2) {
                    $("#uvIndex").addClass("moderate")
                } else if (uvi > 5) {
                    $("#uvIndex").addClass("high")
                } else if (uvi > 7) {
                    $("#uvIndex").addClass("very-high")
                    };

            });
        } else {
            alert("Error: city not found");
        }
        
    })
    .catch(function(error) {
        
        alert("Unable to connect to weather");
    });
};

var getFiveDayByCity = function (city) {
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

   
    fetch(apiUrl).then(function (response) {
       
        if (response.ok) {
            response.json().then(function (data) {
               
               
                // append to html

                console.log(data);
               
            });
        } else {
            // alert("Error: city not found");
        }
        
    })
    .catch(function(error) {
        // notice this ',catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to weather");
    });
};


getWeatherByCity("El Paso");

