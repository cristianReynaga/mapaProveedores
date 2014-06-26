'use strict'

// Selecciona el tipo de query a correr de ABM
function manejoBase(accion){
	accion = accion.toUpperCase();

	if (accion === "A"){
		var arg1 = $('#ldesc').val(),
			arg2 = $('#lnomb').val(),
			query =  "funciones.php?action=agregaRegistro&arg1=" + arg1 + "&arg2=" + arg2;
	}

	if (accion === "B"){
		var arg1 = $('#lid').val(),
			query =  "funciones.php?action=borraRegistro&arg1=" + arg1 ;
	}

	if (accion === "M"){
		// Aun no hay un update definido pero va con los parametros de "A".
	}

	if (accion === "L"){
		query =  "funciones.php?action=listarRegistro";
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


// Maneja los estilos de los filtros
function seleccionoMarkers( tipo ){
    var condicion = false;
    // P C
    // array de botones con clase activo
    // agregar al parametro de query
    // muestro todos los puntos
    // capas.setQuery("SELECT * FROM emprendedores") //filtro por sql

    if (tipo === "todos"){ // toggle por todos
        $('#filtrar button[value="' +  tipo + '"]').addClass("activo");
        $('#filtrar button').removeClass("activo");
    }else{
        $('#filtrar #todos_btn').removeClass("activo");
        condicion = $('#filtrar button[value="' +  tipo + '"]').hasClass("activo");
    }

    if (condicion){ // toggle resto de los botones
        $('#filtrar button[value="' +  tipo + '"]').removeClass("activo");
    }else{
        $('#filtrar button[value="' +  tipo + '"]').addClass("activo");
    }

    // Si no hay botones activos se activa Todos
    if ( !$('#filtrar button').hasClass("activo") ){
        $('#filtrar button[value="todos"]').addClass("activo");
    }

    //preparo el query para todos los filtros
    var query = armoFiltrado ( $('#filtrar .activo:button') );

    //Tiro el query
    var visual = visualizacion.getLayers();
    visual[1].setQuery(query);

    /*
        Known bug:
        https://github.com/CartoDB/cartodb.js/issues/26
        El cambio de la query en la visualización no cierra los infowindow activos
    */ 
    visual[1].infowindow.set("visibility", false);

}

function armoFiltrado ( lista ){
    var consulta = "SELECT * FROM emprendedores";
    var valores = "";

    for ( var i = 0 ; i < lista.length ; i++ ){
        if ( lista[i].value === "todos"){
            return consulta;
        }else{
            if (i === 0){
                consulta = consulta + " WHERE tipo IN ("
            }
            consulta = consulta + "'"+ lista[i].value.replace(/_/g, " ") +"',";
        }
    }
    consulta = consulta.slice(0,consulta.length-1);
    return consulta + ")";
}

// Corre la query 
function muestroMarcadores (query) {
    var q = "SELECT * FROM mapa_emprendedores_testeo_testeo";
    sql.execute(q).done(function (data) {
        for (var i = 0; i < data.total_rows; i++) {
            contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
            //contenido.children('.loading').remove();
        }
    }).error(function (errors) {
        console.log("SQL ERR:", errors);
    });
}

// Corre la pantalla que debo mostrar en el sidebar
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


//Llena el listado inicial
function busquedaKeyword(key) {
    console.log("pase");
    var contenido = $('#listado');

    if ( $('#busquedaEmprendedores').val() != ''){
        console.log (key);
        key = key.toLowerCase();
        var q = "SELECT * FROM emprendedores  WHERE pendiente_revision = true AND LOWER(tags) LIKE '%" + key + "%' OR LOWER(nombre) LIKE '%" + key + "%' OR LOWER(tipo) LIKE '%" + key + "%'";
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

function verDetallesEmpresa(idEmpresa){
    alert("ID clickeado: " , idEmpresa);
    console.log(idEmpresa);
}

function siguienteFormulario(muestro, oculto){
    // Si campos válidos entonces
    console.log (muestro,oculto);
    $(oculto).attr("class", "pasoNoActivo");
    $(muestro).attr("class", "pasoActivo");
    return false;    
}

function resolverCaptcha(){
    alert("Resolver captcha");
    $("#paso3").attr("class", "pasoNoActivo");
    $("#paso2").attr("class", "pasoNoActivo");
    $("#paso1").attr("class", "pasoActivo");
    return false;    
};