'use strict';
(function(){

class HomeComponent {
  constructor(Stats) {
    this.message = 'Hello';
  }
}

angular.module('pspApp')
  .component('home', {
    templateUrl: 'app/home/home.html',
    controller: HomeComponent
  });

})();
