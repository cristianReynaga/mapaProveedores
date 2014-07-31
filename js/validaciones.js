//validacion de formulario
function validoPaso(nro){
    var pantallaValidada = new Array();
    var dato;
    var actualidad = new Date().getFullYear();
        if (nro === 1){
            dato = $("#nombre_frm").val();
            if (dato.length > 1 && dato.length <= 30) { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            dato  = $("#desc_frm").val();
            if (dato.length > 10 && dato.length < 145)  { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            dato  = $("#serv_frm").val();
            if (dato.length > 2)  { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            dato  = parseInt($("#acti_frm").val());
            if (dato > 1900 && dato <= actualidad)  { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            dato  = $("#tags_frm").val();
            if (dato.length > 2)  { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            dato  = $("#tipo_frm").val();
            if (dato != "Seleccione")  { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            dato  = $("#sector_frm").val();
            if (dato != "Seleccione")  { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            validarFormulario(pantallaValidada, "#paso1");
    }

    if (nro === 2){
            dato = $("#direccion_frm").val();
            if (dato.length > 5) { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            dato = $("#latLong_frm").val();
            if (dato.length != "") { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
            validarFormulario(pantallaValidada, "#paso2");
    }

    if (nro === 3){
        dato  = $("#mailIns_frm").val();
        if ( validarEmail(dato)) { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
        dato  = $("#mailRes_frm").val();
        if ( validarEmail(dato)) { pantallaValidada.push(true); } else {pantallaValidada.push(false);}
        validarFormulario(pantallaValidada, "#paso3");
        nuevoCaptcha();
    }
}


function validarFormulario (validacion, paso){
    if  ( validacion.indexOf(false) < 0  ){
        switch (paso){
            case "#paso1":
                siguienteFormulario('#paso2','#paso1')
                google.maps.event.trigger(minimapa, 'resize');
                break;
            case "#paso2":
                siguienteFormulario('#paso3','#paso2')
                break;
            case "#paso3":
                siguienteFormulario('#paso4','#paso3')
                break;
        } 
    } else {
        $(".aviso").attr("style", "display:inline");
    }
}


function validarEmail(mailCheck) {
    if (mailCheck === ""){
        return true;
    }else{
        var expr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/        
        return mailCheck.match(expr) 
    }
 
}

function buscarDireccion() {
    google.maps.event.trigger(minimapa, 'resize'); 
    var direccion = document.getElementById('direccion_frm').value;
    geocoder.geocode({
        'address' : direccion
            }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            minimapa.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map : minimapa,
                position : results[0].geometry.location             
            });
            $("#latLong_frm").val(marker.position.B  + "," +  marker.position.k);
        } else {
            console.log('No se pudo geocodificar la direccion. Error : ' + status);
        }
    });
}
