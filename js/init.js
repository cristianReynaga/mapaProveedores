// Instacio el mapa

// cartodb.createVis('mapa', 'http://gcba.cartodb.com/api/v2/viz/3e8ccade-f59c-11e3-ba2c-0e230854a1cb/viz.json');


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

window.onload = main;