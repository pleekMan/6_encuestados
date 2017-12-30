//Evento
var Evento = function(emisor) {
  this.sujeto = emisor;
  this.observadores = [];
};

Evento.prototype = {
  suscribir: function(observador) {
    console.log("-|| EVENTO => SUSCRIBIENDO ALGO")
    this.observadores.push(observador);
  },
  notificar: function() {
    console.log("-|| EVENTO => NOTIFICANDO ALGO")
    for (var i = 0; i < this.observadores.length; i++) {
      this.observadores[i](this.sujeto);
    }
  }
};