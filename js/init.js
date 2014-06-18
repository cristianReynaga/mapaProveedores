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

function abroPantalla(pantalla){

	console.log("Abro la pantalla de: " + pantalla);
}