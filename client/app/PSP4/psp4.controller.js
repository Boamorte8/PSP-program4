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

  getTfunction(dof, x){
    this.Stats.getT(dof, x)
    .then(res =>{
      this.res = res;
    })
    .catch(err=>{
      console.log(error);
    })
  }
}

angular.module('pspApp')
  .component('psp4', {
    templateUrl: 'app/PSP4/psp4.html',
    controller: PSP4Component,
    controllerAs:'vm'
  });

})();
