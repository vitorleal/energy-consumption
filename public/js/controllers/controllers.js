var controllers = angular.module('light.controllers', ['ngDialog']);

//Loing
controllers.controller('Login', ['Local', 'ngDialog', '$scope', '$location', 'LoginService',
  function (Local, ngDialog, $scope, $location, LoginService) {

  $scope.login = function () {
    LoginService.send({
      email: $scope.email,
      pass : $scope.pass
    })
    .success(function (data) {
      if (data.error) {
        $scope.error = data.error;

        ngDialog.open({
          template: 'include/error.html',
          scope   : $scope
        });

      } else {
        Local.set('user', data);
        $location.path('dashboard');
      }
    });
  };
}]);


//Dashboard
controllers.controller('Dashbard', ['user' , 'HistoryService', '$scope', '$location',
  function (user, HistoryService, $scope, $location) {

  $scope.user = user;

  HistoryService.get({ email: $scope.user.email })
  .success(function (data) {
    $scope.history = data.history;
    $scope.graph   = data.graph;
    $scope.avarage = data.avarage;
  });

  $scope.goToCredit = function () {
    $location.path('credit');
  };

  $scope.goToDebit = function () {
    $location.path('debit');
  };
}]);


//Buy Credit
controllers.controller('Credit', ['user', 'ngDialog', '$scope', '$location',
    function (user, ngDialog, $scope, $location) {

  $scope.user = user;

  $scope.buy = function () {
    if (!$scope.credit) {
      $scope.error = 'Selecione um valor para recarregar';

      ngDialog.open({
        template: 'include/error.html',
        scope   : $scope
      });

    } else {
      ngDialog.open({
        template  : 'include/credit-card.html',
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
controllers.controller('CreditCard', ['CreditService', '$scope', '$location',
    function (CreditService, $scope, $location) {

  $scope.buy = function () {
    CreditService.update({
      balance: $scope.user.balance,
      email  : $scope.user.email,
      credit : $scope.credit,
      kwh    : $scope.user.kwh
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


//Debit Credit
controllers.controller('Debit', ['user', 'DebitService', 'HistoryService', '$scope', '$location',
    function (user, DebitService, HistoryService, $scope, $location) {

  $scope.user = user;

  $scope.debit = function () {
    DebitService.send({
      email  : $scope.user.email,
      balance: $scope.user.balance,
      kwh    : $scope.user.kwh
    })
    .success(function () {
      $location.path('dashboard');
    });
  };

  $scope.reset = function() {
    HistoryService.reset({
      email: $scope.user.email
    })
    .success(function () {
      $location.path('dashboard');
    });
  };

  $scope.goBack = function () {
    $location.path('dashboard');
  };
}]);
