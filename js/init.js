// Instacio el mapa

cartodb.createVis('mapa', 'http://gcba.cartodb.com/api/v2/viz/623b9526-f7ec-11e3-95ab-0e230854a1cb/viz.json');



function main() {
    var map = L.map('mapa', {
        zoomControl: false,
        center: [-34.62600090716574, -58.43402624130249],
        zoom: 13
    });

    // add a nice baselayer from Stamen 
    L.tileLayer('https://a.tiles.mapbox.com/v3/gcbadata.ihd59pm7/{z}/{x}/{y}.png', {
        attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>",
        maxZoom: 16,
        minZoom: 10
    }).addTo(map);

    cartodb.createLayer(map, 'http://gcba.cartodb.com/api/v2/viz/3e8ccade-f59c-11e3-ba2c-0e230854a1cb/viz.json')
        .addTo(map)
        .on('done', function(layer) {
            // get sublayer 0 and set the infowindow template
            var sublayer = layer.getSubLayer(0);

            sublayer.infowindow.set('template', $('#client_infowindow_template').html());
        }).on('error', function() {
            console.log("some error occurred");
        });

}

//window.onload = main;


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




function muestroMarkers( marker ){

    //var statusActivo = $("marker").attr("class").search("activo");;
    console.log(marker);


    switch (marker){
        case "todos":
            $("#filtrar button").removeClass("activo");
            $("#filtrar #todos_btn").addClass("activo");
            break;
        case "aceleradora":
            break;
        case "coworking":
            break;
        case "gobierno":
            break;
        case "incubadora":
            break;
        case "inversor":
            break;
        case "organizacion":
            break;

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