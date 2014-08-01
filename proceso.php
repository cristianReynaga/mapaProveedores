<?php session_start();

require_once 'libs/cartodb.class.php';
require_once 'libs/cartodb.config.php';

$config = getConfig();
$cartodb = new CartoDBClient($config);

if (!$cartodb->authorized) {
  error_log("uauth");
}

$acti_frm = urlencode($_POST['acti_frm']);
$desc_frm = urlencode($_POST['desc_frm']);
$direccion_frm = urlencode($_POST['direccion_frm']);
$latLong_frm = urlencode($_POST['latLong_frm']);
$mailIns_frm =	 urlencode($_POST['mailIns_frm']);
$mailRes_frm =	 urlencode($_POST['mailRes_frm']);
$nombre_frm = urlencode($_POST['nombre_frm']);
$piso_frm =	 urlencode($_POST['piso_frm']);
$resp_frm =	 urlencode($_POST['resp_frm']);
$sector_frm = urlencode($_POST['sector_frm']);
$serv_frm = urlencode($_POST['serv_frm']);
$tags_frm =  urlencode($_POST['tags_frm']);
$tele_frm = 	urlencode($_POST['tele_frm']);
$tipo_frm = urlencode($_POST['tipo_frm']);
$web_frm =	 urlencode($_POST['web_frm']);


/* Valido Captcha */

if (!empty($_REQUEST['captcha_txt'])) {
    if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha_txt'])) != $_SESSION['captcha']) {
        echo "M";
    }else{
        echo "YES";
//        echo "B";
        $SQLQ = "INSERT%20INTO%20mapa_emprendedor%20(nombre)%20VALUES%20('" . $nombre_frm ."')&api_key=15ea5821068feecc0584c70d07355848537c2182";
        $url = "http://gcba.cartodb.com/api/v2/sql?q=" . $SQLQ ;

        print_r($url);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch);   
        $output = json_decode($output);

        if(curl_getinfo($ch, CURLINFO_HTTP_CODE) !== 200) {

          var_dump($output);
        }

        curl_close($ch);

    }
    $request_captcha = htmlspecialchars($_REQUEST['captcha_txt']);
    unset($_SESSION['captcha']);
}

?>

