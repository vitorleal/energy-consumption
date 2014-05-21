var directives = angular.module('light.directives', []);

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
