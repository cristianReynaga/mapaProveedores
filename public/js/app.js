sql = cartodb.SQL({
    user: 'gcba'
});

function init(asd) {
    var sql = sql;

    var map = L.map('map', {
        zoomControl: false,
        center: [-34.59682955724048, -58.45533370971679],
        zoom: 13
    });
    mapaPrincipal = map;

    L.tileLayer('https://a.tiles.mapbox.com/v3/gcbadata.map-0ub2e509/{z}/{x}/{y}.png', {
        attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
    }).addTo(map);

    var layerUrl = 'http://gcba.cartodb.com/api/v2/viz/196d1632-d0ad-11e3-bbd2-0e230854a1cb/viz.json';

    var sublayers = [];

    $("button").click(function (d) {
        switch (d.currentTarget.id) {
        case "list-view":
            busquedaListado();
            break;
        }
    });

    function listarMaps(query) {

        var contenido = $('#modal-list .modal-body');

        var q = "SELECT * FROM mapa_emprendedores";
        sql.execute(q).done(function (data) {
            for (var i = 0; i < data.total_rows; i++) {
                contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
                contenido.children('.loading').remove();
            }
        }).error(function (errors) {
            console.log("SQL ERR:", errors);
        });
    }

    function listarTipos() {

        var contenido = $('#modal-list .modal-body');

        var q = "SELECT * FROM mapa_emprendedores";
        sql.execute(q).done(function (data) {
            for (var i = 0; i < data.total_rows; i++) {
                contenido.append("<div> <span>" + data.rows[i].nombre + " (" + data.rows[i].tipo + ")");
                contenido.children('.loading').remove();
            }
        }).error(function (errors) {
            console.log("SQL ERR:", errors);
        });

    }


    var filterPath = function (path) {
        if (path == "null") {
            return "all";
        } else if (path == "Universidad") {
            return "universidades";
        } else if (path == "Makerspace") {
            return "makerspace";
        } else if (path == "Incubadora") {
            return "incubadora";
        } else if (path == "Espacio") {
            return "coworking";
        } else if (path == "Fondo") {
            return "fondo_inversion";
        } else if (path == "Emprendimiento") {
            return "emprendimiento";
        } else if (path == "Aceleradora") {
            return "aceleradora";
        } else if (path == "Organización") {
            return "organizacion";
        }
    }

    function generateTypeList() {
        var queryList = "SELECT distinct tipo FROM mapa_emprendedores";
        //SELECT * FROM mapa_emprendedores WHERE tipo IN ('Espacio de Coworking','Emprendimiento','Aceleradora','Fondo de Inversión','Incubadora','Makerspace','Universidad')
        var contenido = $('#lista-emprendimientos');
        var tipoForm = $('#tipo_frm');

        sql.execute(queryList).done(function (data) {
            contenido.append("<li><a href='#'> Ver Todos </a></li>");
            for (var i = 0; i < data.total_rows; i++) {
                //
                tipoForm.append("<option>" + data.rows[i].tipo + "</option>");
                //console.log(data.rows[i].tipo[0])
                var id_path = filterPath(data.rows[i].tipo.split(' ')[0]);
                //class="button megacities selected
                if (id_path == "universidad") {
                    console.log(id_path)
                    contenido.append("<li><a href=#" + id_path + " id=" + id_path + " class='button " + id_path + "' selected>" + data.rows[i].tipo + "</a></li>");
                } else {
                    contenido.append("<li><a href=#" + id_path + " id=" + id_path + " class='button " + id_path + "'>" + data.rows[i].tipo + "</a></li>");
                }
            }

        }).error(function (errors) {
            console.log("SQL ERR:", errors);
        });
    }

    function generateYears() {
        var currentTime = new Date();
        var desde = 1990,
            hasta = currentTime.getFullYear();

        var contenido = $('#acti_frm');
        for (var i = desde; i <= hasta; i++) {
            contenido.append("<option>" + i + "</option>");
        }
    }

    generateYears();

    /*
     * updatea la busqueda por keyword
     */
    $("#busquedaEmprendedores").keyup(function () {
        busquedaKeyword($('#busquedaEmprendedores').val());
    });

    var LayerActions = {
        all: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores ");
            return true;
        },
        universidades: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Universidad')");
            return true;
        },
        makerspace: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Makerspace')");
            return true;
        },
        incubadora: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Incubadora')");
            return true;
        },
        coworking: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Espacio de Coworking')");
            return true;
        },
        fondo_inversion: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Fondo de Inversión')");
            return true;
        },
        aceleradora: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Aceleradora')");
            return true;
        },
        emprendimiento: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Emprendimiento')");
            return true;
        },
        organizacion: function () {
            sublayers[0].setSQL("SELECT * FROM mapa_emprendedores WHERE tipo IN ('Organización')");
            return true;
        }
    }

    cartodb.createLayer(map, layerUrl)
        .addTo(map)
        .on('done', function (layer) {
            // change the query for the first layer
            var subLayerOptions = {
                sql: "SELECT * FROM mapa_emprendedores",
            }

            var sublayer = layer.getSubLayer(0);

            sublayer.set(subLayerOptions);

            sublayers.push(sublayer);
        }).on('error', function () {
            //log the error
        });

    $('.button').click(function () {
        $('.button').removeClass('selected');
        $(this).addClass('selected');
        LayerActions[$(this).attr('id')]();
    });
}

window.onload = init

function busquedaListado() {

    var contenido = $('#modal-list .modal-body');

    var q = "SELECT * FROM mapa_emprendedores WHERE pendiente_revision = true";
    contenido.children('div').remove();

    sql.execute(q).done(
        function (data) {
            for (var i = 0; i < data.total_rows; i++) {
                contenido.append(
                    "<div id='emp" + data.rows[i].cartodb_id + "' onclick='verDetallesEmpresa(this.id)'><a href='#' class='list-group-item'> " +
                    "<span>" +
                    data.rows[i].nombre +
                    " <small>(" + data.rows[i].tipo + ")</small>" +
                    "<span></a></div>"
                );
                contenido.children('.loading').remove();
            }
        }).error(
        function (errors) {
            console.log("SQL ERR:", errors);
        });
}

function verDetallesEmpresa(par) {
    $('#modal-list').modal('show');
    var contenido = $('#modal-list .modal-body');
    var idEmpresa = par.replace('emp', '');
    var q = "SELECT * FROM mapa_emprendedores WHERE cartodb_id = " + idEmpresa;
    contenido.children('div').remove();
    sql.execute(q).done(function (data) {
        for (var i = 0; i < data.total_rows; i++) {
            contenido.append(
                "<div class='list-group'>" +
                "<span class='list-group-item'>" +
                "<h4 class='list-group-item-heading'>" + data.rows[i].nombre +
                " <small> (" + data.rows[i].tipo + ")</small></h4>" +
                "<p class='list-group-item-text'>" + data.rows[i].descripcion + "</p>" +
                "</span>" +
                "</div>"
            );

            $.get("http://gcba.cartodb.com/api/v1/sql?q=select st_y(the_geom) as lat, st_x(the_geom) as lon from mapa_emprendedores WHERE cartodb_id = " + idEmpresa, function (data) {
                for (var i = 0; i < data.rows.length; ++i) {
                    var row = data.rows[i];
                    console.log("point", row.lat, row.lon);
                    mapaPrincipal.panTo(L.latLng(row.lat, row.lon));
                    mapaPrincipal.setZoom(15);
                }
            });

            contenido.children('.loading').remove();
        }
    }).error(function (errors) {
        console.log("SQL ERR:", errors);
    });
}


function busquedaKeyword(key) {
	var contenido = $('#busquedaList');

	if ( $('#busquedaEmprendedores').val() == ''){
			$('#busquedaList').text("");
			$('#busquedaList').css("display: none;");
	}else{
		$('#busquedaList').css("display", "inline");
		key = key.toLowerCase();
		var q = "SELECT * FROM mapa_emprendedores  WHERE pendiente_revision = true AND LOWER(tags) LIKE '%" + key + "%' OR LOWER(nombre) LIKE '%" + key + "%' OR LOWER(tipo) LIKE '%" + key + "%'";
		sql.execute(q).done(function(data) {
			$('#busquedaList').text("");
			for (var i = 0; i < data.total_rows; i++) {
				$('#busquedaList').append(
  					"<a href='#' class='list-group-item' id='emp" + data.rows[i].cartodb_id + "' onclick='verDetallesEmpresa(this.id)'>" + 
    					"<h4 class='list-group-item-heading'>" + data.rows[i].nombre +
    						"<span class='badge'>" + data.rows[i].tipo + "</span>" +
    					"</h4>" + 
					    "<p class='list-group-item-text'>" + 
						    data.rows[i].servicios  +
					    "</p>" + 
					  "</a>"  
				);
			}
		}).error(function(errors) {
			console.log("SQL ERR:", errors);
		});
	}
}
