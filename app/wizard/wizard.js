angular.module( 'pgWeb.wizard', [
  'ui.router',
  /*
  'ui.router.compat',
  'placeholders',
  'ui.bootstrap', */
  'ngAnimate'
])

.config(function config( $stateProvider, $urlRouterProvider ) {
  $stateProvider
    .state( 'wizard', {
      url: '/wizard',
      views: {
        "main": {
          controller: 'WizardCtrl',
          templateUrl: 'app/wizard/wizard.tpl.html'
        }
      },
      data:{ pageTitle: 'What is It?' }
    })

    // nested states
    // each of these sections will have their own view
    // url will be nested (/form/profile)
    .state('wizard.step-1', {
      url: '/step-1',
      templateUrl: 'app/wizard/steps/step-1.tpl.html'
    })

    .state('wizard.step-2', {
      url: '/step-2',
      templateUrl: 'app/wizard/steps/step-2.tpl.html'
    })

    .state('wizard.step-3', {
      url: '/step-3',
      templateUrl: 'app/wizard/steps/step-3.tpl.html'
    });
})

.controller( 'WizardCtrl', function WizardCtrl( $scope, $rootScope, $state ) {
  $scope.steps = ['1', '2', '3'];
  $scope.currentStep = $scope.steps[0];
  $scope.fromStep = $scope.currentStep;
  $rootScope.wSlogan = 'Scegli anno';

  $scope.technical_data =  { years: window.years };
  $scope.tecnical_compiled = { year: ''};

  $scope.setYear = function(year) {
    if(typeof year != 'undefined') {
      $scope.tecnical_compiled.year = year;
      $state.go('wizard.step-2');
      $scope.wSlogan = 'seleziona i km';
    }
  };

  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $scope.currentStep = toState.name.replace(/wizard.step-/g,"");
    $scope.fromStep = fromState.name.replace(/wizard.step-/g,"");
    $scope.back = false;

    if(typeof $scope.fromStep != 'undefined' && parseInt($scope.fromStep) > parseInt($scope.currentStep)) {
      $scope.back = true;
    }

    console.log('state changed, animaton back: ' + $scope.back);
  });

});

