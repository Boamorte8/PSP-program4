process.env.NODE_ENV = 'test';

let chai = require('chai');
let Statistics = require('../../libraries/statistics');
var assert = chai.assert;
var expect = chai.expect;

// chai.use(chaiHttp);

describe('GetRanges', () => {
    beforeEach((done) => {
      done();
    });

    describe('getRanges without list', function() {
      it('Response should show error message Problemas con la lista', function() {
        let statistics = new Statistics();
        let response = statistics.getRanges();
        let mensaje = response.error;
        assert.equal(mensaje, 'Problemas con la lista');
      });
    });

    describe('getRanges with empty list', function() {
      it('Response should show error message La lista no tiene datos', function() {
        let datos = [[]];
        let statistics = new Statistics();
        let response = statistics.getRanges(datos);
        let mensaje = response.error;
        assert.equal(mensaje, 'La lista no tiene datos');
      });
    });

    describe('getRanges with list with more than 2 columns', function() {
      it('Response should show error message La lista tiene mas de 2 columnas', function() {
        let datos = [[18, 3, 4] , [18, 3, 8], [25, 3, 6]];
        let statistics = new Statistics();
        let response = statistics.getRanges(datos);
        let mensaje = response.error;
        assert.equal(mensaje, 'La lista tiene mas de 2 columnas');
      });
    });

    describe('getRanges with list with 2 columns', function() {
      it('Response should show an object with large : 31.88105392926987, medium : 16.469620953940066, small : 8.508138249389225, veryLarge : 61.713721431934864, verySmall : 4.395269124478686', function() {
        let respuesta = {
          "datos": {
            "large": 24.511509070694814,
            "medium": 14.001307864154933,
            "small": 7.99773777050806,
            "veryLarge": 42.91128248532496,
            "verySmall": 4.568416755520848
          },
        "mensaje": "La lista tiene 2 columnas"
        };
        let datos = [ [18, 3] , [18, 3], [25, 3], [31, 3], [37, 3], [82, 5], [82, 4], [87, 4], [89, 4], [230, 10], [85, 3]];
        let statistics = new Statistics();
        let response = statistics.getRanges(datos);
        assert.deepEqual(response, respuesta);
      });
    });

    describe('getRanges with list with 1 column', function() {
      it('Response should show an object with large : 14.965042481379406, medium : 11.23806924499352, small : 8.439281112126052, veryLarge : 19.928022473189483, verySmall : 6.3375179612117245', function() {
        let respuesta = {
          "datos": {
            "large": 14.965042481379406,
            "medium": 11.23806924499352,
            "small": 8.439281112126052,
            "veryLarge": 19.928022473189483,
            "verySmall": 6.3375179612117245
          },
        "mensaje": "La lista tiene 1 columna"
        };
        let datos = [[7], [12], [10], [12], [10], [12], [12], [12], [12], [8], [8], [8], [20], [14], [18], [12]];
        let statistics = new Statistics();
        let response = statistics.getRanges(datos);
        assert.deepEqual(response, respuesta);
      });
    });

});

describe('determinarPartes', () => {
    beforeEach((done) => {
      done();
    });

    describe('determinarPartes with normal list', function() {
      it('Response should a new array with the result [6, 6, 8.333333333333334, 10.333333333333334, 12.333333333333334, 16.4, 20.5, 21.75, 22.25, 23, 28.333333333333332, 29, 55.8]', function() {
        let respuesta = [6, 6, 8.333333333333334, 10.333333333333334, 12.333333333333334, 16.4, 20.5, 21.75, 22.25, 23, 28.333333333333332];
        let datos = [ [18, 3] , [18, 3], [25, 3], [31, 3], [37, 3], [82, 5], [82, 4], [87, 4], [89, 4], [230, 10], [85, 3]];
        let statistics = new Statistics();
        let response = statistics.determinarPartes(datos);
        assert.deepEqual(response, respuesta);
      });
    });

    describe('determinarPartes with empty list', function() {
      it('Response should a null', function() {
        let datos = [];
        let statistics = new Statistics();
        let response = statistics.determinarPartes(datos);
        assert.deepEqual(response, null);
      });
    });

    describe('determinarPartes with list with missing data', function() {
      it('Response should a null', function() {
        let respuesta = [6, NaN, 8.333333333333334, 10.333333333333334, 12.333333333333334, 16.4, 20.5, 21.75, 22.25, 23, 28.333333333333332];
        let datos = [ [18, 3] , [], [25, 3], [31, 3], [37, 3], [82, 5], [82, 4], [87, 4], [89, 4], [230, 10], [85, 3]];
        let statistics = new Statistics();
        let response = statistics.determinarPartes(datos);
        assert.deepEqual(response, respuesta);
      });
    });

});

describe('getLogAverage', () => {
    beforeEach((done) => {
      done();
    });

    describe('Get average of logarithms with normal list', function() {
      it('Response should a new number with the result 2.4193070543540203', function() {
        let respuesta = 2.4193070543540203;
        let datos = [[7], [12], [10], [12], [10], [12], [12], [12], [12], [8], [8], [8], [20], [14], [18], [12]];
        let statistics = new Statistics();
        let response = statistics.getLogAverage(datos);
        assert.equal(response, respuesta);
      });
    });

    describe('Get average of logarithms for empty array', function () {
        it('Empty list should return "empty list"', function () {
            let statistics = new Statistics();
            let list = new Array();
            assert.throws(function() { statistics.getLogAverage(list) }, Error, 'empty list');
        });
    });

    describe('Get average of logarithms for not numbers array', function () {
        it('Empty list should return "empty list"', function () {
            let statistics = new Statistics();
            let list = new Array('a','b','c');
            assert.throws(function() { statistics.getLogAverage(list) }, Error, 'not numbers list');
        });
    });

});

describe('getVariance', () => {
    beforeEach((done) => {
      done();
    });

    describe('Get variance with normal list', function() {
      it('Response should a new number with the result 0.08203064551785172', function() {
        let respuesta = 0.08203064551785172;
        let datos = [[7], [12], [10], [12], [10], [12], [12], [12], [12], [8], [8], [8], [20], [14], [18], [12]];
        let statistics = new Statistics();
        let response = statistics.getVariance(datos);
        assert.equal(response, respuesta);
      });
    });

    describe('Get variance with empty list', function() {
      it('Response should return "empty list"', function() {
        let datos = [];
        let statistics = new Statistics();
        assert.throws(function() { statistics.getVariance(datos) }, Error, 'empty list');
      });
    });

    describe('Get variance for not numbers array', function () {
        it('Empty list should return "empty list"', function () {
            let statistics = new Statistics();
            let list = new Array('a','b','c');
            assert.throws(function() { statistics.getVariance(list) }, Error, 'not numbers list');
        });
    });

});

describe('getCovariance', () => {
    beforeEach((done) => {
      done();
    });

    describe('Get covariance with a list', function() {
      it('Response should a number with the result 0.28640992566224327', function() {
        let respuesta = 0.28640992566224327;
        let datos = [[7], [12], [10], [12], [10], [12], [12], [12], [12], [8], [8], [8], [20], [14], [18], [12]];
        let statistics = new Statistics();
        let response = statistics.getCovariance(datos);
        assert.equal(response, respuesta);
      });
    });

    describe('Get covariance with empty list', function() {
      it('Response should return "empty list"', function() {
        let datos = [];
        let statistics = new Statistics();
        assert.throws(function() { statistics.getCovariance(datos) }, Error, 'empty list');
      });
    });

    describe('Get covariance for not numbers array', function () {
        it('Empty list should return "empty list"', function () {
            let statistics = new Statistics();
            let list = new Array('a','b','c');
            assert.throws(function() { statistics.getCovariance(list) }, Error, 'not numbers list');
        });
    });


});
