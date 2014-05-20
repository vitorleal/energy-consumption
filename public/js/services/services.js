var services = angular.module('light.services', []);

//Login factory
services.factory('LoginService', ['$http', function ($http) {
  var path    = 'http://localhost:8000/login',
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
  var path    = 'http://localhost:8000/credit',
      factory = {};

  //Update credit
  factory.update = function (data) {
    var credit = $http.post(path, data);

    return credit;
  };

  return factory;
}]);
