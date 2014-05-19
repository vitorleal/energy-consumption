var controllers = angular.module('light.controllers', []);

//Loing
controllers.controller('Login', ['$scope', '$location', function ($scope, $location) {
  $scope.login = function () {
    $location.path('dashboard');
  };
}]);


//Dashboard
controllers.controller('Dashbard', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
  $scope.balance = $rootScope.balance;
  $scope.goToCredit = function () {
    $location.path('credit');
  };
}]);


//Buy Credit
controllers.controller('Credit', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
  $scope.balance = $rootScope.balance;

  $scope.buy = function () {

    if (!$scope.credit) {

    } else {
      var balance = parseInt($scope.balance),
          credit  = parseInt($scope.credit);

      $rootScope.balance = balance + credit;
      $location.path('dashboard');
    }
  };

  $scope.goBack = function () {
    $location.path('dashboard');
  };
}]);
