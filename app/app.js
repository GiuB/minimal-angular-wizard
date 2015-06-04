angular.module( 'pgWeb', [
  'pgWeb.wizard',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/wizard/step-1' );
})

.run(function run ($rootScope) {

  //Some global functions
  $rootScope.empty = function empty(data) { //call empty() like php
    if(typeof(data) == 'number' || typeof(data) == 'boolean') {
      return false;
    }
    if(typeof(data) == 'undefined' || data === null) {
      return true;
    }
    if(typeof(data.length) != 'undefined') {
      return data.length == 0;
    }
    var count = 0;
    for(var i in data) {
      if(data.hasOwnProperty(i)) {
        count ++;
      }
    }
    return count == 0;
  };

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | pgWeb' ;
    }
  });
})

;

