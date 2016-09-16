'use strict';

angular.module('pspApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('psp4', {
        url: '/psp4',
        template: '<psp4></psp4>'
      });
  });
