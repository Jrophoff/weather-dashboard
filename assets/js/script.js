// api key
let apiKey = "d3c97a47070993975a1faeb682d45853";

// date format
let date0 = moment().format("L");
let date1 = moment().add(1, 'day').format("L");
let date2 = moment().add(2, 'day').format("L");
let date3 = moment().add(3, 'day').format("L");
let date4 = moment().add(4, 'day').format("L");
let date5 = moment().add(5, 'day').format("L");

// submit button with enter key
$(".form").on("keyup", ".form-control", function (e) {
    e.preventDefault();
    if ("Enter" === e.originalEvent.code) {
        let city = $("#cityInput").val();

        // console.log(e.originalEvent.code);

        // local history
        let weatherHistory = JSON.parse(localStorage.getItem("list"))

        if (weatherHistory === null) {
            weatherHistory = []
        }

        if (weatherHistory.length === 8) {
            weatherHistory.shift()
        }
        weatherHistory.push(city)

        let history = $("<div class='btn mb-2' btn-secondary>")
        history.text(city)

        $("#prevSearch").prepend(history);

        localStorage.setItem("list", JSON.stringify(weatherHistory))


        getWeatherByCity(city);
    };
});

// submit button click function
$("#submitBtn").click(function () {
    let city = $("#cityInput").val();

    // local history
    let weatherHistory = JSON.parse(localStorage.getItem("list"))

    if (weatherHistory === null) {
        weatherHistory = []
    }

    if (weatherHistory.length === 8) {
        weatherHistory.shift()
    }
    weatherHistory.push(city)

    let history = $("<div class='btn mb- 2'btn-secondary>")
    history.text(city)

    $("#prevSearch").prepend(history);

    localStorage.setItem("list", JSON.stringify(weatherHistory))

    getWeatherByCity(city);
})

// retrieve from local history 
function showList() {

    let weatherHistory = JSON.parse(localStorage.getItem("list"))

    if (weatherHistory !== null) {
        for (let i = 0; i < weatherHistory.length; i++) {
            let history = $("<div class='btn mb-2 btn-secondary'>")
            history.text(weatherHistory[i])
            $("#prevSearch").prepend(history);

        }
    }
}

// previous search buttons
$("#prevSearch").on("click", ".btn", function () {
    let city = $(this).text();
    getWeatherByCity(city);
});

// API by city
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

                // call API by coordinates
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
// API by coordinates
let getWeatherByCoord = function (lat, lon) {

    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;


    fetch(apiUrl).then(function (response) {

        if (response.ok) {
            response.json().then(function (data) {

                console.log(data);

                uvi = data.current.uvi;

                // current forecast
                $("#currentDate").html(date0);
                $("#img0").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");
                $("#currentCity").html(data.name);
                $("#temp0").html(data.current.temp + "°F");
                $("#wind0").html(data.current.wind_speed + " MPH");
                $("#humidity0").html(data.current.humidity + "%");
                $("#uvIndex").html(uvi);
                // day one of five day
                $("#first").html(date1);
                $("#img1").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png");
                $("#temp1").html(data.daily[1].temp.day + "°F");
                $("#wind1").html(data.daily[1].wind_speed + " MPH");
                $("#humidity1").html(data.daily[1].humidity + "%");
                // day two of five day
                $("#second").html(date2);
                $("#img2").attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png");
                $("#temp2").html(data.daily[2].temp.day + "°F");
                $("#wind2").html(data.daily[2].wind_speed + " MPH");
                $("#humidity2").html(data.daily[2].humidity + "%");
                // day three of five day
                $("#third").html(date3);
                $("#img3").attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png");
                $("#temp3").html(data.daily[3].temp.day + "°F");
                $("#wind3").html(data.daily[3].wind_speed + " MPH");
                $("#humidity3").html(data.daily[3].humidity + "%");
                // day four of five day
                $("#fourth").html(date4);
                $("#img4").attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png");
                $("#temp4").html(data.daily[4].temp.day + "°F");
                $("#wind4").html(data.daily[4].wind_speed + " MPH");
                $("#humidity4").html(data.daily[4].humidity + "%");
                //day five of five day
                $("#fifth").html(date5);
                $("#img5").attr("src", "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + ".png");
                $("#temp5").html(data.daily[1].temp.day + "°F");
                $("#wind5").html(data.daily[1].wind_speed + " MPH");
                $("#humidity5").html(data.daily[1].humidity + "%");

                // uv index
                if (uvi > 2 && uvi <= 5.99) {
                    $("#uvIndex").addClass("moderate").removeClass("high very-high");
                } else if (uvi >= 6 && uvi <= 7.99) {
                    $("#uvIndex").addClass("high").removeClass("moderate very-high");
                } else if (uvi >= 8) {
                    $("#uvIndex").addClass("very-high").removeClass("moderate high");
                } else if (uvi <= 2) {
                    $("#uvIndex").removeClass("moderate high very-high");
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




getWeatherByCity("Grand Rapids");
showList();


