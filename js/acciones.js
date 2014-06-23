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

    if (tipo === "todos"){
        $('#filtrar button[value="' +  tipo + '"]').addClass("activo")
        $('#filtrar button').removeClass("activo")

//        layer.setOptions({           query: "SELECT * FROM emprendedores WHERE tipo = 'Aceleradora'"        });

        //muestro todos los puntos
        // ..

    }else{
        $('#filtrar #todos_btn').removeClass("activo")
        condicion = $('#filtrar button[value="' +  tipo + '"]').hasClass("activo") ;
    }

    if (condicion){
        $('#filtrar button[value="' +  tipo + '"]').removeClass("activo")
        // Oculto los puntos de TIPO (si no hay activos muestro todos)
        // ..

    }else{
        console.log("Prendo:" + tipo);
        $('#filtrar button[value="' +  tipo + '"]').addClass("activo")
        // Muestro los puntos de TIPO (array con todos los activos)
        // ..
    }

    //si no hay activos se muestran todos
    if ( !$('#filtrar button').hasClass("activo") ){
        $('#filtrar button[value="todos"]').addClass("activo");
        //muestro todos los puntos
        // ..
    }
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
    var desplazamiento = new Array()     
    var ancho = $("#inicio").width();
    for (var i = 0; i < pantallas.length; i++ ){
        desplazamiento.push(ancho * i);
    }

    var destino = desplazamiento[ pantallas.indexOf( pantalla ) ] * -1;

    $("#paneles").animate({
        left: destino
    }, 200);
}
