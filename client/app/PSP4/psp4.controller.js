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

  getEstimated(file){
  	this.Stats.getEstimated(file)
  	.then(response=>{
      if (response.error) {
        Materialize.toast(response.error, 6000);
      }
  		else if (response.mensaje) {
        this.respuesta = response.mensaje;
        this.ranges = response.datos;
        console.log(response);
  		}
      else {
        Materialize.toast('El archivo no es correcto o esta mal estructurado', 6000);
      }
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
