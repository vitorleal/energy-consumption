var controllers = angular.module('light.controllers', ['ngDialog']);

//Loing
controllers.controller('Login', ['ngDialog', '$scope', '$location', 'LoginService', function (ngDialog, $scope, $location, LoginService) {
  $scope.login = function () {
    LoginService.send({
      email: $scope.email,
      pass : $scope.pass
    })
    .success(function (data) {
      if (data.error) {
        $scope.error = data.error;

        ngDialog.open({
          template: 'views/include/error.html',
          scope   : $scope
        });

      } else {
        localStorage.setItem('user', JSON.stringify(data));
        $location.path('dashboard');
      }
    });
  };
}]);


//Dashboard
controllers.controller('Dashbard', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
  $scope.balance = $rootScope.user.balance;

  $scope.goToCredit = function () {
    $location.path('credit');
  };
}]);


//Buy Credit
controllers.controller('Credit', ['ngDialog', '$rootScope', '$scope', '$location', function (ngDialog, $rootScope, $scope, $location) {
  $scope.balance = $rootScope.user.balance;

  $scope.buy = function () {
    if (!$scope.credit) {
      $scope.error = 'Selecione um valor para recarregar';

      ngDialog.open({
        template: 'views/include/error.html',
        scope   : $scope
      });

    } else {
      ngDialog.open({
        template  : 'views/include/credit-card.html',
        controller: 'CreditCard',
        scope     : $scope
      });
    }
  };

  $scope.goBack = function () {
    $location.path('dashboard');
  };
}]);


//CreditCard
controllers.controller('CreditCard', ['CreditService', '$rootScope', '$scope', '$location', function (CreditService, $rootScope, $scope, $location) {
  $scope.buy = function () {
    CreditService.update({
      balance: $rootScope.user.balance,
      email  : $rootScope.user.email,
      credit : $scope.credit
    })
    .success(function () {
      $scope.closeThisDialog();
      $location.path('dashboard');
    });
  };

  $scope.goBack = function () {
    $scope.closeThisDialog();
    $location.path('credit');
  };
}]);
