'use strict'

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
		//no hay un update definido pero va con los parametros de "A".

		/*
		Al php va:
		UPDATE tabla_php
		SET columna1=valor1,columna2=valor2, y así
		WHERE cartodb_id = ID_del_registro_seleccionado;

		*/

	}

	if (accion === "L"){

		var arg1 = $('#lbusc').val(),
			query =  "funciones.php?action=buscaRegistro&arg1=" + arg1 ;
		}
		
		var resultado = consultaSQL(query);

}


function busquedaKeyword(key){
    key = key.toLowerCase();
    var q = "SELECT * FROM mapa_emprendedores WHERE LOWER(tags) LIKE '%" + key + "%' OR LOWER(nombre) LIKE '%" + key +"%' OR LOWER(tipo) LIKE '%" + key +"%'";
    sql.execute(q)
        .done(function(data) {
            $('#resultadoBusqueda').text("");
            for (var i = 0; i < data.total_rows; i++) {
                $('#resultadoBusqueda').append('<div> <span>' + 
                    data.rows[i].nombre + 
                    ' (' + 
                    data.rows[i].tipo +
                    ')');
            }
        })
     
        .error(function(errors) {
           console.log("SQL ERR:",errors);
        });
}

function consultaSQL(param){
	$.ajax({
		url: param
	}).success(function(data) {
		if (data !== ''){
			var resultado = jQuery.parseJSON( data );
			console.log ( "Cantidad de registros", resultado.return.rows.length );
		}
	}).error(function(){
		console.log("No se pudo completar el comando");
	});
}
