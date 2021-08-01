//dom element refs
var searchBtnEl = document.getElementById("searchBtn")
var searchCityEl = document.getElementById("searchCity")
// global vars url and empty array for history


//time plugins  day.js
let appDate = function (time) {
    let displayDate = new Date();
    displayDate.setTime(time * 1000);
    let dd = displayDate.getDate();
    let mm = displayDate.getMonth() + 1;
    let y = displayDate.getFullYear();
    return mm + '/' + dd + '/' + y;
}


//function to display search history list
//start at end of history array




//update the history in local storage and then it updates the history in display




// function to set the item the again



var formSubmitHandler = function (event) {
    event.preventDefault();


    // get value from input element
    var cityName = searchCityEl.value.trim();


    if (cityName) {

        getInitialData(cityName);
        searchCityEl.value = "";
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

var getMainData = function () {

    let secondApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ed2f4c47503611561c238cb4725495c3`;


}






















searchBtnEl.addEventListener('click', formSubmitHandler)