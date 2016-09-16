'use strict';

angular.module('pspApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>'
      });
  });
