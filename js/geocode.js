var geocoder;
var minimapa;

function init() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(-34.609879, -58.391900);
	var mapOptions = {
		zoom : 15,
		mapTypeControl : false,
		streetViewControl : false,
		center : latlng
	};
	minimapa = new google.maps.Map(document.getElementById('minimapa'), mapOptions);
}

function buscarDireccion() {
	var direccion = document.getElementById('direccion_frm').value;
	geocoder.geocode({
		'address' : direccion + ",ciudad autonoma de buenos aires"
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			minimapa.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map : minimapa,
				position : results[0].geometry.location				
			});
			console.log();
			$("#latLong_frm").val(marker.position.A  + "," +  marker.position.k);
		} else {
			console.log('No se pudo geocodificar la direccion. Error : ' + status);
		}
	});
}

google.maps.event.addDomListener(window, 'load', init);