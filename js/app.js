var sql = cartodb.SQL({
	user : 'gcba'
});

/*
 * Inicializacion del mapa
 */

/*
 * En el submit del form agrega un punto
 */
 
$("form").submit(function() {
	// Estilo de INSERT 
	// http://{account}.cartodb.com/api/v2/sql?q=INSERT INTO test_table (column_name, column_name_2, the_geom) VALUES ('this is a string', 11, ST_SetSRID(ST_Point(-110, 43),4326))&api_key={Your API key}

	var cuenta = "gcba",
		columnas = "the_geom,telefono,descripcion,servicios,inicio_de_actividades,calle,piso_dpto,tipo,web,responsable_proyecto,mail_responsable,mail_institucional,nombre,tags,cartodb_georef_status,pendiente_revision",
		tabla = "mapa_emprendedores",
		apikey = "15ea5821068feecc0584c70d07355848537c2182";


		var tempLatLong = $("#latLong_frm").val();
		tempLatLong = tempLatLong.replace(",", " ");
		valores=  "'" +
			"SRID=4326;POINT(" + tempLatLong + ")','" +
			$("#tele_frm").val() + "','" + 
			$("#desc_frm").val() + "','" +
			$("#serv_frm").val() + "','" +
			$("#acti_frm").val() + "','" +
			$("#direccion_frm").val() + "','" +
			$("#piso_frm").val() + "','" +
			$("#tipo_frm").val() + "','" +
			$("#web_frm").val() + "','" +
			$("#resp_frm").val() + "','" +
			$("#mailRes_frm").val() + "','" +
			$("#mailIns_frm").val() + "','" +
			$("#nombre_frm").val() + "','" +
			$("#tags_frm").val() + "','true',false" ;
	
	var url = "http://" + cuenta + ".cartodb.com/api/v2/sql?q=INSERT INTO " + tabla + " (" + columnas + ") VALUES (" + valores + ")&api_key=" + apikey; 
	$.post(url);

	$('#modal-form').modal('hide');		
				
	return false; // para que Chrome no recargue la página
});

$("button").click(function(d) {
	switch (d.currentTarget.id) {
		case "list-view":
			busquedaListado();
			break;
	}
});


/*
 * Query SQL para ver los detalles de la empresa seleccionada.
 */
function verDetallesEmpresa (par) {
	$('#modal-list').modal('show');		
	var contenido = $('#modal-list .modal-body');
	var idEmpresa = par.replace('emp', ''); 
	var q = "SELECT * FROM mapa_emprendedores WHERE cartodb_id = " + idEmpresa ;
	contenido.children('div').remove();
	sql.execute(q).done(function(data) {
		for (var i = 0; i < data.total_rows; i++) {
			contenido.append(
				"<div class='list-group'>"+
					"<span class='list-group-item'>" +
						"<h4 class='list-group-item-heading'>" + data.rows[i].nombre +
						" <small> (" + data.rows[i].tipo + ")</small></h4>" + 
					    "<p class='list-group-item-text'>" + data.rows[i].descripcion + "</p>" +
					"</span>" +
				"</div>"
			);

			console.log ();

			
			//Tarda demasiado
			$.get("http://gcba.cartodb.com/api/v1/sql?q=select st_y(the_geom) as lat, st_x(the_geom) as lon from mapa_emprendedores WHERE cartodb_id = " + idEmpresa , function(data) {
				for(var i = 0; i < data.rows.length; ++i) {
					var row = data.rows[i];
				    console.log("point", row.lat, row.lon);
					mapaPrincipal.setZoomAround(L.latLng(row.lat, row.lon),15);
				}
			});			
			
			  
			

			contenido.children('.loading').remove();
		}
	}).error(function(errors) {
		console.log("SQL ERR:", errors);
	});
}



/*
 * Query SQL para el listado total.
 */
function busquedaListado() {

	var contenido = $('#modal-list .modal-body');

	var q = "SELECT * FROM mapa_emprendedores WHERE pendiente_revision = true";
	contenido.children('div').remove();
	
	sql.execute(q).done(function(data) {
		for (var i = 0; i < data.total_rows; i++) {

			contenido.append(
				"<div id='emp" + data.rows[i].cartodb_id + "' onclick='verDetallesEmpresa(this.id)'><a href='#' class='list-group-item'> "+ 
					"<span>" +
						data.rows[i].nombre +
						" <small>(" + data.rows[i].tipo + ")</small>" +
					"<span></a></div>"
			);

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
	var contenido = $('#busquedaList');

	if ( $('#busquedaEmprendedores').val() == ''){
			$('#busquedaList').text("");
			$('#busquedaList').css("display: none;");
	}else{
		$('#busquedaList').css("display", "inline");
		key = key.toLowerCase();
		var q = "SELECT * FROM mapa_emprendedores  WHERE pendiente_revision = true AND LOWER(tags) LIKE '%" + key + "%' OR LOWER(nombre) LIKE '%" + key + "%' OR LOWER(tipo) LIKE '%" + key + "%'";
		sql.execute(q).done(function(data) {
			$('#busquedaList').text("");
			for (var i = 0; i < data.total_rows; i++) {
				$('#busquedaList').append(
  					"<a href='#' class='list-group-item' id='emp" + data.rows[i].cartodb_id + "' onclick='verDetallesEmpresa(this.id)'>" + 
    					"<h4 class='list-group-item-heading'>" + data.rows[i].nombre +
    						"<span class='badge'>" + data.rows[i].tipo + "</span>" +
    					"</h4>" + 
					    "<p class='list-group-item-text'>" + 
						    data.rows[i].servicios  +
					    "</p>" + 
					  "</a>"  
				);
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
function generateTypeList() {
	var queryList = "SELECT distinct tipo FROM mapa_emprendedores WHERE pendiente_revision = true";

	var contenido = $('#lista-emprendimientos');
	var tipoForm = $('#tipo_frm');

	sql.execute(queryList).done(function(data) {
	contenido.append("<li><a href='#'> Ver Todos </a></li>");
		for (var i = 0; i < data.total_rows; i++) {

			tipoForm.append("<option>" + data.rows[i].tipo + "</option>");

			contenido.append("<li><a href='#'>" + data.rows[i].tipo + "</a></li>");
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

