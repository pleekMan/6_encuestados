/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  
  // ADMIN

  agregarPregunta: function(pregunta, respuestas) {
    console.log("-|| CONTROLADOR => AGREGAR PREGUNTA")
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function (preguntaId) {
    console.log("-|| CONTROLADOR => BORRAR PREGUNTA")
    this.modelo.borrarPregunta(preguntaId);
  },

  editarPregunta: function (preguntaId, nombre) {
    console.log("-|| CONTROLADOR => EDITAR PREGUNTA")
    this.modelo.editarPregunta(preguntaId, nombre);
  },

  borrarTodasPreguntas: function () {
    this.modelo.borrarTodasPreguntas();
  },

  //===========
  // USUARIO

  agregarVoto: function(pregunta,respuestaTexto){
    this.modelo.agregarVoto(pregunta,respuestaTexto);
  },

  cargarPreguntas: function(){
    return this.modelo.cargarPreguntas();
  },


};
