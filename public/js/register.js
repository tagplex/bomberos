$(function () {
    console.log("Funcionando desde /js/register")
    $('#formRegister').validate({
        rules: {
            first_name: {
                required: true,
                minlength: 3
            },
            last_name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                minlength: 8,
                pattern: /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡!#&%/\-_.]){1})\S{8,}$/
            },
            repeatPassword: {
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            first_name: {
                required: "Ingresa un nombre.",
                minlength: "Debe tener al menos 3 caracteres."
            },
            last_name: {
                required: "Ingresa un apellido.",
                minlength: "Debe tener al menos 3 caracteres."
            },
            email: {
                required: "Ingresa tu correo",
                email: "Ingresa un correo valido"
            },
            password: {
                required: "Ingresa una contraseña",
                minlength: "Debe tener al menos 8 caracteres",
                pattern: "Tu contraseña debe ser segura"
            },
            repeatPassword: {
                required: "Ingresa una contraseña",
                equalTo: "Ambas contraseñas deben ser iguales"
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
