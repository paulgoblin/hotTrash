'use strict'

app.service('mapSrvc', function($http){

  var API_KEY = 'AIzaSyB5J33uD9EckQdm-P_V2H4utRvbxzzKws0';
  var GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
  var map;

  this.mapView = 0;

  this.setView = (lat, lng, zoom) => {
    this.mapView = {
      center: new google.maps.LatLng(lat,lng),
      zoom: zoom
    }
  }

  this.drawMap = (mapView) => {
    new google.maps.Map(document.getElementById('map'), mapView);
  }

  this.findAddress = function(inputAddress){
    var query = inputAddress.replace(/ /g,'+');
    var geocodeUrl = `${GEOCODE_API}?address=${query}&key=${API_KEY}`;
    console.log(geocodeUrl)
    return $http.get(geocodeUrl)
  }

  this.viewFromResult = (resp, zoom) => {
    console.log(resp)
    var loc = resp.data.results[0].geometry.location;
    this.setView(loc.lat, loc.lng, zoom);
  }



})









