<?php session_start();

$nombre = $_POST['nombre_frm'];
$captcha_txt = $_POST['captcha_txt'];

$captcha_message = "";

/* Valido Captcha */
echo "valido";

if (!empty($_REQUEST['captcha_txt'])) {
    if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha_txt'])) != $_SESSION['captcha']) {
        $captcha_message = "Código erróneo.";
    }else{
        //aca va la posta!!
        $captcha_message = "Grabando datos.";
        
        //$result = $cartodb->runSql("SELECT * FROM mapa_emprendedor WHERE tipo = 'Aceleradora'",true);
    }
    $request_captcha = htmlspecialchars($_REQUEST['captcha']);
    unset($_SESSION['captcha']);
}

echo $captcha_message;
echo $captcha_txt;

?>