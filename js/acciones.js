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
