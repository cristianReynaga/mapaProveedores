<?php session_start();

require_once 'libs/cartodb.class.php';
require_once 'libs/cartodb.config.php';

$config = getConfig();
$cartodb = new CartoDBClient($config);

// Check if the $key and $secret work fine and you are authorized
if (!$cartodb->authorized) {
  error_log("uauth");
  print ($config['key']);
  print "\n";
  print ($config['secret']);
  print "\n";
  print ($cartodb->authorized);

  print 'There is a problem authenticating, check the key and secret.';
  exit();
}

$acti_frm = $_POST['acti_frm'];
$desc_frm = $_POST['desc_frm'];
$direccion_frm = $_POST['direccion_frm'];
$latLong_frm = $_POST['latLong_frm'];
$mailIns_frm =	 $_POST['mailIns_frm'];
$mailRes_frm =	 $_POST['mailRes_frm'];
$nombre_frm = $_POST['nombre_frm'];
$piso_frm =	 $_POST['piso_frm'];
$resp_frm =	 $_POST['resp_frm'];
$sector_frm = $_POST['sector_frm'];
$serv_frm = $_POST['serv_frm'];
$tags_frm =  $_POST['tags_frm'];
$tele_frm = 	$_POST['tele_frm'];
$tipo_frm = $_POST['tipo_frm'];
$web_frm =	 $_POST['web_frm'];


/* Valido Captcha */

if (!empty($_REQUEST['captcha_txt'])) {
    if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha_txt'])) != $_SESSION['captcha']) {
        echo "M";
    }else{
        echo "B";
        //$result = $cartodb->runSql( "INSERT INTO mapa_emprendedor ( nombre ) VALUES ('TEST')",true);
    }
    $request_captcha = htmlspecialchars($_REQUEST['captcha_txt']);
    unset($_SESSION['captcha']);
}




$url = "http://gcba.cartodb.com/api/v2/sql?q=INSERT INTO mapa_emprendedor (nombre) VALUES ('NOMBRESSSSS')&api_key=15ea5821068feecc0584c70d07355848537c2182";
$var = file_get_contents($url);

print_r($var);
?>

