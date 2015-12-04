'use strict';

var app = angular.module('curbApp', ['ui.router', "firebase"]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider 
  .state('main', { url: '/', templateUrl: 'partials/map.html', controller: 'mapCtrl'})
});