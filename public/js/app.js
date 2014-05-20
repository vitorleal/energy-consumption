var light = angular.module('light', ['ngRoute', 'light.services', 'light.controllers']);

light.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller : 'Login'
    })
    //Dashboard
    .when('/dashboard', {
      templateUrl: 'views/dashbard.html',
      controller : 'Dashbard',
      resolve: {
        balance: ['Local', 'LoginService', '$rootScope', function (Local, LoginService, $rootScope) {
          var user = Local.get('user');

          LoginService.send({
            email: user.email,
            pass : user.pass
          })
          .success(function (data) {
            Local.set('user', data);
            $rootScope.user = data;
          });
        }]
      }
    })
    //Credit
    .when('/credit', {
      templateUrl: 'views/credit.html',
      controller : 'Credit',
      resolve: {
        user: ['LoginService', '$rootScope', function (LoginService, $rootScope) {
          var user = JSON.parse(localStorage.getItem('user'));

          LoginService.send({
            email: user.email,
            pass : user.pass
          })
          .success(function (data) {
            localStorage.setItem('user', JSON.stringify(data));
            $rootScope.user = data;
          });
        }]
      }
    })
    .otherwise({ redirectTo: '/' });
}]);
