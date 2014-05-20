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


//Debit factory
services.factory('HistoryService', ['$http', function ($http) {
  var path    = '/history',
      factory = {};

  //History
  factory.get = function (data) {
    var history = $http.post(path, data);

    return history;
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


//Loader
services.factory('httpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
  var numLoadings = 0;

  return {
    request: function (config) {

      numLoadings++;

      // Show loader
      $rootScope.$broadcast("loader:show");
      return config || $q.when(config)
    },
    response: function (response) {

      if ((--numLoadings) === 0) {
        // Hide loader
        $rootScope.$broadcast("loader:hide");
      }

      return response || $q.when(response);
    },
    responseError: function (response) {

      if (!(--numLoadings)) {
        // Hide loader
        $rootScope.$broadcast("loader:hide");
      }

      return $q.reject(response);
    }
  };
}]);
