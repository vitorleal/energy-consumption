var controllers = angular.module('light.controllers', []);

//Loing
controllers.controller('Login', ['$scope', '$location', function ($scope, $location) {
  $scope.login = function () {
    $location.path('dashboard');
  };
}]);


//Dashboard
controllers.controller('Dashbard', ['$scope', '$location', function ($scope, $location) {
  $scope.balance = '40';
  $scope.buy = function () {
    $location.path('credit');
  };
}]);


//Buy Credit
controllers.controller('Credit', ['$scope', '$location', function ($scope, $location) {
  $scope.back = function () {
    $location.path('dashboard');
  };
}]);
