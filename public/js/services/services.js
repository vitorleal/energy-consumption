var services = angular.module('light.services', []);

//Login factory
services.factory('LoginService', ['$http', '$rootScope', 'Local', function ($http, $rootScope, Local) {
  var path    = '/login',
      factory = {};

  //Login
  factory.send = function (data) {
    var login = $http.post(path, data);

    return login;
  };

  //Login resolved
  factory.resolve = function (data) {
    var login = $http.post(path, data).then(function (resp) {
      var data = resp.data;

      Local.set('user', data);
      $rootScope.user = data;

      console.log(data);
      return data;
    });

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
      $rootScope.$broadcast("loader:show");

      return config || $q.when(config)
    },
    response: function (response) {
      if ((--numLoadings) === 0) {
        $rootScope.$broadcast("loader:hide");
      }

      return response || $q.when(response);
    },
    responseError: function (response) {
      if (!(--numLoadings)) {
        $rootScope.$broadcast("loader:hide");
      }

      return $q.reject(response);
    }
  };
}]);
