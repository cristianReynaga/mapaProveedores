<?php

	require_once 'libs/cartodb.class.php';
	require_once 'libs/cartodb.config.php';

	$config = getConfig();
	$cartodb =  new CartoDBClient($config);
	$action = $_REQUEST["action"];

	if (!$cartodb->authorized) {
		error_log("uauth");
		print 'No se pudo autenticar.';
		exit();
	}

	if($action == "buscaRegistro") {
		$arg1 = $_REQUEST["arg1"];
		$result = $cartodb->runSql("SELECT * FROM mapa_emprendedor",true); //definir que busco y en donde. nombre, descripción o tag
		echo json_encode($result);
	}

	if($action == "agregaRegistro") {
		$arg1 = $_REQUEST["arg1"];
		$arg2 = $_REQUEST["arg2"];
		$result = $cartodb->runSql( "INSERT INTO mapa_emprendedor ( name , description ) VALUES (' " . $arg1 . "','" . $arg2 . "')",true);
	}

	if($action == "listarRegistro") {
		$result = $cartodb->runSql("SELECT cartodb_id , the_geom , nombre , descripcion , calle, direccion_normalizada, inicio de actividades , web FROM mapa_emprendedor",true);
		echo json_encode($result);
	}

	if($action == "filtro"){
		$result = $cartodb->runSql("SELECT * FROM mapa_emprendedor WHERE tipo = 'Aceleradora'",true);
	}

?>