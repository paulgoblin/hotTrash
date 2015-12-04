'use strict'

app.service('mapSrvc', function($http, $firebaseObject){


  var rootRef = new Firebase('https://samer-firebase.firebaseio.com/data');
  var marksRef = rootRef.child('marks')
  var geoFire = new GeoFire(marksRef);
  var geoQuery = null;

  var API_KEY = 'AIzaSyB5J33uD9EckQdm-P_V2H4utRvbxzzKws0';
  var GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
  var map;

  this.mapView = 0;
  this.closeMarks = {};

  this.setView = (lat, lng, zoom) => {
    this.mapView = {
      center: new google.maps.LatLng(lat,lng),
      zoom: zoom
    }
  }

  this.drawMap = (mapView) => {
    this.map = new google.maps.Map(document.getElementById('map'), mapView);
    this.viewMarker = new google.maps.Marker({
      position: this.mapView.center,
      map: this.map,
      title: 'Hello World!'
    });
    var position = new google.maps.LatLng(100, 100);
    var marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: 'key'
    });
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

  this.drawCloseMarks = () => {
    var latLng = this.mapView.center;
    this.geoQuery = geoFire.query({
      center: [ latLng.lat(), latLng.lng() ],
      radius: 10*1.61  // km
    })
    this.geoQuery.on("key_entered", (key, location, distance) => {
      console.log("Mark " + key + " found at " + location + " (" + distance + " km away)");
      var position = new google.maps.LatLng(location[0], location[2]);
      this.closeMarks[key] = new google.maps.Marker({
        position: position,
        map: this.map,
        title: key
      });
      console.log(this.closeMarks);
    });
  }

  this.postMark = () => {
    var latLng = this.mapView.center;
    var postKey = Date.now().toString();
    geoFire.set(postKey, [ latLng.lat(), latLng.lng() ])
  }



})









