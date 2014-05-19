var light = angular.module('light', ['ngRoute', 'light.controllers']);

light.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller : 'Login',
      resolve: {
      }
  })
  .when('/dashboard', {
    templateUrl: 'views/dashbard.html',
    controller : 'Dashbard'
  })
  .when('/credit', {
    templateUrl: 'views/credit.html',
    controller : 'Credit'
  })
  .otherwise({ redirectTo: '/' });
}]);
