/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasTodasBorradas = new Evento(this);

  this.votoAgregado = new Evento(this);

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
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': []};
    
    for (let i = 0; i < respuestas.length; i++) {
      nuevaPregunta.cantidadPorRespuesta.push({"textoRespuesta":respuestas[i],"cantidad":0});
    }

    /*
    var votos = [];
    for (let i = 0; i <  respuestas.length; i++)  {
      votos.push(0);
    }
    nuevaPregunta.votos = votos;
    */

    this.preguntas.push(nuevaPregunta);
    this.guardar(this.preguntas);
    this.preguntaAgregada.notificar();
    console.log("-|| MODELO => AGREGANDO PREGUNTA")


  },

  //se guardan las preguntas
  guardar: function(preguntas){
    var stringPreguntas = JSON.stringify(preguntas);
    localStorage.setItem("preguntas",stringPreguntas);

    console.log("|| MODELO => GUARDANDO PREGUNTA")
    console.log("-|| NuevaPregunta DATA: " + this.preguntas[this.preguntas.length - 1]);
  },

  cargarPreguntas: function () {
    return this.preguntas = localStorage.getItem("preguntas") == null ? [] : JSON.parse(localStorage.getItem("preguntas"));
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
  },

  editarPregunta: function (preguntaId, nombre) {
    for (let i = 0; i <  this.preguntas.length; i++)  {
      if(this.preguntas[i].id == preguntaId){
        this.preguntas[i].textoPregunta = nombre;
      }
    }
    this.guardar(this.preguntas);
    this.preguntaEditada.notificar();
  },

  agregarVoto: function (pregunta, respuestaTexto) {
    console.log("|| MODELO => AGREGANDO VOTO")
    var respuestasDePregunta = pregunta.cantidadPorRespuesta
    for (let i = 0; i <  respuestasDePregunta.length; i++)  {
      if(respuestasDePregunta[i].textoRespuesta == respuestaTexto){
        respuestasDePregunta[i].cantidad += 1;
      }
    }
    this.guardar(this.preguntas);
    this.votoAgregado.notificar();
  },

  borrarTodasPreguntas: function () {
    this.preguntas.clear();
    localStorage.clear();
    this.preguntasTodasBorradas.notificar();
  },

  obtenerPregunta: function (nombrePregunta) {
    //var preguntas = JSON.parse(localStorage.getItem("preguntas"));
    for (let i = 0; i <  this.preguntas.length; i++)  {
      if(this.preguntas[i].textoPregunta == nombrePregunta){
        return this.preguntas[i];
      }
    }
  }



};
