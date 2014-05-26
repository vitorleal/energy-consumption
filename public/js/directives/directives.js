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


//Bar Chart
directives.directive('bar', ['$timeout', function ($timeout) {
  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    scope: {
      graph: '='
    },
    link: function (scope, element, attr) {
      scope.$watch('graph', function () {
        if(scope.graph) {
          $timeout(function () {
            _generateGraph();
          }, 400);

        } else if(scope.chart) {
          scope.chart.load({
            columns: [scope.graph.kWh]
          });
        }
      });

      //Generate the bar chart
      var _generateGraph = function () {
        if (scope.graph.kWh.length > 1) {
          scope.chart = c3.generate({
            bindto: '#'+ attr.id,
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
                categories: ['hoje', '2 dias', '3 dias', '4 dias', '5 dias', '6 dias', '7 dias', '8 dias', '9 dias', '10 dias']
              }
            },
            tooltip: { show: false },
            legend : { show: false },
            interaction: {
              enabled: false
            }
          });
        }
      };
    }
  };
}]);
