<?php
    require_once ("../../../db/Conexion.php");
    require_once ("../../../Modelo/Usuario.php");
    require_once("../../../Controlador/ControladorUsuario.php");

    $nuevoUsuario = new Usuario();
    $nuevoUsuario->nombre = $_POST['nombre'];
    $nuevoUsuario->usuario = $_POST['usuario'];
    $nuevoUsuario->contrasenia = md5($_POST['contrasenia']);
    $nuevoUsuario->correo = $_POST['correo'];
    $nuevoUsuario->idRol = $_POST['idRol'];
    $nuevoUsuario->idEstado = $_POST['idEstado'];

    ControladorUsuario::registroUsuario($nuevoUsuario);

?>