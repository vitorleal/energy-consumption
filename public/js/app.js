var light = angular.module('light', ['ngRoute', 'light.services', 'light.controllers']);


light.run( function($rootScope, $location, Local) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    var user = Local.get('user');

    if (!next.public && !user) {
      $location.path('login');
    }
  });
});


light.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller : 'Login',
      public     : true
    })
    //Dashboard
    .when('/dashboard', {
      templateUrl: 'views/dashbard.html',
      controller : 'Dashbard',
      public: false,
      resolve: {
        balance: ['Local', 'LoginService', '$rootScope', function (Local, LoginService, $rootScope) {
          var user = Local.get('user');

          if (user) {
            LoginService.send({
              email: user.email,
              pass : user.pass
            })
            .success(function (data) {
              Local.set('user', data);
              $rootScope.user = data;
            });
          }
        }]
      }
    })
    //Credit
    .when('/credit', {
      templateUrl: 'views/credit.html',
      controller : 'Credit',
      public: false,
      resolve: {
        user: ['Local', 'LoginService', '$rootScope', function (Local, LoginService, $rootScope) {
          var user = Local.get('user');

          if (user) {
            LoginService.send({
              email: user.email,
              pass : user.pass
            })
            .success(function (data) {
              Local.set('user', data);
              $rootScope.user = data;
            });

          }
        }]
      }
    })
    //Credit
    .when('/debit', {
      templateUrl: 'views/debit.html',
      controller : 'Debit',
      public: false,
      resolve: {
        user: ['Local', 'LoginService', '$rootScope', function (Local, LoginService, $rootScope) {
          var user = Local.get('user');

          if (user) {
            LoginService.send({
              email: user.email,
              pass : user.pass
            })
            .success(function (data) {
              Local.set('user', data);
              $rootScope.user = data;
            });

          }
        }]
      }
    })
    .otherwise({ redirectTo: '/' });
}]);
