'use strict'

var listado;

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
		// no hay un update definido pero va con los parametros de "A".
		
	}

	if (accion === "L"){
		query =  "funciones.php?action=listarRegistro";
	}
	
	var resultado = consultaSQL(query, accion);
}

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


function muestroMarkers( tipo ){

    var condicion = false;
    
    if (tipo === "todos"){
        $('#filtrar button[value="' +  tipo + '"]').addClass("activo")
        $('#filtrar button').removeClass("activo")
        //muestro todos los puntos

    }else{
        $('#filtrar #todos_btn').removeClass("activo")
        condicion = $('#filtrar button[value="' +  tipo + '"]').hasClass("activo") ;
    }

    if (tipo !== "todos"){
        var mark = $('#filtrar button[value="' +  tipo + '"]').hasClass("activo") ;
        $('#filtrar button[value="' +  tipo + '"]').addClass("activo")
    }

    if (condicion){
        $('#filtrar button[value="' +  tipo + '"]').removeClass("activo")
        // Oculto los puntos de TIPO
        // ..

    }else{
        console.log("Prendo:" + tipo);
        $('#filtrar button[value="' +  tipo + '"]').addClass("activo")
        // Muestro los puntos de TIPO
        // ..

    }

}

//corre la pantalla que debo mostrar.

function abroPantalla(pantalla) {
    var pantalla_1 = 0,
        pantalla_2 = $("#inicio").width(),
        pantalla_3 = $("#inicio").width() * 2,
        destino = 0;

    switch (pantalla) {
        case "inicio":
            destino = pantalla_1;
            break;
        case "filtrar":
            destino = pantalla_2;
            break;
        case "acerca":
            destino = pantalla_3;
            break;
    }

    destino = destino * -1;

    $("#paneles").animate({
        left: destino
    }, 250);

}


// Implementar en filtros
    function filtrarPor(query) {

        var contenido = $('#modal-list .modal-body');

        var q = "SELECT * FROM mapa_emprendedores_testeo_testeo";
        sql.execute(q).done(function (data) {
            for (var i = 0; i < data.total_rows; i++) {
                contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
                contenido.children('.loading').remove();
            }
        }).error(function (errors) {
            console.log("SQL ERR:", errors);
        });
    }


// Implementar en buscador
    function listarMaps(query) {

        var contenido = $('#modal-list .modal-body');

        var q = "SELECT * FROM mapa_emprendedores_testeo_testeo";
        sql.execute(q).done(function (data) {
            for (var i = 0; i < data.total_rows; i++) {
                contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
                contenido.children('.loading').remove();
            }
        }).error(function (errors) {
            console.log("SQL ERR:", errors);
        });
    }



