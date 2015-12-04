'use strict';

var app = angular.module('curbApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider 
  .state('main', { url: '/', templateUrl: 'partials/main.html', controller: 'mainCtrl'})
});
