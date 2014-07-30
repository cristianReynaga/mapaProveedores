'use strict'

// Selecciona el tipo de query a correr de ABM
function manejoBase(accion){
	accion = accion.toUpperCase();

	if (accion === "A"){
		var arg1 = $('#ldesc').val(),
			arg2 = $('#lnomb').val(),
			query =  "funciones.php?action=agregaRegistro&arg1=" + arg1 + "&arg2=" + arg2;
	}

	var resultado = consultaSQL(query, accion);
}

// Corre via PHP el query de ABM
function consultaSQL(param, listado){
	$.ajax({
		url: param
	}).success(function(data) {
		if (data !== ''){
			var resultado = jQuery.parseJSON( data );
			if (listado === "L"){
				listado = resultado.return.rows ;
				console.log ("Listado cargado.");
			}
			console.log ("Comando realizado con éxito");
		}
	}).error(function(){
		console.log("No se pudo completar el comando");
	});
}

// Ejecuta la query 
function muestroMarcadores (query) {
    var q = "SELECT * FROM mapa_emprendedor";
    sql.execute(q).done(function (data) {
        for (var i = 0; i < data.total_rows; i++) {
            contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
            //contenido.children('.loading').remove();
        }
    }).error(function (errors) {
        console.log("SQL ERR:", errors);
    });
}

// Corre las pantallas principales que debo mostrar en el sidebar
function abroSlide(pantalla) {
    var pantallas = ["inicio","filtrar","crear","acerca"]; // mantener el orden
    var desplazamiento = new Array();
    var ancho = $("#inicio").width();
    for (var i = 0; i < pantallas.length; i++ ){
        desplazamiento.push(ancho * i);
    }

    var destino = desplazamiento[ pantallas.indexOf( pantalla ) ] * -1;

    $("#paneles").animate({
        left: destino
    }, 200);
}


//Llena el listado de la pantalla INICIO
function busquedaKeyword(key) {
    var contenido = $('#listado');

    if ( $('#busquedaEmprendedores').val() != ''){
        console.log (key);
        key = key.toLowerCase();
        var q = "SELECT * FROM mapa_emprendedor WHERE pendiente_revision = true AND LOWER(tags) LIKE '%" + key + "%' OR LOWER(nombre) LIKE '%" + key + "%' OR LOWER(tipo) LIKE '%" + key + "%'";
        sql.execute(q).done(function(data) {
            $('#resultados').text("");
            for (var i = 0; i < data.total_rows; i++) {
                $('#resultados').append(
                    "<li>" +
                        "<a href='#' id='empID" +
                            data.rows[i].cartodb_id +
                            "' onclick='verDetallesEmpresa(this.id)'>" + 
                            data.rows[i].nombre +
                        "</a>" +
                            "<span class='badge pull-right'>" +
                                data.rows[i].tipo +
                            "</span>" +
                    "</li>"
                );
            }
        }).error(function(errors) {
            console.log("SQL ERR:", errors);
        });
    }
}

// Cuando se selecciona una empresa (definir accion)
function verDetallesEmpresa(idEmpresa){
    var nro = idEmpresa.split("empID");

    var sql_statement = "SELECT * FROM mapa_emprendedor WHERE cartodb_id = " + nro[1];

    $.getJSON('http://gcba.cartodb.com/api/v2/sql/?q='+sql_statement, function(data) {
        // zoom al marker
        capas.setZoom(16);
        capas.setCenter([data.rows[0].lat, data.rows[0].lon]);
        openInfowindow(capaInfowindows,[data.rows[0].lat, data.rows[0].lon],data.rows[0].cartodb_id,0);

    });
}


function openInfowindow(layer, latlng, cartodb_id) {
    layer.trigger('featureClick', null, latlng, null, { cartodb_id: cartodb_id }, 0);
    console.log ( layer.trigger('featureClick', null, latlng, null, { cartodb_id: cartodb_id }, 0)  );
}



// Maneja los estilos de las pantallas del formulario de alta.
function siguienteFormulario(muestro, oculto){
    $(".aviso").attr("style", "display:none");
    $(oculto).attr("class", "pasoNoActivo");
    $(muestro).attr("class", "pasoActivo");
    return false;    
}

// Maneja los estilos de las vistas de los filtros activados y desactivados
function seleccionoMarkers( tipo ){  // e.target.value
    
    if (tipo === "TIN" ) { // Todos saca la actividad de la clase.
        $('#industria_ftr button').removeClass("activo");
        $('#industria_ftr button[value="' +  tipo + '"]').addClass("activo");
    }

    if (tipo === "TSEC"){ // toggle por todosSEC
        $('#sector_ftr button').removeClass("activo");
        $('#sector_ftr button[value="' +  tipo + '"]').addClass("activo");
    }

    if (tipo !== "TSEC" && tipo !== "TIN") { // toggle el seleccionado
        if (tipo.length === 3){ // es industria
            if ( $('#industria_ftr button[value="' +  tipo + '"]').hasClass("activo")){
                $('#industria_ftr button[value="' +  tipo + '"]').removeClass("activo");
            }else{
                $('#industria_ftr button[value="TIN"]').removeClass("activo");
                $('#industria_ftr button[value="' +  tipo + '"]').addClass("activo");
            }
        }else{ // es sector
            if ( $('#sector_ftr button[value="' +  tipo + '"]').hasClass("activo")){
                $('#sector_ftr button[value="' +  tipo + '"]').removeClass("activo");
            }else{
                $('#sector_ftr button[value="TSEC"]').removeClass("activo");
                $('#sector_ftr button[value="' +  tipo + '"]').addClass("activo");
            }
        }
    }


    var listadoUNO =  $('#industria_ftr button');
    var condicionUNO = new Array();
    var listadoDOS =  $('#sector_ftr button');
    var condicionDOS = new Array();

    for (var i = 1; i < listadoUNO.length; i++){
        condicionUNO.push( $(listadoUNO[i]).hasClass("activo") );
    }

    if ( $.inArray(true , condicionUNO) < 0 ){
        $('#industria_ftr button[value="TIN"]').addClass("activo");
    }

    for (var i = 1; i < listadoDOS.length; i++){
        condicionDOS.push( $(listadoDOS[i]).hasClass("activo") );
    }

    if ( $.inArray(true , condicionDOS) < 0 ){
        $('#sector_ftr button[value="TSEC"]').addClass("activo");
    }

    //preparo la query para todos los filtros
    var consulta = armoFiltrado ( $('#industria_ftr .activo:button') , "tipo_sigla" , $('#sector_ftr .activo:button'), "sector_sigla" );
  
    var visual = visualizacion.getLayers(); //Ejecuto la query y oculto infowindows activos
    visual[1].setQuery( consulta );
    visual[1].infowindow.set("visibility", false); // Known bug: https://github.com/CartoDB/cartodb.js/issues/26
}

// vacía todos los campos del formulario de alta.
function resetAllFields (){
    $("#nombre_frm").val("");
    $("#desc_frm").val("");
    $("#serv_frm").val("");
    $("#acti_frm").val("");
    $("#tags_frm").val("");
    $("#tipo_frm").val("Seleccione");
    $("#sector_frm").val("Seleccione");
    $("#direccion_frm").val("");
    $("#latLong_frm").val("");
    $("#piso_frm").val("");
    $("#mailIns_frm").val("");
    $("#mailRes_frm").val("");
    $("#tele_frm").val("")
    $("#web_frm").val("")
    $("#resp_frm").val("");
}

// Maneja las vistas de los filtros por Industria y/o Sector
function armoFiltrado ( listaIND , columnaIND , listaSEC , columnaSEC ){
    var retorno_consulta = "SELECT * FROM mapa_emprendedor";
    var hay_consulta_industria = false;

    if (listaIND.val() !== "TIN"){
        hay_consulta_industria = true;
        console.log(listaIND.val())
        retorno_consulta = retorno_consulta + " WHERE " + columnaIND + " IN (";
        for (var i = 0; i < listaIND.length ; i++){
            retorno_consulta = retorno_consulta + "'" + listaIND[i].value + "',";
        }
        retorno_consulta = retorno_consulta.substring(0, retorno_consulta.length-1) + ")";
    }

    if (listaSEC.val() !== "TSEC"){
        console.log(listaSEC.val())

        if (hay_consulta_industria){
            retorno_consulta = retorno_consulta + " AND " + columnaSEC + " IN (";
        } else {
            retorno_consulta = retorno_consulta + " WHERE " + columnaSEC + " IN (";
        } 
        
        for (var i = 0; i < listaSEC.length ; i++){
            retorno_consulta = retorno_consulta + "'" + listaSEC[i].value + "',";
        }
        retorno_consulta = retorno_consulta.substring(0, retorno_consulta.length-1) + ")";
    }

    return retorno_consulta;
}
