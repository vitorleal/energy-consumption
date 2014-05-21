var directives = angular.module('light.directives', []);


//Loader
directives.directive('loader', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      scope.$on('loader:show', function () {
        return element.show();
      });

      return scope.$on('loader:hide', function () {
        return element.hide();
      });
    }
  };
}]);


//bar chart
directives.directive('bar', ['$timeout', function ($timeout) {
  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    scope: {
      data: '='
    },
    link: function (scope, element, attr) {
      $timeout(function () {
        console.log(scope.data.kWh);
        if (scope.data.kWh.length > 1) {
          var chart = c3.generate({
            size: {
              height: 220,
            },
            data: {
              columns: [scope.data.kWh],
              type: 'bar',
              colors: {
                kWh: '#27AAAF'
              },
              labels: {
                format: {
                  y: function (v, id) {
                    return v + ' ' + id;
                  }
                }
              }
            },
            bar: {
              width: {
                  ratio: 0.8
              }
            },
            tooltip: {
              show: false
            },
            legend: {
              show: false
            }
          });
        }
      }, 600);
    }
  };
}]);
