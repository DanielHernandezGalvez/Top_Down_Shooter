let textArea = document.getElementById('area')


function sumar(numero1, numero2) {
  let resultadoSuma = numero1 + numero2;
  return resultadoSuma;
}

function multiplicar(x, y) {
  let z = x * y;
  return z;
}

function dividir(x, y) {
  let z = x / y;
  return z;
}

function resta(x, y) {
  let z = x - y;
  return z;
}

function leerValores(simbolo) {
  let a = 0;
  let x = parseFloat(prompt('ingresa el primer número'));
  let y = parseFloat(prompt('ingresa el segundo número'));
  if (simbolo != '' && (simbolo === '+' || simbolo === '*' || simbolo === '/' || simbolo === '-')) {
    if (simbolo === '+') {
      a = sumar(x, y);
    }
    if (simbolo === '*') {
      a = multiplicar(x, y);
    }
    if (simbolo === '/') {
      a = dividir(x, y);
    }
    if (simbolo === '-') {
      a = resta(x, y);
    }
  } else {
    alert('no se puede continuar');
    return
  }
  textArea.innerHTML = a;
  if(a <= 0){
textArea.setAttribute('style', 'color: red;');
  } else{
    textArea.setAttribute('style', 'color:green;')
  }
}

