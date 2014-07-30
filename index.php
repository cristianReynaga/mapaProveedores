<?php session_start();?>
<!DOCTYPE HTML>
<html lang="es">
<head>    
    <title>Mapa Emprendedor - Buenos Aires Ciudad</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="Mapa Emprendedor de la Ciudad Autónoma de Buenos Aires." />
    <meta name="keywords" content="mapa, buenos aires, emprendedores, ciudad de buenos aires" />
    <!--[if lt IE 9]>
        <script src="js/html5shiv.js"></script>
    <![endif]-->
    <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/base.css">
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/themes/css/cartodb.css" />
    <script src="http://libs.cartocdn.com/cartodb.js/v3/cartodb.js"></script>
    <!--[if lte IE 8]>
        <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v2/themes/css/cartodb.ie.css" />
    <![endif]-->
    <link rel="icon" href="favicon.ico"/>
</head>

<body>
    <!-- Main -->
    <div id="contenidos">
        <div id="mapa"></div>

        <div id="sidebar"> 
            <div id="menuSidebar">
                <div class="btn-group btn-group-justified"  id="menuSidebar">
                    <div class="btn-group">
                        <button type="button" class="btn btn-default activo" value="inicio">Inicio</button>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" value="filtrar">Filtrar</button>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" value="crear">Crear</button>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" value="acerca">Acerca</button>
                    </div>
                </div>
            </div>

            <div id="logo">
                <span class="fino">Mapa </span> <span class="grueso">Emprendedor</span>
            </div>
        
            <div id="panel">
               
                <div id="paneles">

                    <div id="inicio">
                        <h5>por nombre, descripción o tag</h5>
                        <div class="input-group">
                            <span class="input-group-addon glyphicon glyphicon-search"></span>
                            <input type="text" class="form-control" placeholder="Buscar..." id="busquedaEmprendedores">
                        </div>

                        <div id="listado">
                            <ul class="nav nav-pills nav-stacked" id="resultados"></ul>
                        </div>

                    </div>

                    <div id="filtrar"> <!-- bind en init -->
                        <div class="btn-group">
                            <div id="industria_ftr">
                                <span> Por tipo de industria </span>
                                <button type="button" value="TIN" id="todosIndustria_btn" class="btn btn-default activo">Ver Todos</button>
                                <button type="button" value="ACE" class="btn btn-default">Aceleradora</button>
                                <button type="button" value="EMP" class="btn btn-default">Emprendimiento</button>
                                <button type="button" value="ESP" class="btn btn-default">Espacio de Coworking</button>
                                <button type="button" value="FON" class="btn btn-default">Fondo de Inversión</button>
                                <button type="button" value="GOB" class="btn btn-default">Gobierno Nacional</button>
                                <button type="button" value="INC" class="btn btn-default">Incubadora</button>
                                <button type="button" value="INV" class="btn btn-default">Inversor</button>
                                <button type="button" value="MAR" class="btn btn-default">Makerspace</button>
                                <button type="button" value="ORG" class="btn btn-default">Organización</button>
                                <button type="button" value="UNI" class="btn btn-default">Universidad</button>
                            </div>
                            <div id="sector_ftr">
                                <span> Por sector </span>
                                <button type="button" value="TSEC" id="todosSector_btn" class="btn btn-default activo">Ver Todos</button>
                                <button type="button" value="INDU" class="btn btn-default">Productos Industriales</button>
                                <button type="button" value="SERV" class="btn btn-default">Servicios</button>
                                <button type="button" value="BIOT" class="btn btn-default">Biotecnología</button>
                                <button type="button" value="SOFT" class="btn btn-default">Desarrollo de Software</button>
                                <button type="button" value="ECOM" class="btn btn-default">E-commerce</button>
                                <button type="button" value="DISE" class="btn btn-default">Diseño</button>
                                <button type="button" value="VIDE" class="btn btn-default">Desarrollo de Video Juegos</button>
                                <button type="button" value="INFO" class="btn btn-default">Tecnología de la Información</button>
                                <button type="button" value="CONS" class="btn btn-default">Consultoría</button>
                                <button type="button" value="EDUC" class="btn btn-default">Educación</button>
                                <button type="button" value="TURI" class="btn btn-default">Turismo</button>
                                <button type="button" value="SALU" class="btn btn-default">Salud</button>
                                <button type="button" value="CULT" class="btn btn-default">Cultura</button>
                                <button type="button" value="GOBI" class="btn btn-default">Gobierno</button>
                                <button type="button" value="OTRO" class="btn btn-default">Otro</button>
                            </div>
                        </div>
                    </div>

                    <div id="crear">
                            <form id="alta_frm"  method="POST" action="">

                                <div id="paso1" class="pasoActivo">  <!-- Paso 1 - Información Básica -->
                                    <div class="form-group">
                                        <label for="nombre_frm">Nombre</label>
                                        <input type="text" name="nombre_frm" id="nombre_frm" class="form-control" placeholder="Nombre del emprendimiento" >
                                    </div>

                                    <div class="form-group">
                                        <label for="desc_frm">Descripción</label>
                                        <textarea class="form-control" rows="3" id="desc_frm" name="desc_frm"> </textarea>
                                    </div>

                                    <div class="form-group">
                                        <label for="resp_frm">Servicios</label>
                                        <input type="text" id="serv_frm" name="serv_frm" class="form-control" placeholder="Sevicios" >
                                    </div>

                                    <div class="form-group">
                                        <label for="acti_frm">Inicio de actividades</label>
                                        <input type="text" id="acti_frm" name="acti_frm" class="form-control" placeholder="Año de inicio" >
                                    </div>

                                    <div class="form-group">
                                        <label for="tags_frm">Tags</label>
                                        <input type="text" id="tags_frm" name="tags_frm" class="form-control" placeholder="Tags separados por coma" >
                                    </div>

                                    <div class="form-group">
                                        <label for="tipo_frm">Tipo</label>
                                        <select class="form-control" id="tipo_frm" name="tipo_frm">
                                            <option value="Seleccione" selected>Seleccione el tipo</option>
                                            <option value="Aceleradora">Aceleradora</option>
                                            <option value="Emprendimiento">Emprendimiento</option>
                                            <option value="Espacio de Coworking">Espacio de Coworking</option>
                                            <option value="Fondo de Inversión">Fondo de Inversión</option>
                                            <option value="Gobierno Nacional">Gobierno Nacional</option>
                                            <option value="Incubadora">Incubadora</option>
                                            <option value="Inversor">Inversor</option>
                                            <option value="Makerspace">Makerspace</option>
                                            <option value="Organización">Organización</option>
                                            <option value="Universidad">Universidad</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="sector_frm">Sector</label>
                                        <select class="form-control" id="sector_frm" name="sector_frm">
                                            <option value="Seleccione" selected>Seleccione su sector</option>
                                            <option value="INDU">Productos Industriales</option>
                                            <option value="SERV">Servicios</option>
                                            <option value="BIOT">Biotecnología</option>
                                            <option value="SOFT">Desarrollo de Software</option>
                                            <option value="ECOM">E-commerce</option>
                                            <option value="DISE">Diseño</option>
                                            <option value="VIDE">Desarrollo de Video Juegos</option>
                                            <option value="INFO">Tecnología de la Información</option>
                                            <option value="CONS">Consultoría</option>
                                            <option value="EDUC">Educación</option>
                                            <option value="TURI">Turismo</option>
                                            <option value="SALU">Salud</option>
                                            <option value="CULT">Cultura</option>
                                            <option value="GOBI">Gobierno</option>
                                            <option value="OTRO">Otro</option>
                                        </select>
                                    </div>

                                    <div class="btn btn-default siguiente" onclick="validoPaso(1)"> Siguiente </div>

                                    <span class="aviso paso1"> Por favor complete <b>todos</b> los campos </span>

                                </div>

                                <div id="paso2" class="pasoNoActivo"><!-- Paso 2 - Ubicacion -->
                                    <div class="form-group">
                                        <label for="direccion_frm">Dirección</label>
                                        <input type="text" id="direccion_frm" class="form-control" placeholder="Calle y altura o esquina">
                                        <div class="btn btn-danger validar" onclick="buscarDireccion()"> Validar la dirección </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="piso_frm">Piso y departamento</label>
                                        <input type="text" id="piso_frm" class="form-control" placeholder="Piso y departamento">
                                        <input type="text" id="latLong_frm" hidden value="">
                                    </div>

                                    <div class="form-group">
                                        <p class="cartelMinimapa"> Aquí se verá ubicado su emprendimiento</p>
                                        <div class="minimapa" id="minimapa"> </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="btn btn-default anterior" onclick="siguienteFormulario('#paso1','#paso2')"> Anterior </div>
                                        <div class="btn btn-default siguiente" onclick="validoPaso(2)"> Siguiente </div>
                                    </div>

                                    <span class="aviso paso2"> Por favor valide la dirección del emprendimiento </span>

                                </div>

                                
                                <div id="paso3" class="pasoNoActivo"> <!-- Paso 3 - Datos de contacto -->
                                    <div class="form-group">
                                        <label for="mailIns_frm">Mail institucional</label>
                                        <input type="email" class="form-control" id="mailIns_frm" placeholder="E-mail">
                                    </div>

                                    <div class="form-group">
                                        <label for="tele_frm">Teléfono</label>
                                        <input type="tel" id="tele_frm" class="form-control" placeholder="Telefonos">
                                    </div>

                                    <div class="form-group">
                                        <label for="web_frm">Página web</label>
                                        <input type="url" id="web_frm" class="form-control" placeholder="http://">
                                    </div>

                                    <div class="form-group">
                                        <label for="resp_frm">Responsable del proyecto</label>
                                        <input type="text" id="resp_frm" class="form-control" placeholder="Nombre del responsable">
                                    </div>

                                    <div class="form-group">
                                        <label for="mailRes_frm">Mail del responsable</label>
                                        <input type="email" class="form-control" id="mailRes_frm" placeholder="E-mail del responsable">
                                    </div>

                                    <div class="form-group">


                                    </div>

                                    <div class="btn btn-default anterior" onclick="siguienteFormulario('#paso2','#paso3')"> Anterior </div>

                                    <div class="btn btn-default siguiente" onclick="validoPaso(3)"> Siguiente </div>

                                    <span class="aviso paso3"> Por favor verifique los campos completados sean correctos y vuelva a intentar </span>

                                </div>

                                <div id="paso4" class="pasoNoActivo"><!-- Paso 4 - CAPTCHA -->

                                    <div class="form-group">
                                        <h3>Solo un paso mas.</h3>

                                        <p>Complete en el siguente campo la palabra que se muestra debajo.</p>

                                        <img src="captcha.php" id="captcha" />

                                        <br> <a href="#" onclick="javascript:nuevoCaptcha()" id="change-image">Recargar imagen.</a>

                                        <input type="text" name="captcha" id="captcha_txt" class="form-control" autocomplete="off">

                                        <p>Al decidir formar parte del mapa del ecosistema emprendedor de la C.A.B.A., presto consentimiento a la publicación de los datos de mi emprendimiento en dicho mapa.</p>

                                        <input type="button" onclick="javascript:finalizacion();" class="btn btn-success" value="Enviar datos">

                                        <span class="aviso paso4"> Por favor verifique los campos completados sean correctos y vuelva a intentar </span>

                                    </div>
                                </div>

                                <div id="paso5" class="pasoNoActivo"><!-- Paso 5 - Gracias y cerrar -->

                                    <div class="form-group">
                                        <h3>GRACIAS.</h3>

                                        <p>Los datos serán validados y aparecerán en el mapa a la brevedad</p>

                                        <input type="button" onclick="javascript:volverAlta();" class="btn btn-success" value="Cerrar">

                                    </div>



                                </div>



                            </form>
                    </div>

                    <div id="acerca">
                        <h1>Mapa Emprendedor de la Ciudad Autónoma de Buenos Aires<h1>
                        <p>En la Ciudad estamos desarrollando el Mapa Emprendedor, una plataforma virtual que agrupa a todos los actores que forman parte del ecosistema. </p>
                        <p>Con esta herramienta nos proponemos fomentar el intercambio y las relaciones entre la comunidad, así como mostrar el alto potencial y desarrollo que está teniendo la actividad emprendedora en Buenos Aires.</p>
                        <p>El Mapa va a estar integrado por las instituciones, organizaciones, empresas, espacios de trabajo colaborativo, aceleradoras, incubadoras e inversores que conforman el ecosistema. En una segunda instancia, incluiremos toda la oferta de la actividad emprendedores de la Ciudad (eventos, capacitaciones, programas, etc.)</p>
                        <p>Te invitamos a ser parte de esta iniciativa que co-creamos con todos los emprendedores porteños.</p>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <script type="text/javascript" src="js/acciones.js"></script>
    <script type="text/javascript" src="js/init.js"></script>
    <script type="text/javascript" src="js/validaciones.js"></script>

    <script type="infowindow/html" id="client_infowindow_template">
      <div class="cartodb-popup emprendedores">
        <a href="#close" class="cartodb-popup-close-button close">x</a>
        <div class="cartodb-popup-content-wrapper">
          <div class="cartodb-popup-content">

            <div class="row">
              <div class="label">
                <label>Nombre</label>
              </div>
              <div class="info">
                <p>{{nombre}}</p>
              </div>
            </div>

            <h4>calle</h4>
            <p>{{calle}}</p>
            {{#piso_dpto}}
              <h4>piso_dpto</h4>
              <p>{{piso_dpto}}</p>
            {{/piso_dpto}}
            {{#telefono}}
              <h4>telefono</h4>
              <p>{{telefono}}</p>
            {{/telefono}}
            <p>{{tipo}}</p>
            <p>{{descripcion}}</p>
            <h4>localidad</h4>
            <p>{{localidad}}</p>
            <h4>servicios</h4>
            <p>{{servicios}}</p>
            <h4>tags</h4>
            <p>{{tags}}</p>
          </div>
        </div>
        <div class="cartodb-popup-tip-container"></div>
      </div>
    </script>

    

</body>
</html>