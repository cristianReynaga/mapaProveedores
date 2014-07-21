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

function verDetallesEmpresa(idEmpresa){
    alert("ID clickeado: " , idEmpresa);
    console.log(idEmpresa);
}

function siguienteFormulario(muestro, oculto){
    $(".aviso").attr("style", "display:none");
    $(oculto).attr("class", "pasoNoActivo");
    $(muestro).attr("class", "pasoActivo");
    return false;    
}



// Maneja los estilos de los filtros
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

    /*QUERY*/
    //preparo el query para todos los filtros
    var consulta = armoFiltrado ( $('#industria_ftr .activo:button') , "tipo_sigla" , $('#sector_ftr .activo:button'), "sector_sigla" );

    //Tiro el query y oculto infowindows activos
    var visual = visualizacion.getLayers();
    visual[1].setQuery( consulta );
    visual[1].infowindow.set("visibility", false); // Known bug: https://github.com/CartoDB/cartodb.js/issues/26
}


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
