var searchBtnEl = document.getElementById("searchBtn")
var searchCityEl = document.getElementById("searchCity")





var formSubmitHandler = function (event) {
    event.preventDefault();


    // get value from input element
    var cityName = searchCityEl.value.trim();


    if (cityName) {

        getData(cityName);
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

}






















searchBtnEl.addEventListener('click', formSubmitHandler)