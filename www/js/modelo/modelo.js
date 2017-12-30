/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  //this.respuestaAgregada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var todosLosIds = [];
    for (let i = 0; i <  this.preguntas.length; i++)  {
      todosLosIds.push(this.preguntas[i].id);      
    }
    return Math.max(todosLosIds);
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    var votos = [];
    for (let i = 0; i <  respuestas.length; i++)  {
      votos.push(0);
    }
    nuevaPregunta.votos = votos;

    this.preguntas.push(nuevaPregunta);
    this.guardar(this.preguntas);
    this.preguntaAgregada.notificar();
    console.log("-|| MODELO => AGREGANDO PREGUNTA")


  },

  /*
  agregarRespuesta: function (res) {
    console.log("-|| MODELO => AGREGANDO RESPUESTA")
    this.respuestaAgregada.notificar();
  },
  */

  //se guardan las preguntas
  guardar: function(preguntas){
    var stringPreguntas = JSON.stringify(preguntas);
    localStorage.setItem("preguntas",stringPreguntas);

    console.log("|| MODELO => GUARDANDO PREGUNTA")
    console.log("-|| NuevaPregunta DATA: " + this.preguntas[this.preguntas.length - 1]);
  },

  borrarPregunta: function(id){
    for (let i = 0; i <  this.preguntas.length; i++)  {
      if(this.preguntas[i].id == id){
        this.preguntas.splice(i,1);
        this.preguntaBorrada.notificar();
        console.log("-|| MODELO => BORRANDO PREGUNTA")
        break;
      }
    }
    this.guardar(this.preguntas);
    //console.log("-|| MODELO => BORRANDO PREGUNTA")
  }

};
