<?php session_start();

require_once 'libs/cartodb.class.php';
require_once 'libs/cartodb.config.php';

$config = getConfig();
$cartodb = new CartoDBClient($config);

if (!$cartodb->authorized) {
  error_log("uauth");
}

$api_key = "&api_key=15ea5821068feecc0584c70d07355848537c2182";

$acti_frm = urlencode($_POST['acti_frm']);
$desc_frm = urlencode($_POST['desc_frm']);
$direccion_frm = urlencode($_POST['direccion_frm']);
$latlon_frm = urlencode($_POST['latlon_frm']);
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
$pendiente_revision = "FALSE";
$sector_sigla = urlencode($_POST['sector_sigla_frm']);
$tipo_sigla = urlencode($_POST['tipo_sigla_frm']);
$lat_frm = urlencode($_POST['lat_frm']);
$lon_frm = urlencode($_POST['lon_frm']);



/* Valido Captcha */

if (!empty($_REQUEST['captcha_txt'])) {
    if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha_txt'])) != $_SESSION['captcha']) {
        echo "M";
    }else{
        echo "GRABADO \n";
//        echo "B";



//        COL =  ,mail_institucional,telefono,web,responsable_proyecto,mail_responsable,sector_sigla,tipo_sigla,the_geom
//        INP = $mailIns_frm . $tele_frm . $web_frm . $resp_frm . $mailRes_frm . $sector_sigla . $tipo_sigla . $latlon_frm 

        $columnas_db = "nombre,descripcion,servicios,inicio_de_actividades,tags,pendiente_revision,tipo,sector,calle,piso_dpto,lat,lon";
        $campos_post = $nombre_frm . "','" . $desc_frm . "','" . $serv_frm . "','" . $acti_frm . "','" . $tags_frm . "','" . $pendiente_revision . "','" . $tipo_frm . "','" . $sector_frm . "','" . $direccion_frm . "','" . $piso_frm . "','" . $lat_frm . "','" . $lon_frm;
        $SQLQ = "INSERT%20INTO%20mapa_emprendedor%20(". $columnas_db .")%20VALUES%20('" . $campos_post .  "')" . $api_key;



//        $SQLQ = "INSERT%20INTO%20mapa_emprendedor%20(nombre,descripcion,servicios,inicio_de_actividades,tags,tipo,sector,calle,piso_dpto,lat,lon,mail_institucional,telefono,web,responsable_proyecto,mail_responsable,pendiente_revision,sector_sigla,tipo_sigla,the_geom)%20VALUES%20('" . $nombre_frm . "','" . $desc_frm . "','" . $serv_frm . "','" . $acti_frm . "','" . $tags_frm . "','" . $tipo_frm . "','" . $sector_frm . "','" . $direccion_frm . "','" . $piso_frm . "','" . $lat_frm . "','" . $lon_frm . "','" . $mailIns_frm . "','" . $tele_frm . "','" . $web_frm . "','" . $resp_frm . "','" . $mailRes_frm . "','" . $pendiente_revision . "','" . $sector_sigla . "','" . $tipo_sigla . "','" . $latlon_frm  . "')&api_key=15ea5821068feecc0584c70d07355848537c2182";
        //$SQLQ = "INSERT%20INTO%20mapa_emprendedor%20(nombre,descripcion)%20VALUES%20('" . $nombre_frm . "','". $desc_frm . "')&api_key=15ea5821068feecc0584c70d07355848537c2182";
        $url = "http://gcba.cartodb.com/api/v2/sql?q=" . $SQLQ ;
        print ("\n");
        print ($url);
        print ("\n");

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        $output = curl_exec($ch);   
        //$output = json_decode($output);

        curl_close($ch);

    }
    $request_captcha = htmlspecialchars($_REQUEST['captcha_txt']);
    unset($_SESSION['captcha']);
}


// http://gcba.cartodb.com/api/v2/sql?q=INSERT%20INTO%20mapa_emprendedor%20(nombre,descripcion)%20VALUES%20('asdfasdf+sd,+f+adsf+adsf+adf+adf+adf+adf+a')&api_key=15ea5821068feecc0584c70d07355848537c2182

?>




