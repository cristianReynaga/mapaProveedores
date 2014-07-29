<?php session_start();
    /* Valido Captcha */
    if (!empty($_REQUEST['captcha'])) {
        if (empty($_SESSION['captcha']) || trim(strtolower($_REQUEST['captcha'])) != $_SESSION['captcha']) {
            $captcha_message = "Código erróneo.";
        }else{
            $captcha_message = "Grabando datos.";
        }
        $request_captcha = htmlspecialchars($_REQUEST['captcha']);
        unset($_SESSION['captcha']);
    }
?>
