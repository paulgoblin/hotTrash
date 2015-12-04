'use strict';

app.controller('mapCtrl', function($scope, $rootScope, $firebaseObject, mapSrvc) {

  var rootRef = new Firebase('https://samer-firebase.firebaseio.com/data');
  var marksRef = rootRef.child('marks')
  var marksRefGeo = new GeoFire(marksRef);

  $scope.postMark = function(){
    var latLng = mapSrvc.mapView.center;
    var postKey = Date.now();
    marksRefGeo.set(postKey, latLng.lat(), latLng.lng())
  }
  
  $scope.isLoadingMap = mapSrvc.mapView === 0;
  $scope.inputAddress = "211 Stratford Rd, Goldsboro, NC";

  navigator.geolocation.getCurrentPosition( (p) => {
    var zoom = 10;
    mapSrvc.setView(p.coords.latitude, p.coords.longitude, zoom);
    console.log('redrawing map', mapSrvc.mapView)
    mapSrvc.drawMap(mapSrvc.mapView)
    $scope.$apply( function (){
      $scope.isLoadingMap = mapSrvc.mapView === 0;
    });
  })

  $scope.findAddress = function(inputAddress){
    if ($scope.isLoadingMap) return;
    mapSrvc.findAddress(inputAddress)
    .then(function(resp){
      var zoom = 12;
      mapSrvc.viewFromResult(resp, zoom);
      mapSrvc.drawMap(mapSrvc.mapView);
    }, function(err){
      console.log('error finding address', err)
    })
  }

});
