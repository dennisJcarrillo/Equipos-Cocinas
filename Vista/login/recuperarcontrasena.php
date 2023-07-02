<?php
require_once('../../Vista/login/recuperarcontrasena.php');
?>
<!DOCTYPE html>

<html lang="es">
<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link href="http://localhost/EquiposCocinas/Recursos/css/recuperarcontrasena.css" rel="stylesheet" />
    <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/1862/1862358.png">
    <!-- <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"> -->
    <title>Registrarse</title>

</head>
<body class="container">

    <div class="ancho">
        
        <form action="validarNombreUsuario.php" method="post">
            <div class="logo-empresa">
                <img src="../../Recursos/imagenes/LOGO-HD-transparente.jpg" height="180px">
            </div>
            <br>
            <h2 class ="titulo-registro">Recuperar contraseña</h2>
            <div class = "input-container">
            <div class = "form-grupo">

            
              
              <input type="text" class="form-control" id="user" name="userName" id="userName" maxlength="15" placeholder="Nombre de usuario"  >
              <p class="mensaje"></p>


</br>
        <a href = "recuperarporcorreo.php" class = "btn">Enviar por correo</a>     
        <a href = "preguntassecretas.php" class = "btn">Recuperar via pregunta secreta</a>
        <a href = "login.php" class = "btn">Regresar</a>
          
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/2317ff25a4.js" crossorigin="anonymous"></script>
    <script src="../../Recursos/js/validacionesLogin.js"></script>
</body>

</html>