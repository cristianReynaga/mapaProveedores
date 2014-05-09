var urlViz = "http://gcba.cartodb.com/api/v2/viz/6b2c9166-d015-11e3-a1ad-0e73339ffa50/viz.json";
var sql = cartodb.SQL({
	user : 'gcba'
});

/*
 * Inicializacion del mapa
 */

$("button").click(function(d) {
	switch (d.currentTarget.id) {
		case "list-view":
			busquedaListado();
			break;
	}
});

/*
 * Query SQL para el listado total.
 */

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

/*
 * Hace un query a la base de emprendedores con lo que se
 * escriba en el input CASE SENSITIVE
 */
function busquedaKeyword(key) {
	if ( $('#busquedaEmprendedores').val() == ''){
			$('#busquedaList').text("");
			console.log ( $('#busquedaEmprendedores').val() );
	}else{
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

/*
 * Llena el selector de FILTRAR EMPRENDIMIENTOS mediante un query
 * a la base de datos por el campo tipo
 */

var layerUrl = 'http://documentation.cartodb.com/api/v2/viz/9af23dd8-ea10-11e2-b5ac-5404a6a683d5/viz.json';

  var sublayers = [];

  cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
      // change the query for the first layer
      var subLayerOptions = {
        sql: "SELECT * FROM ne_10m_populated_p_2",
        cartocss: "#ne_10m_populated_p_2{marker-fill: #F84F40; marker-width: 8; marker-line-color: white; marker-line-width: 2; marker-clip: false; marker-allow-overlap: true;}"
      }

      var sublayer = layer.getSubLayer(0);

      sublayer.set(subLayerOptions);

      sublayers.push(sublayer);
    }).on('error', function() {
      //log the error
    });

var list_querys = {
    all: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores");
      return true;
    },
    I: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Incubadora')");
      return true;
    },
    E: function(){
	sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Espacio de Coworking')");
	return true;
    },
    F: function(){
      sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Fondo de Inversión')");
      return true;
    },
    M: function(){
	sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Makerspace')");
	return true;
    },
    U: function(){
	sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Universidad')");
	return true;
    }
}


var asd = function(button){
	$('.button').click(function(){
		$('.button').removeClass('selected');
		$(this).addClass('selected');
		list_querys[$(this).attr('id')]();
	});
}
			
function generateTypeList() {
	var queryList = "SELECT distinct tipo FROM mapa_emprendedores";
	//SELECT * FROM mapa_emprendedores WHERE tipo IN ('Espacio de Coworking','Emprendimiento','Aceleradora','Fondo de Inversión','Incubadora','Makerspace','Universidad')
	//var queryAcelerador = "SELECT * FROM mapa_emprendedores WHERE tipo IN (" + query + ")"
	var contenido = $('#lista-emprendimientos');
	var tipoForm = $('#tipo_frm');

	sql.execute(queryList).done(function(data) {
	contenido.append("<li><a href='#'> Ver Todos </a></li>");
		for (var i = 0; i < data.total_rows; i++){
			//
			tipoForm.append("<option>" + data.rows[i].tipo + "</option>");
			//console.log(data.rows[i].tipo[0])
			contenido.append("<li><a href=" + data.rows[i].tipo[0] + ">" + data.rows[i].tipo + "</a></li>");
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
generateTypeList();

/*
 * updatea la busqueda por keyword
 */

//si vacio entonces nada
$("#busquedaEmprendedores").keyup(function() {
	busquedaKeyword($('#busquedaEmprendedores').val());
});
