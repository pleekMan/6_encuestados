/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    console.log("-|| CONTROLADOR => AGREGAR PREGUNTA")
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function (preguntaId) {
    console.log("-|| CONTROLADOR => BORRAR PREGUNTA")
    this.modelo.borrarPregunta(preguntaId);
  },
  /*
  agregarRespuesta: function(pregunta, respuesta) {
    console.log("-|| CONTROLADOR => AGREGAR PREGUNTA")
    this.modelo.agregarPregunta(pregunta, respuesta);
  },
  */
};
