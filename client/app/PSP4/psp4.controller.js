'use strict';
(function(){

class PSP4Component {
  constructor(Stats) {
    this.message = 'Hello';
    this.Stats = Stats;
  }

  getStatistics(file){
  	this.getEstimated(file);

  }
}

angular.module('pspApp')
  .component('psp4', {
    templateUrl: 'app/PSP4/psp4.html',
    controller: PSP4Component,
    controllerAs:'vm'
  });

})();
