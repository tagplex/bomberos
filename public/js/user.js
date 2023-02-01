$(function () {
    $('#formRegister').validate({
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
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
            role: {
                required: true
            }
        },
        messages: {
            first_name: {
                required: "Ingresa un nombre",
            },
            last_name: {
                required: "Ingresa un apellido",
            },
            email: {
                required: "Ingresa un correo",
                email: "Ingresa un correo valido",
                pattern: "Tu contraseña debe ser segura"
            },
            password: {
                required: "Ingresa una contraseña",
                minlength: "Debe tener al menos 8 caracteres",
                pattern: "Debe ser una contraseña segura"
            },
            role: {
                required: "Selecciona un rol"
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
    })
    
    $('#formEdit').validate({
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            email: {
                required: true,
                email: true,
            },
            role: {
                required: true
            },
            password: {
                required: true,
                minlength: 8,
                pattern: /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡!#&%/\-_.]){1})\S{8,}$/
            },
            state: {
                required: true
            }
        },
        messages: {
            first_name: {
                required: "Ingresa un nombre",
            },
            last_name: {
                required: "Ingresa un apellido",
            },
            email: {
                required: "Ingresa un correo",
                email: "Ingresa un correo valido"
            },
            role: {
                required: "Selecciona un rol"
            },
            password: {
                required: "Ingresa una contraseña",
                minlength: "Debe tener al menos 8 caracteres",
                pattern: "Tu contraseña debe ser segura"
            },
            state: {
                required: "Debes seleccionar un estado para este usuario"
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

    $('#formProfile').validate({
        rules: {
            first_name: {
                required: true,
                minlength: 3
            },
            last_name: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 8,
                pattern: /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡!#&%/\-_.]){1})\S{8,}$/
            },
            repeatPassword: {
                required: true,
                minlength: 8,
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
            password: {
                required: "Ingresa una contraseña",
                minlength: "Debe tener al menos 8 caracteres",
                pattern: "Tu contraseña debe ser segura"
            },
            repeatpassword  : {
                required: "Ingresa una contraseña",
                equalTo: "Ambas contraseñas deben ser iguales"
            },
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
