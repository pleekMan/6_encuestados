/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasTodasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  });

  /*
  this.modelo.respuestaAgregada.suscribir(function() {
    console.log("-|| VISTA ADMIN => SUSCRIBIENDO FUNCION A EVENTO RespuestaAgregada")
    //contexto.reconstruirLista();
  });
  */
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.limpiarFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $("<li>").addClass("list-group-item");
    nuevoItem.attr("id",pregunta.id);

    
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);

    var textoRespuestas = "";
    for (let i = 0; i < pregunta.cantidadPorRespuesta.length; i++) {
      textoRespuestas += pregunta.cantidadPorRespuesta[i].textoRespuesta + ", ";
    }
    textoRespuestas = textoRespuestas.slice(0,-2);
    interiorItem.find('small').text(textoRespuestas);
    
      /*
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    */
    
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.controlador.cargarPreguntas();
    if(preguntas != null){
      for (var i=0;i<preguntas.length;++i){
        lista.append(this.construirElementoPregunta(preguntas[i]));
      }
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton

    //AGREGAR PREGUNTA
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('#respuesta [name="option[]"]').each(function(index) {
        if($(this).val() != ""){
          respuestas.push($(this).val());
        }
        console.log(respuestas);
      });

      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    //asociar el resto de los botones a eventos

    //AGREGAR RESPUESTA solo en VISTA
    e.botonAgregarRespuesta.click(function () {
      console.log("-|| Clicking boton AgregarRespuesta");
      $("#respuesta").append('<input type="text" class="form-control" name="option[]" />');
    });

    // BORRAR PREGUNTA
    e.botonBorrarPregunta.click(function () {
      console.log("-|| Clicking boton BorrarPregunta");
      
      var preguntaSeleccionada = $(".list-group-item.active").attr("id");
      console.log("-|| Pregunta Seleccionada: " + preguntaSeleccionada);

      contexto.controlador.borrarPregunta(preguntaSeleccionada);
    });

    // EDITAR PREGUNTA
    e.botonEditarPregunta.click(function () {
      console.log("-|| Clicking boton Editar Pregunta");
      
      var preguntaSeleccionada = $(".list-group-item.active").attr("id");

      var nuevoNombre = window.prompt("Ingresa el Nuevo Nombre de la Pregunta:");

      if(nuevoNombre != ""){
        contexto.controlador.editarPregunta(preguntaSeleccionada, nuevoNombre);
      } 

    });

    e.borrarTodo.click(function (params) {
      contexto.controlador.borrarTodasPreguntas();
    })
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
