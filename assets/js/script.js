let apiKey = "d3c97a47070993975a1faeb682d45853";

let date0 = moment().format("L");
let date1 = moment().add(1, 'day').format("L");
let date2 = moment().add(2, 'day').format("L");
let date3 = moment().add(3, 'day').format("L");
let date4 = moment().add(4, 'day').format("L");
let date5 = moment().add(5, 'day').format("L");


let currentCity = document.querySelector("#currentCity");
let currentDate = document.querySelector("#currentDate");
let temp = document.querySelector("#temp")
let wind = document.querySelector("#wind")
let humidity = document.querySelector("#humidity")

// local storage
let search0 = "";
let search1 = "";
let search2 = "";
let search3 = "";
let search4 = "";
let search5 = "";
let search6 = "";
let search7 = "";

// pull from locat storage
// $("#recentSearch0").html(localStorage.getItem("search0"));
// $("#recentSearch0").html(localStorage.getItem("search1"));
// $("#recentSearch0").html(localStorage.getItem("search2"));
// $("#recentSearch0").html(localStorage.getItem("search3"));
// $("#recentSearch0").html(localStorage.getItem("search4"));
// $("#recentSearch0").html(localStorage.getItem("search5"));
// $("#recentSearch0").html(localStorage.getItem("search6"));
// $("#recentSearch0").html(localStorage.getItem("search7"));

$(".form").on("keyup", ".form-control", function (e) {
    if ("Enter" === e.originalEvent.code)
    city = $("#cityInput").val();
   
    getWeatherByCity(city);
    
});

$("#submitBtn").click(function () {
    city = $("#cityInput").val();

    

    // localStorage.setItem(search7 = search6);
    // localStorage.setItem(search6 = search5);
    // localStorage.setItem(search5 = search4);
    // localStorage.setItem(search4 = search3);
    // localStorage.setItem(search3 = search2);
    // localStorage.setItem(search2 = search1);
    // localStorage.setItem(search1 = search0);
    // localStorage.setItem(search0 = city);


    
    getWeatherByCity(city);
});

// api by city
let getWeatherByCity = function (city) {

    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;


    fetch(apiUrl).then(function (response) {

        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);

                lat = data.coord.lat;
                lon = data.coord.lon;
                // city
                $("#currentCity").html(data.name);

                // call other API functions
                getWeatherByCoord(lat, lon);

            });
        } else {
            alert("Error: city not found");
        }

    })
        .catch(function (error) {

            alert("Unable to connect to weather");
        });
};
// api by cooridantes
let getWeatherByCoord = function (lat, lon) {

    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;


    fetch(apiUrl).then(function (response) {

        if (response.ok) {
            response.json().then(function (data) {

                console.log(data);

                uvi = data.current.uvi;
                
                // today
                $("#currentDate").html(date0);
                $("#img0").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");
                $("#currentCity").html(data.name);
                $("#temp0").html(data.current.temp + "°F");
                $("#wind0").html(data.current.wind_speed + " MPH");
                $("#humidity0").html(data.current.humidity + " %");
                $("#uvIndex").html(uvi);
                // day one of five day
                $("#first").html(date1);
                $("#img1").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png");
                $("#temp1").html(data.daily[1].temp.day + "°F");
                $("#wind1").html(data.daily[1].wind_speed + " MPH");
                $("#humidity1").html(data.daily[1].humidity + " %");
                // day two of five day
                $("#second").html(date2);
                $("#img2").attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png");
                $("#temp2").html(data.daily[2].temp.day + "°F");
                $("#wind2").html(data.daily[2].wind_speed + " MPH");
                $("#humidity2").html(data.daily[2].humidity + " %");
                // day three of five day
                $("#third").html(date3);
                $("#img3").attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png");
                $("#temp3").html(data.daily[3].temp.day + "°F");
                $("#wind3").html(data.daily[3].wind_speed + " MPH");
                $("#humidity3").html(data.daily[3].humidity + " %");
                // day four of five day
                $("#fourth").html(date4);
                $("#img4").attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png");
                $("#temp4").html(data.daily[4].temp.day + "°F");
                $("#wind4").html(data.daily[4].wind_speed + " MPH");
                $("#humidity4").html(data.daily[4].humidity + " %");
                //day five of five day
                $("#fifth").html(date5);
                $("#img5").attr("src", "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + ".png");
                $("#temp5").html(data.daily[1].temp.day + "°F");
                $("#wind5").html(data.daily[1].wind_speed + " MPH");
                $("#humidity5").html(data.daily[1].humidity + " %");

                // uv Index
                if (uvi > 2 && uvi <= 5) {
                    $("#uvIndex").addClass("moderate");
                } else if (uvi >= 6 && uvi <= 7) {
                    $("#uvIndex").addClass("high");
                } else if (uvi >= 8) {
                    $("#uvIndex").addClass("very-high")
                }

            });
        } else {
            alert("Error: city not found");
        }

    })
        .catch(function (error) {

            alert("Unable to connect to weather");
        });
};




getWeatherByCity("detroit");

