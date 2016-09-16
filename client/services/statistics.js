'use strict';
(function(){

class ThingFactory {
    constructor($http, $q, Upload) {
        this.$q = $q;
        this.Upload = Upload;
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

}

angular.module('pspApp')
  .factory('Stats', ThingFactory);

})();
