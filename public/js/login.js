$(function () {
  console.log("Funcionando desde /js/login")
    $('#formLogin').validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 8,
        }
      },
      messages: {
        email: {
          required: "Ingresa tu correo",
          email: "Ingresa un correo valido"
        },
        password: {
          required: "Ingresa tu contraseña",
          minlength: "Debe tener al menos 8 caracteres"
        }
      },
      errorElement: 'span',
      errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
      },
      highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
      }
    });
  });



  
