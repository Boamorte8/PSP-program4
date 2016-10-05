function Statistics() {

  this.getGamma = getGamma;
  this.getFPart1 = getFPart1;
  this.getFPart2 = getFPart2;
  this.getT = getT;
  //---------------------------------------
  this.getRanges = getRanges;
  this.determinarPartes = determinarPartes;
  this.getLogAverage = getLogAverage;
  this.getVariance = getVariance;
  this.getCovariance = getCovariance;


  function getGamma(equix) {
    if (equix == null) {
      throw new Error('There isnt a param');
    }
    else if (typeof(equix) != 'number') {
      throw new Error('The param isn´t a number');
    }
    else if (typeof(equix) === 'number' && equix < 0) {
      throw new Error('The param is a negative number');
    }
    else if (typeof(equix) === 'number' && equix >= 0) {
      if (equix == 0) {
        return 1;
      }
      else if (equix > 0 && equix < 1) {
        return Math.sqrt(Math.PI);
      }
      else if (equix >= 1) {
        if ((equix - 1) == 0 ) {
          return getGamma(equix - 1);
        }
        else {
          return (equix - 1) * (getGamma(equix - 1));
        }
      }
    }
    else {
      throw new Error('It cant be processed');
    }
  }

  function getFPart1(dof){
    if (dof == null) {
      throw new Error('There isnt dof');
    }
    else if (typeof(dof) != 'number') {
      throw new Error('dof isn´t a number');
    }
    else if (typeof(dof) === 'number' && dof == 0) {
      throw new Error('dof is zero');
    }
    else if (typeof(dof) === 'number' && dof < 0) {
      throw new Error('dof is a negative number');
    }
    else if (typeof(dof) === 'number' && dof > 0) {
      let part1 = Math.round(getGamma((dof+1)/2) / (Math.sqrt(dof*Math.PI)* getGamma(dof/2))*1000000)/1000000;
      return part1;
    }
    else {
      throw new Error('It cant be processed');
    }
  }

  function getFPart2(dof, xi){
    if (dof == null || xi == null) {
      throw new Error('There isnt a param(or params)');
    }
    else if (typeof(dof) != 'number' || typeof(xi) != 'number') {
      throw new Error('A param(or params) isn´t a number');
    }
    else if (typeof(dof) === 'number' && dof == 0) {
      throw new Error('dof is zero');
    }
    else if (typeof(dof) === 'number' && dof < 0) {
      throw new Error('dof is a negative number');
    }
    else if (typeof(dof) === 'number' && dof >= 0 && typeof(xi) === 'number') {
      let part2 = Math.round(Math.pow(( 1 + (Math.pow(xi,2)/dof)),-(dof+1)/2) *100000)/100000;
      return part2;
    }
    else {
      throw new Error('It cant be processed');
    }
  }
  
  function getT(dof, x) {
    if (dof == null || x == null) {
      throw new Error('There isnt a param(or params)');
    }
    else if (typeof(dof) != 'number' || typeof(x) != 'number') {
      throw new Error('A param(or params) isn´t a number');
    }
    //else if (typeof(dof) === 'number' && dof == 0) {
    else if (dof == 0) {
      throw new Error('dof is zero');
    }
    //else if (typeof(dof) === 'number' && dof < 0) {
    else if (dof < 0) {
      throw new Error('dof is a negative number');
    }
    //else if (typeof(dof) === 'number' && dof >= 0 && typeof(x) === 'number') {
    else {
      let fPart1 = getFPart1(dof);
      let e = 0.00001;
      let nSeg = 10;

      function getTn (nSeg) {
        let w=x/nSeg;
        let t=fPart1;
        for (var i=1;i<=nSeg-1;i=i+2)
        {
          t+=4*fPart1*getFPart2(dof,i*w);
        }
        for (var i=2;i<=nSeg-2;i=i+2)
        {
          t+=2*fPart1*getFPart2(dof,i*w);
        }
        return (Math.round((w/3)*(t+fPart1*getFPart2(dof, x))*100000)/100000);
      }

      let t1;
      let t2;
      do {
        t1= getTn(nSeg);
        t2= getTn(nSeg*2);
        nSeg=nSeg*2;
      } while (Math.abs(t1-t2)>=e);
      return t2;
    }
    else {
      throw new Error('It cant be processed');
    }
  }

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
