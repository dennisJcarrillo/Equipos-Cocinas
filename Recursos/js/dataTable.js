let tablaUsuarios = '';
$(document).ready(function () {
  tablaUsuarios = $('#table-Usuarios').DataTable({
    "ajax": {
      "url": "../../../Vista/crud/usuario/obtenerUsuarios.php",
      "dataSrc": ""
    },
    "columns": [
      { "data": "IdUsuario"},
      { "data": "usuario" },
      { "data": "nombreUsuario" },
      { "data": "contrasenia" },
      { "data": "correo" },
      { "data": "Estado" },
      { "data": "Rol" },
      {
        "defaultContent":
          '<div><button class="btns btn" id="btn_ver"><i class="fa-solid fa-eye"></i></button>' +
          '<button class="btns btn" id="btn_editar"><i class="fa-solid fa-pen-to-square"></i></button>' +
          '<button class="btns btn" id="btn_eliminar"><i class="fa-solid fa-trash"></i></button></div>'
      }
    ]
  });

});

$('#btn_nuevoRegistro').click(function () {
  //Petición para obtener roles
  obtenerRoles('#rol');
  //Petición para obtener estado de usuario
  obtenerEstadoUsuario('#estado');
  $(".modal-header").css("background-color", "#007bff");
  $(".modal-header").css("color", "white");	 
});
//Crear nuevo usuario
$('#form-usuario').submit(function (e) {
  e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
     //Obtener datos del nuevo Usuario
     let nombre = $('#nombre').val();
     let usuario = $('#usuario').val();
     let password = $('#password').val();
     let correo = $('#correo').val();
     let rol = document.getElementById('rol').value;
     let estado = document.getElementById('estado').value;
     $.ajax({
       url: "../../../Vista/crud/usuario/nuevoUsuario.php",
       type: "POST",
       datatype: "JSON",
       data: {
         nombre: nombre,
         usuario: usuario,
         contrasenia: password,
         correo: correo,
         idRol: rol,
         idEstado: estado
       },
       success: function () {
         tablaUsuarios.ajax.reload(null, false);
       }
     });
    $('#modalNuevoUsuario').modal('hide');
  //Mostrar mensaje de exito
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Registrado!',
    showConfirmButton: false,
    timer: 2000
  })
});
//Eliminar usuario
$(document).on("click", "#btn_eliminar", function() {
  fila = $(this);        
    let usuario = $(this).closest('tr').find('td:eq(1)').text();		    
    Swal.fire({
      title: 'Estas seguro de eliminar a '+usuario+'?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {      
        $.ajax({
          url: "../../../Vista/crud/usuario/eliminarUsuario.php",
          type: "POST",
          datatype:"json",    
          data:  { usuario: usuario},    
          success: function() {
              tablaUsuarios.row(fila.parents('tr')).remove().draw();                  
           }
          }); //Fin del AJAX
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        )
      }
    });                
});

$(document).on("click", "#btn_editar", function(){		        
  fila = $(this).closest("tr");	        
  let idUsuario = $(this).closest('tr').find('td:eq(0)').text(), //capturo el ID		            
  nombre = fila.find('td:eq(2)').text(),
  usuario = fila.find('td:eq(1)').text(),
  contrasenia = fila.find('td:eq(3)').text(),
  correo = fila.find('td:eq(4)').text(),
  estado = fila.find('td:eq(5)').text(),
  rol = fila.find('td:eq(6)').text();
  $("#E_IdUsuario").val(idUsuario);
  $("#E_nombre").val(nombre);
  $("#E_usuario").val(usuario);
  $("#E_password").val(contrasenia);
  $("#E_correo").val(correo);
  $("#E_estado").val(obtenerEstadoUsuario('#E_estado'));
  $("#E_rol").val(obtenerRoles('#E_rol'));
  $(".modal-header").css("background-color", "#007bff");
  $(".modal-header").css("color", "white");	
  $('#modalEditarUsuario').modal('show');		   
});

$('#form-Edit-Usuario').submit(function (e) {
  e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
   //Obtener datos del nuevo Usuario
   let nombre = $('#E_nombre').val(),
   idUser =  $('#E_IdUsuario').val(),
   usuario = $('#E_usuario').val(),
   password = $('#E_password').val(),
   correo = $('#E_correo').val(),
   rol = document.getElementById('E_rol').value,
   estado = document.getElementById('E_estado').value;
   $.ajax({
     url: "../../../Vista/crud/usuario/editarUsuario.php",
     type: "POST",
     datatype: "JSON",
     data: {
      idUsuario: idUser,
      nombre: nombre,
      usuario: usuario,
      contrasenia: password,
      correo: correo,
      idRol: rol,
      idEstado: estado
     },
     success: function () {
        tablaUsuarios.ajax.reload(null, false);
     }
   });
  $('#modalEditarUsuario').modal('hide');
  //Mostrar mensaje de exito
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Actualizado!',
    showConfirmButton: false,
    timer: 2000
  });
});

let obtenerRoles = function (idElemento) {
  //Petición para obtener roles
  $.ajax({
    url: '../../../Vista/crud/usuario/obtenerRoles.php',
    type: 'GET',
    dataType: 'JSON',
    success: function (data) {
      let valores = '<option value="">Seleccionar...</option>';
      //Recorremos el arreglo de roles que nos devuelve la peticion
      for (i = 0; i < data.length; i++) {
        valores += '<option value="' + data[i].id_Rol + '">' + data[i].rol + '</option>';
        $(idElemento).html(valores);
      }
    }
    });
}
let obtenerEstadoUsuario = function (idElemento){
    //Petición para obtener estado de usuario
    $.ajax({
      url: '../../../Vista/crud/usuario/obtenerEstadosUsuario.php',
      type: 'GET',
      dataType: 'JSON',
      success: function (data) {
        let valores = '<option value="">Seleccionar...</option>';
        //Recorremos el arreglo de roles que nos devuelve la peticion
        for (i = 0; i < data.length; i++) {
          valores += '<option value="' + data[i].id_Estado_Usuario + '">' + data[i].descripcion + '</option>';
          $(idElemento).html(valores);
        }
      }
    });
}
 
// EMARTINEZ	Estefani Martinez	Unah@123	daniela.martinez@unah.hn	Bloqueado	Predeterminado
// JASPER	Jasper Reyes	Unah@123	jasper.reyes@unah.hn	Bloqueado	Tecnico
// ANDREA	Andrea Garrido	Unah@432	andreag2020@unah.hn	Nuevo	Predeterminado
