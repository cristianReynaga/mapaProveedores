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

	if($action == "borraRegistro") {
		$arg1 = $_REQUEST["arg1"];
		$result = $cartodb->runSql( "DELETE FROM tabla_php WHERE cartodb_id = " . $arg1 ,false);
	}

?>