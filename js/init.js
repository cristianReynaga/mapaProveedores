// Instacio el mapa

var visualizacion = cartodb.createVis('mapa', 'http://gcba.cartodb.com/api/v2/viz/623b9526-f7ec-11e3-95ab-0e230854a1cb/viz.json');

// Bindeo listeners a botones activos top menu sidebar
$("#menuSidebar .btn-default").click(function(e) {
    var nombre = $("#menuSidebar .activo").val();
    if (e.target.value != nombre) {
        // manejo menu
        $("#menuSidebar .activo").removeClass("activo");
        $(e.target).addClass("activo");
        abroPantalla($("#menuSidebar .activo").val());
    }
    return false; //para que no recarge chrome (bug)
});

// Bindeo listeners a botones de filtros
$("#filtrar .btn-default").click(function(e) {
    muestroMarkers (e.target.value);
    return false; //para que no recarge chrome (bug)
});




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


//cargo JSON con listado
manejoBase("L");

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
