var light = angular.module('light', ['ngRoute', 'light.services', 'light.controllers', 'light.directives']);


//Run
light.run(['$rootScope', '$location', 'Local', function($rootScope, $location, Local) {
  $rootScope.location = $location;

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    var user = Local.get('user');

    if (!next.public && !user) {
      $location.path('login');
    }
  });
}]);


//Confing
light.config(['$httpProvider', '$routeProvider', '$locationProvider',
  function ($httpProvider, $routeProvider, $locationProvider) {

  $httpProvider.interceptors.push('httpInterceptor');

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
        user: ['Local', 'LoginService', function (Local, LoginService) {
          var user = Local.get('user');

          if (user) {
            var login = LoginService.resolve({
              email: user.email,
              pass : user.pass
            });

            return login;
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
        user: ['Local', 'LoginService', function (Local, LoginService) {
          var user = Local.get('user');

          if (user) {
            var login = LoginService.resolve({
              email: user.email,
              pass : user.pass
            });

            return login;
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
        user: ['Local', 'LoginService', function (Local, LoginService) {
          var user = Local.get('user');

          if (user) {
            var login = LoginService.resolve({
              email: user.email,
              pass : user.pass
            });

            return login;
          }
        }]
      }
    })
    .otherwise({ redirectTo: '/' });
}]);
