var controllers = angular.module('light.controllers', ['ngDialog']);

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
controllers.controller('Credit', ['ngDialog', '$rootScope', '$scope', '$location', function (ngDialog, $rootScope, $scope, $location) {
  $scope.balance = $rootScope.balance;

  $scope.buy = function () {
    if (!$scope.credit) {
       ngDialog.open({
         template: 'views/include/error.html',
         controller: 'PopError'
       });

    } else {
      ngDialog.open({
        template: 'views/include/credit-card.html',
        controller: 'CreditCard',
        scope: $scope
      });
    }
  };

  $scope.goBack = function () {
    $location.path('dashboard');
  };
}]);


//Pop Error
controllers.controller('PopError', ['$scope', function ($scope) {
  $scope.error = 'Selecione um valor para recarregar.'
}]);


//Credit card
controllers.controller('CreditCard', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
  var balance = parseInt($rootScope.balance),
      credit  = parseInt($scope.credit);

  $scope.buy = function () {
    $rootScope.balance = balance + credit;
    $location.path('dashboard');
    $scope.closeThisDialog();
  };

  $scope.goBack = function () {
    $location.path('credit');
    $scope.closeThisDialog();
  };
}]);
