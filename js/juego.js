

// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  for(var i=0;i<3;i++){
    for(var j=0;j<2;j++){
      if(grilla[i][j]>grilla[i][j+1]){
        return 0;
      }
      if(i<2){
        if(grilla[i][2]>grilla[i+1][0]){
        return 0;
        }
      }
    }
  }
  return 1;
}


// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var auxVacio=grilla[fila1][columna1];
  var auxImagen=grilla[fila2][columna2]
  grilla[fila1][columna1]=auxImagen;
  grilla[fila2][columna2]=auxVacio;

  // Modifico posición en el DOM
  var elementoimagen1 = document.getElementById('imagen'+auxVacio);
  var elementoimagen2 = document.getElementById('imagen'+auxImagen);

  var padre = elementoimagen1.parentNode;
console.log(padre);

  var auxImagen1 = elementoimagen1.cloneNode(true);
  var auxImagen2 = elementoimagen2.cloneNode(true);

  padre.replaceChild(auxImagen1, elementoimagen2);
  padre.replaceChild(auxImagen2, elementoimagen1);


}

// Para chequear si la posicón est&aacute; dentro de la grilla.
function posicionValida(fila, columna){
  if(fila>2 || columna>2 || fila<0 || columna <0 ){
    return false;
  }
  return true;

}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;

  }
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es v&aacute;lida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}

function actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia){
  posicionVacia.fila=nuevaFilaPiezaVacia;
  posicionVacia.columna=nuevaColumnaPiezaVacia;
}

// Extras, lo que est&aacute; ac&aacute; abajo no debería tocarse

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano) alert('ganaste!');
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}
function arriba(){
  moverEnDireccion(38);
  var gano = chequearSiGano();
  if(gano) alert('ganaste!');
}
function izquierda(){
  moverEnDireccion(37);
  var gano = chequearSiGano();
  if(gano) alert('ganaste!');
}
function abajo(){
  moverEnDireccion(40);
  var gano = chequearSiGano();
  if(gano) alert('ganaste!');
}
function derecha(){
  moverEnDireccion(39);
  var gano = chequearSiGano();
  if(gano) alert('ganaste!');
}
