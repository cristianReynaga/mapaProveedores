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
		$result = $cartodb->runSql("SELECT * FROM tabla_php",false); //definir que busco y en donde.
		echo json_encode($result);
	}

	if($action == "agregaRegistro") {
		$arg1 = $_REQUEST["arg1"];
		$arg2 = $_REQUEST["arg2"];
		$result = $cartodb->runSql( "INSERT INTO tabla_php ( name , description ) VALUES (' " . $arg1 . "','" . $arg2 . "')",false);
	}


	// Al php va: UPDATE tabla_php SET columna1=valor1,columna2=valor2, y así WHERE cartodb_id = ID_del_registro_seleccionado;

	if($action == "borraRegistro") {
		$arg1 = $_REQUEST["arg1"];
		$result = $cartodb->runSql( "DELETE FROM tabla_php WHERE cartodb_id = " . $arg1 ,false);
	}

	if($action == "listarRegistro") {
		$result = $cartodb->runSql("SELECT cartodb_id , the_geom , nombre , descripcion , calle, direccion_normalizada, inicio de actividades , web FROM tabla_php",false);
		echo json_encode($result);
	}

?>