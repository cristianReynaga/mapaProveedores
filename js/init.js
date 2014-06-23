'use strict'

// Instacio el mapa
var visualizacion = cartodb.createVis('mapa', 'http://gcba.cartodb.com/api/v2/viz/623b9526-f7ec-11e3-95ab-0e230854a1cb/viz.json');


// Bindeo listeners a botones activos top menu sidebar
$("#menuSidebar .btn-default").click(function(e) {
    var nombre = $("#menuSidebar .activo").val();
    if (e.target.value != nombre) {
        // manejo menu
        $("#menuSidebar .activo").removeClass("activo");
        $(e.target).addClass("activo");
        abroSlide($("#menuSidebar .activo").val());
    }
    return false; //para que no recarge chrome (known issue)
});


// Bindeo listeners a botones de filtros
$("#filtrar .btn-default").click(function(e) {
    seleccionoMarkers (e.target.value);
    return false; //para que no recarge chrome (known issue)
});
