$(document).ready(function () {

  //This function finds the user's longitude and latitude
  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(letPosition);
    } else {
      $(".location").html("No position detected.");
    }
  }

  //this function sets longitude and latitude variables to be used elsewhere
  function letPosition(position) {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    getPositionName(long, lat);
    getWeather(long, lat);
  }

  //uses the google maps api to pull a name for the user's location
  function getPositionName(long, lat) {
    const googUrl ="https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ", " + long + "&key=AIzaSyC0lQW2hK-t2OYt0dcZH247wiXQZrIAev0"
    $.ajax({
      url: googUrl,
      type: 'GET',
      dataType: 'json',
      success(response) {
        $(".location").html(response.results[1].address_components[0].short_name + ", " + response.results[1].address_components[2].short_name + " " + response.results[1].address_components[3].short_name);
      },
      error (jqXHR, status, errorThrown) {
        console.log(jqXHR);
      }
    });
  }

  function getWeather(long, lat) {

  }

  getLocation();
});
