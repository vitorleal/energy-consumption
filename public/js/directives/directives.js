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
      graph: '='
    },
    link: function (scope, element, attr) {
      $timeout(function () {
        if (scope.graph.kWh.length > 1) {
          var chart = c3.generate({
            size: { height: 250 },
            data: {
              columns: [scope.graph.kWh],
              type   : 'bar',
              colors : { kWh: '#27AAAF' },
              labels : {
                format: {
                  y: function (v, id) { return v + ' ' + id; }
                }
              }
            },
            axis: {
              x: {
                type: 'categorized',
                categories: ['dia 1', 'dia 2', 'dia 3', 'dia 4', 'dia 5', 'dia 6', 'dia 7']
              }
            },
            tooltip: { show: false },
            legend : { show: false }
          });
        }
      }, 400);
    }
  };
}]);
