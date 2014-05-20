var services = angular.module('light.services', []);

//Login factory
services.factory('LoginService', ['$http', function ($http) {
  var path    = '/login',
      factory = {};

  //Send data
  factory.send = function (data) {
    var login = $http.post(path, data);

    return login;
  };

  return factory;
}]);


//Credit factory
services.factory('CreditService', ['$http', function ($http) {
  var path    = '/credit',
      factory = {};

  //Update credit
  factory.update = function (data) {
    var credit = $http.post(path, data);

    return credit;
  };

  return factory;
}]);


//Debit factory
services.factory('DebitService', ['$http', function ($http) {
  var path    = '/debit',
      factory = {};

  //Debit credit
  factory.send = function (data) {
    var debit = $http.post(path, data);

    return debit;
  };

  return factory;
}]);


//Local
services.factory('Local', ['$rootScope', function ($rootScope) {
  var factory = {};

  factory.set = function (name, value) {
   localStorage.setItem(name, JSON.stringify(value));
  };

  factory.get = function (name) {
    var local = localStorage.getItem(name);

    return JSON.parse(local);
  };

  return factory;
}]);
