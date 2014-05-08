var urlViz = "http://gcba.cartodb.com/api/v2/viz/6b2c9166-d015-11e3-a1ad-0e73339ffa50/viz.json";
//var urlViz = "http://gcba.cartodb.com/api/v2/viz/6b2c9166-d015-11e3-a1ad-0e73339ffa50/viz.json";
//Modelo: http://gcba.cartodb.com/api/v1/viz/bacheo/viz.json


//Modelo: http://gcba.cartodb.com/api/v1/viz/bacheo/viz.json


var myLayer;
var miMap;

miMap = L.map('map', {
	zoomControl : false,
	center : [-34.618234674892, -58.404178619384766],
	zoom : 12
});

// add a nice baselayer from mapbox
L.tileLayer('http://a.tiles.mapbox.com/v3/pixelbeat.map-pet5vndu/{z}/{x}/{y}.png', {
	attribution : 'MapBox'
}).addTo(miMap);

cartodb.createLayer(miMap, 'http://gcba.cartodb.com/api/v1/viz/mapa_emprendedores/viz.json', {
	query : 'select * from mapa_emprendedores'

}).on('done', function(layer) {
	miMap.addLayer(layer);
	myLayer = layer;

	layer.on('featureOver', function(e, pos, latlng, data) {
	   cartodb.log.log(e, pos, latlng, data);
	});

}).on('error', function() {
	cartodb.log.log("some error occurred");
}); 