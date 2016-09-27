'use strict';
(function(){

class StatisticsFactory {
    constructor($http, $q, Upload) {
        this.$q = $q;
        this.Upload = Upload;
        this.$http = $http;
    }

	getEstimated(file) {
	let defered = this.$q.defer();
	let promise = defered.promise;
        this.Upload.upload({ url: 'statistics/calculate', data: {data: file}})
        .success(function(data) {
				defered.resolve(data);
		})
		.error(function(err) {
				defered.reject(err);
		});
	  return promise;
	};

  getT(dof, x){
    let defered = this.$q.defer();
    let promise = defered.promise;
    let data = {dof:dof, x:x};
      this.$http.post('statistics/integral', data)
      .success(function(data) {
          defered.resolve(data);
      })
      .error(function(err) {
          defered.reject(err);
      });
      return promise;
  }

}

angular.module('pspApp')
  .factory('Stats', StatisticsFactory);

})();
