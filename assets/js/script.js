var apiKey = "d3c97a47070993975a1faeb682d45853";
var cityInput = document.querySelector("#cityInput");

let date0 = moment().format("L");
let date1 = moment().add(1, 'day').format("L");
let date2 = moment().add(2, 'day').format("L");
let date3 = moment().add(3, 'day').format("L");
let date4 = moment().add(4, 'day').format("L");
let date5 = moment().add(5, 'day').format("L");


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
                // console.log(data);


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
               // city
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

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
   
   
    fetch(apiUrl).then(function (response) {
       
        if (response.ok) {
            response.json().then(function (data) {
        
               console.log(data);
            
               uvi = data.current.uvi

                // today
                $("#currentDate").append(date0);
                $("#icon0").append("<img src= 'http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png'>");
                $("#currentCity").append(data.name);
                $("#temp0").append(data.current.temp + " F");
                $("#wind0").append(data.current.wind_speed + " MPH");
                $("#humidity0").append(data.current.humidity + " %");
                $("#uvIndex").append(data.current.uvi);
                // day one of five day
                $("#first").append(date1);
                $("#icon1").append("<img src= 'http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png'>");
                $("#temp1").append(data.daily[1].temp.day + " F");
                $("#wind1").append(data.daily[1].wind_speed + " MPH");
                $("#humidity1").append(data.daily[1].humidity + " %");
                // day two of five day
                $("#second").append(date2);
                $("#icon2").append("<img src= 'http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png'>");
                $("#temp2").append(data.daily[2].temp.day + " F");
                $("#wind2").append(data.daily[2].wind_speed + " MPH");
                $("#humidity2").append(data.daily[2].humidity + " %");
                // day three of five day
                $("#third").append(date3);
                $("#icon3").append("<img src= 'http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png'>");
                $("#temp3").append(data.daily[3].temp.day + " F");
                $("#wind3").append(data.daily[3].wind_speed + " MPH");
                $("#humidity3").append(data.daily[3].humidity + " %");
                // day four of five day
                $("#fourth").append(date4);
                $("#icon4").append("<img src= 'http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png'>");
                $("#temp4").append(data.daily[4].temp.day + " F");
                $("#wind4").append(data.daily[4].wind_speed + " MPH");
                $("#humidity4").append(data.daily[4].humidity + " %");
                //day five of five day
                $("#fifth").append(date5);
                $("#icon5").append("<img src= 'http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + ".png'>");
                $("#temp5").append(data.daily[1].temp.day + " F");
                $("#wind5").append(data.daily[1].wind_speed + " MPH");
                $("#humidity5").append(data.daily[1].humidity + " %");

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




getWeatherByCity("Hudsonville");

