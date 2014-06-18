// Instacio el mapa
cartodb.createVis('mapa', 'http://gcba.cartodb.com/api/v2/viz/3e8ccade-f59c-11e3-ba2c-0e230854a1cb/viz.json');


// Bindeo listeners a botones activos
$("#menuSidebar .btn-default").click(function (e) {
	var nombre = $("#menuSidebar .activo").val();

	if (e.target.value !=  nombre){
		// manejo menu
    	$("#menuSidebar .activo").removeClass("activo");
    	$(e.target).addClass("activo");
		abroPantalla($("#menuSidebar .activo").val());
	}
    return false;
});

//corre la pantalla que debo mostrar.
function abroPantalla(pantalla){
	var pantalla_1 = 0,
		pantalla_2 = $("#inicio").width(),
		pantalla_3 = $("#inicio").width() * 2,
		destino = 0;

	switch (pantalla){
		case "inicio": destino = pantalla_1;
			break;
		case "filtrar": destino = pantalla_2;
			break;
		case "acerca": destino = pantalla_3;
			break;
	}

	destino = destino * -1;

	$("#paneles").animate({left: destino}, 250);

}


