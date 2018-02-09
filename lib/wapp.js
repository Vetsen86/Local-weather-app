"use strict";

$(document).ready(function () {

  //global variables for fahrenheit to celsius conversion
  var temperature = 0;
  var degreeType = "c";

  //This function finds the user's longitude and latitude
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(letPosition);
    } else {
      $(".location").html("No position detected.");
    }
  }

  getLocation();

  //this function sets longitude and latitude variables to be used elsewhere
  function letPosition(position) {
    var long = position.coords.longitude;
    var lat = position.coords.latitude;
    getPositionName(long, lat);
    getWeather(long, lat);
  }

  //uses the google maps api to pull a name for the user's location
  function getPositionName(long, lat) {
    var googUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ", " + long + "&key=AIzaSyC0lQW2hK-t2OYt0dcZH247wiXQZrIAev0";
    $.ajax({
      url: googUrl,
      type: 'GET',
      dataType: 'json',
      success: function success(response) {
        $(".location").html(response.results[1].address_components[0].short_name + ", " + response.results[1].address_components[2].short_name + " " + response.results[1].address_components[3].short_name);
      },
      error: function error(jqXHR, status, errorThrown) {
        console.log(jqXHR);
      }
    });
  }

  //function that converts Celsius to Fahrenheit and vice versa
  function tempConvert(temp) {
    if (degreeType == "c") {
      temp = temp * 9 / 5 + 32;
      $("#temp").text(temp);
      $("#CToF").html("&#8457;");
      degreeType = "f";
    } else if (degreeType == "f") {
      $("#temp").text(temp);
      $("#CToF").html("&#8451;");
      degreeType = "c";
    }
  }

  //Pulls weather information from the FreeCodeCamp weather api
  function getWeather(long, lat) {
    var weatherUrl = "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat;
    $.ajax({
      url: weatherUrl,
      type: 'GET',
      dataType: 'json',
      success: function success(response) {
        $("#weather-img").attr("src", response.weather[0].icon);
        $("#temp").before("Condition: " + response.weather[0].main + "<br>Temperature: ");
        $("#temp").text(response.main.temp);
        temperature = Math.floor(response.main.temp);
        tempConvert(temperature);
      },
      error: function error(jqXHR, status, errorThrown) {
        console.log(jqXHR);
      }
    });
  }

  //Creates a button that will change the temperature display from Celsius to Fahrenheit when clicked
  $("#CToF").on('click', function () {
    tempConvert(temperature);
  });
});