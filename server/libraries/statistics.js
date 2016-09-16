function Statistics() {
  this.getRanges = getRanges;
  this.determinarPartes = determinarPartes;
  this.getLogAverage = getLogAverage;
  this.getVariance = getVariance;
  this.getCovariance = getCovariance;

  function getRanges(list){
    var respuesta = {};
    var respDatos = {};
    if (list) {
      if (list[0] == null) {
        respuesta.error = 'La lista esta vacia';
      }
      else if (list[0][2]) {
        respuesta.error = 'La lista tiene mas de 2 columnas';
        respuesta.datos = list;
      }
      else if (list[0][1]) {
        respuesta.mensaje = 'La lista tiene 2 columnas';
        var datos = determinarPartes(list);
        var covariance = getCovariance(datos);
        let average = getLogAverage(datos);
        if (datos == null || covariance == null || average == null) {
          respuesta.error = 'Los datos estan incompletos';
        }
        else {
          respDatos.verySmall = Math.exp(average - (2 * covariance));
          respDatos.small = Math.exp(average - covariance);
          respDatos.medium = Math.exp(average);
          respDatos.large = Math.exp(average + covariance);
          respDatos.veryLarge = Math.exp(average + (2 * covariance));
          respuesta.datos = respDatos;
        }

      }
      else if (list[0][0]) {
        respuesta.mensaje = 'La lista tiene 1 columna';
        var covariance = getCovariance(list);
        let average = getLogAverage(list);
        if (covariance == null || average == null) {
          respuesta.error = 'Los datos estan incompletos';
        }
        else {
          respDatos.verySmall = Math.exp(average - (2 * covariance));
          respDatos.small = Math.exp(average - covariance);
          respDatos.medium = Math.exp(average);
          respDatos.large = Math.exp(average + covariance);
          respDatos.veryLarge = Math.exp(average + (2 * covariance));
          respuesta.datos = respDatos;

        }
      }
      else {
        respuesta.error = 'La lista no tiene datos';
      }
    }
    else {
      respuesta.error = 'Problemas con la lista';
    }
    return respuesta;
  }

  function determinarPartes(lista) {
    var respuesta = [];
    if (lista.length == 0) {
      return null;
    }
    else {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i] == null) {
          return null;
        }
        respuesta[i] = lista[i][0]/lista[i][1];
      }
      return respuesta;
    }
  }


  function getLogAverage(numbers){
    let sum = 0;
    if (Array.isArray(numbers)) {
      if(numbers.length==0){
        throw new Error('empty list');
      }
      for (var i = 0; i < numbers.length; i++) {

        if (typeof(numbers[i])=='string' || numbers[i] == NaN) {
          throw new Error('not numbers list');

        }
        sum += Math.log(numbers[i]);
      }
    }else {
      return null;
    }
    return (sum/numbers.length);
  }

  function getVariance(numbers){
    let sum = 0;
    let avg = getLogAverage(numbers);
    if (Array.isArray(numbers) && avg!=null) {
      for (var i = 0; i < numbers.length; i++) {
        if (typeof(numbers[i])=='string' || numbers[i] == NaN) {
          return null;
        }
        sum += Math.pow((Math.log(numbers[i]) - avg),2);
      }
    }else {
      return null;
    }
    return sum/(numbers.length-1);
  }

  function getCovariance(numbers){
    var variance = getVariance(numbers);
    if (variance == null) {
      return null;
    }
    else {
      var covariance = Math.sqrt(variance);
      return covariance;
    }
  }

}
module.exports =(Statistics);
