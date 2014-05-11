function init(asd) {
  console.log(asd)
  var sql = cartodb.SQL({
          user : 'gcba'
  });
  
  var map = L.map('map', { 
    zoomControl: false,
    center: [-34.59682955724048, -58.45533370971679],
    zoom: 13
  });
  
  L.tileLayer('https://a.tiles.mapbox.com/v3/gcbadata.map-0ub2e509/{z}/{x}/{y}.png', {
    attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
  }).addTo(map);

  var layerUrl = 'http://gcba.cartodb.com/api/v2/viz/196d1632-d0ad-11e3-bbd2-0e230854a1cb/viz.json';

  var sublayers = [];
  
  $("button").click(function(d) {
      switch (d.currentTarget.id) {
        case "list-view":
          busquedaListado();
          break;
      }
  });

  function busquedaListado() {
      
    var contenido = $('#modal-list .modal-body');
    
    var q = "SELECT * FROM mapa_emprendedores";
    sql.execute(q).done(function(data) {
        for (var i = 0; i < data.total_rows; i++) {
            contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
            contenido.children('.loading').remove();
        }
    }).error(function(errors) {
            console.log("SQL ERR:", errors);
    });
    
  }

  function listarMaps(query) {
      
    var contenido = $('#modal-list .modal-body');
      
    var q = "SELECT * FROM mapa_emprendedores";
    sql.execute(q).done(function(data) {
      for (var i = 0; i < data.total_rows; i++) {
          contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
          contenido.children('.loading').remove();
      }
    }).error(function(errors) {
            console.log("SQL ERR:", errors);
    });
  }
  
  function listarTipos() {
      
    var contenido = $('#modal-list .modal-body');
      
    var q = "SELECT * FROM mapa_emprendedores";
    sql.execute(q).done(function(data) {
        for (var i = 0; i < data.total_rows; i++) {
            contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
            contenido.children('.loading').remove();
        }
    }).error(function(errors) {
            console.log("SQL ERR:", errors);
    });
    
  }  

  function busquedaKeyword(key) {
    if ( $('#busquedaEmprendedores').val() == ''){
        $('#busquedaList').text("");
        console.log ( $('#busquedaEmprendedores').val() );
    } else {
      key = key.toLowerCase();
      var q = "SELECT * FROM mapa_emprendedores WHERE LOWER(tags) LIKE '%" + key + "%' OR LOWER(nombre) LIKE '%" + key + "%' OR LOWER(tipo) LIKE '%" + key + "%'";
      sql.execute(q).done(function(data) {
        $('#busquedaList').text("");
        for (var i = 0; i < data.total_rows; i++) {
          $('#busquedaList').append('<div> <span>' + data.rows[i].nombre + ' (' + data.rows[i].tipo + ')</span></div>');
        }
      }).error(function(errors) {
          console.log("SQL ERR:", errors);
      });
    }
  }
  
  var filterPath = function(path){
    if (path == "null") {
        return "all";
    } else if (path == "Universidad") {
        return "universidades";
    } else if (path == "Universidad") {
        return "universidades";
    } else if (path == "Makerspace"){
        return "makerspace";
    } else if  (path == "Incubadora") {
        return "incubadora"
    } else if (path == "Espacio"){
        return "coworking";
    } else if  (path == "Fondo") {
        return "fondo_inversion"
    } else if  (path == "Emprendimiento") {
        return "emprendimiento"
    } else if  (path == "Aceleradora") {
        return "aceleradora"
    } else if  (path == "Organización") {
        return "organización"
    }
  }

  function generateTypeList() {
    var queryList = "SELECT distinct tipo FROM mapa_emprendedores";
    //SELECT * FROM mapa_emprendedores WHERE tipo IN ('Espacio de Coworking','Emprendimiento','Aceleradora','Fondo de Inversión','Incubadora','Makerspace','Universidad')
    var contenido = $('#lista-emprendimientos');
    var tipoForm = $('#tipo_frm');
    
    sql.execute(queryList).done(function(data) {
    contenido.append("<li><a href='#'> Ver Todos </a></li>");
      for (var i = 0; i < data.total_rows; i++){
          //
          tipoForm.append("<option>" + data.rows[i].tipo + "</option>");
          //console.log(data.rows[i].tipo[0])
          var id_path = filterPath(data.rows[i].tipo.split(' ')[0]);
          //class="button megacities selected
          if (id_path == "universidad") {
            console.log(id_path)
            contenido.append("<li><a href=#"+id_path+ " id=" + id_path + " class='button " + id_path + "' selected>" + data.rows[i].tipo + "</a></li>");
          } else {
            contenido.append("<li><a href=#"+id_path+ " id=" + id_path + " class='button " + id_path + "'>" + data.rows[i].tipo + "</a></li>");
          }
      }
            
    }).error(function(errors) {
            console.log("SQL ERR:", errors);
    });
  }

  function generateYears() {
      var currentTime = new Date();
      var desde = 1990, hasta = currentTime.getFullYear();
          
      var contenido = $('#acti_frm');
      for (var i = desde; i <= hasta; i++) {
          contenido.append("<option>" + i + "</option>");
      }
  }
  
  generateYears();
  //generateTypeList();

/*
 * updatea la busqueda por keyword
 */

//si vacio entonces nada
  $("#busquedaEmprendedores").keyup(function() {
    busquedaKeyword($('#busquedaEmprendedores').val());
  });


  var LayerActions = {
    all: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores ");
      return true;
    },
    universidades: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Universidad')");
      return true;
    },
    makerspace: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Makerspace')");
      return true;
    },
    incubadora: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Incubadora')");
      return true;
    },
    coworking: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Espacio de Coworking')");
      return true;
    },
    fondo_inversion: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Fondo de Inversión')");
      return true;
    }
  }

  cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
      // change the query for the first layer
      var subLayerOptions = {
        sql: "SELECT * FROM mapa_emprendedores",
      }
      
      var sublayer = layer.getSubLayer(0);
      
      sublayer.set(subLayerOptions);
      
      sublayers.push(sublayer);
    }).on('error', function() {
      //log the error
    });
    
  $('.button').click(function(){
    $('.button').removeClass('selected');
    $(this).addClass('selected');
    LayerActions[$(this).attr('id')]();
  });
}

window.onload = init