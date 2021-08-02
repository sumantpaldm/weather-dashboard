//dom element refs
var searchBtnEl = document.getElementById("searchBtn")
var searchCityEl = document.getElementById("searchCity")
var boldDataEl = document.getElementById("boldData")
var tempMainEl = document.getElementById("tempMain")
var windMainEl = document.getElementById("windMain")
var humidMainEl = document.getElementById("humidMain")
var uvMainEl = document.getElementById("uvMain")
var forcastEl = document.getElementById("forcast")
let forcastBlock = document.createElement("div")
let colorBlock = document.querySelector(".color")

searchHistoryBtn();
let appDate = function (time) {
    let displayDate = new Date();
    displayDate.setTime(time * 1000);
    let dd = displayDate.getDate();
    let mm = displayDate.getMonth() + 1;
    let y = displayDate.getFullYear();
    return mm + '/' + dd + '/' + y;
}


var formSubmitHandler = function (event) {
    event.preventDefault();


    // get value from input element
    var cityName = searchCityEl.value.trim();


    if (cityName) {

        getInitialData(cityName);
        searchCityEl.value = "";
        history(cityName);
    } else {
        alert("Please enter a valid city !!!");
    }
};


var getInitialData = function (cityName) {

    let firstApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=ed2f4c47503611561c238cb4725495c3`;



    fetch(firstApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                let log = data[0].lon;
                let lat = data[0].lat;
                console.log(lat, log)
                getMainData(lat, log, cityName)

            });
        } else {
            alert('There was some error, enter the city again !!!');
        }
    });
};

var getMainData = function (lat, log, cityName) {


    let secondApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${log}&appid=ed2f4c47503611561c238cb4725495c3`;

    fetch(secondApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            boldDataEl.innerHTML = `<span class = "bold">${cityName}    (${appDate(data.current.dt)})  </span>   <img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" /> `
            tempMainEl.innerHTML = `Temp: ${data.current.temp} &#186F`
            windMainEl.innerHTML = `Wind: ${data.current.wind_speed} MPH`
            humidMainEl.innerHTML = `Humidity: ${data.current.humidity} %`
            uvMainEl.innerHTML = `UV Index: <span class = "color">      ${data.current.uvi}     </span>`
            $(".main").addClass("mainDisplay")


            if (data.current.uvi <= 2) {
                $(".color").addClass("green");
                $(".color").removeClass("yellow");
                $(".color").removeClass("red");
            } else if (data.current.uvi <= 5) {
                colorBlock.classList.add("yellow");
                colorBlock.classList.remove("green");
                colorBlock.classList.remove("red");
            } else {
                colorBlock.classList.add("red");
                colorBlock.classList.remove("yellow");
                colorBlock.classList.remove("green");
            }

            $(forcastBlock).empty()

            for (let i = 1; i < 6; i++) {
                let forcastBlock = document.createElement("div")
                forcastBlock.classList.add("fBlock")
                forcastBlock.classList.add("col")

                $(forcastBlock).append(appDate(data.daily[i].dt));
                $(forcastBlock).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
                $(forcastBlock).append("<p>Temp: " + data.daily[i].temp.day + " °F</p>");
                $(forcastBlock).append("<p>Wind: " + data.daily[i].wind_speed + " MPH</p>");
                $(forcastBlock).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");

                $(forcastEl).append(forcastBlock)
            }
        });
}



function history(cityName) {
    $("#historyButtons").empty();
    let savedCity = localStorage.getItem("cities")
    let cityConditional = savedCity ? JSON.parse(savedCity) : [];
    let currentCity = { cities: cityName }

    cityConditional.push(currentCity);

    localStorage.setItem("cities", JSON.stringify(cityConditional))

    searchHistoryBtn()
}

function searchHistoryBtn() {
    let cityList = localStorage.getItem("cities")
    listConditional = cityList ? JSON.parse(cityList) : []

    console.log("listConditional")

    for (let i = 0; i < listConditional.length; i++) {

        let historyBtn = document.createElement("button")
        historyBtn.setAttribute("data", (listConditional[i].cities))
        historyBtn.classList.add("buttons")
        historyBtn.textContent = (listConditional[i].cities)
        $("#historyButtons").append(historyBtn);
    }
}

$("#historyButtons").on("click", function (event) {
    getInitialData(event.target.textContent)
})



searchBtnEl.addEventListener('click', formSubmitHandler)