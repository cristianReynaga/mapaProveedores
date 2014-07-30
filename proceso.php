<?php session_start();

require_once 'libs/cartodb.class.php';
require_once 'libs/cartodb.config.php';

$config = getConfig();
$cartodb =  new CartoDBClient($config);


$captcha = $_POST['captcha'];
$captcha_txt = $_POST['captcha_txt'];
$nombre_frm =  $_POST['nombre_frm'];
$desc_frm = $_POST['desc_frm'];
$serv_frm = $_POST['serv_frm'];
$acti_frm = $_POST['acti_frm'];
$tags_frm = $_POST['tags_frm'];
$tipo_frm = $_POST['tipo_frm'];
$sector_frm = $_POST['sector_frm'];
$direccion_frm = $_POST['direccion_frm'];
$latLong_frm = $_POST['latLong_frm'];
$piso_frm = $_POST['piso_frm'];
$mailIns_frm = $_POST['mailIns_frm'];
$mailRes_frm = $_POST['mailRes_frm'];
$tele_frm = $_POST['tele_frm'];
$web_frm = $_POST['web_frm'];
$resp_frm = $_POST['resp_frm'];

$captcha_message = "";

/* Valido Captcha */
if (!empty($_REQUEST['captcha_txt'])) {
    if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha_txt'])) != $_SESSION['captcha']) {
        // aviso que el código esta mal y lo recargo
        $captcha_message = "MAL";
    }else{
        $captcha_message = "Grabando datos.";
        //$result = $cartodb->runSql( "INSERT INTO mapa_emprendedor ( nombre, descripcion ) VALUES (' " . $nombre_frm . "','" . $desc_frm . "')",true);

    }
    $request_captcha = htmlspecialchars($_REQUEST['captcha_txt']);
    unset($_SESSION['captcha']);
}


/*
$nombre_frm     nombre
$desc_frm       descripcion
$serv_frm       servicios
$acti_frm       inicio_de_actividades
$tags_frm       tags
$tipo_frm       (tipo) tipo_sigla
$sector_frm     (sector) sector_sigla
$direccion_frm  calle + altura
$latLong_frm    lat lon
$piso_frm       piso_dpto
                localidad
$mailIns_frm    mail_institucional
$mailRes_frm    mail_responsable
$tele_frm       telefono
$web_frm        web
$resp_frm       responsable_proyecto
FALSE           pendiente_revision
*/
?>
