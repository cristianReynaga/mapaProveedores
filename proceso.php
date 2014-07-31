<?php session_start();

$captcha_txt = $_POST['captcha_txt'];
/*
$captcha = $_POST['captcha'];
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
*/

/* Valido Captcha */

if (!empty($_REQUEST['captcha_txt'])) {
    if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha_txt'])) != $_SESSION['captcha']) {
        echo "M";
    }else{
        echo "B";
        //$result = $cartodb->runSql( "INSERT INTO mapa_emprendedor ( nombre, descripcion ) VALUES (' " . $nombre_frm . "','" . $desc_frm . "')",true);
    }
    $request_captcha = htmlspecialchars($_REQUEST['captcha_txt']);
    unset($_SESSION['captcha']);
}


?>

