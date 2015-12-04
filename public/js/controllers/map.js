'use strict';

app.controller('mapCtrl', function($scope, $rootScope, mapSrvc) {


  $scope.isLoadingMap = mapSrvc.mapView === 0;
  $scope.inputAddress = "";

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
      mapSrvc.drawCloseMarks();
    }, function(err){
      console.log('error finding address', err)
    })
  }


  $scope.postMark = function(){
    mapSrvc.postMark();
  }


});
