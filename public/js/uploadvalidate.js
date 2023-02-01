$(function () {
    $('#uploadResults').validate({
        rules: {
            file: {
                required: true,
                extension: "pdf|xps"
            },
            code: {
                required: true,
                minlength: 4,
            }
        },
        messages: {
            file: {
                required: "Debes subir un archivo",
                extension: "Solo puedes subir archivos pdf o xps"
            },
            code: {
                required: "Debes ingresar un codigo",
                minlength: "El codigo debe ser de a lo menos 4 digitos"
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

    $('#editPatient').validate({
        rules: {
            run: {
                required: true,
                minlength: 11,
                maxlength: 12
            }, 
            first_name: {
                required: true,
                minlength: 3,
            },
            last_name: {
                required: true,
                minlength: 3,
            },
            maiden_name: {
                required: true,
                minlength: 3,
            },
        },
        messages: {
            run: {
                required: "Debes ingresar un run",
                minlength: "Verifica la cantaidad de digitos del run",
                maxlength: "Verifica la cantidad de digitos del run"
            }, 
            first_name: {
                required: "Debes ingresar un nombre",
                minlength: "Debe tener al menos tres caracteres"
            },
            last_name: {
                required: "Debes ingresar un primer apelliddo",
                minlength: "Debe tener al menos tres caracteres"
            },
            maiden_name: {
                required: "Debes ingresar un segundo apellido",
                minlength: "Debe tener al menos tres caracteres"
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

    $('#createPatient').validate({
        rules: {
            run: {
                required: true,
                minlength: 11,
                maxlength: 12
            }, 
            first_name: {
                required: true,
                minlength: 3,
            },
            last_name: {
                required: true,
                minlength: 3,
            },
            maiden_name: {
                required: true,
                minlength: 3,
            },
        },
        messages: {
            run: {
                required: "Debes ingresar un run",
                minlength: "Verifica la cantidad de digitos del run",
                maxlength: "Verifica la cantidad de digitos del run"
            }, 
            first_name: {
                required: "Debes ingresar un nombre",
                minlength: "Debe tener al menos tres caracteres"
            },
            last_name: {
                required: "Debes ingresar un primer apelliddo",
                minlength: "Debe tener al menos tres caracteres"
            },
            maiden_name: {
                required: "Debes ingresar un segundo apellido",
                minlength: "Debe tener al menos tres caracteres"
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
    $('#editResult').validate({
        rules: {
            run: {
                required: true,
                minlength: 11,
                maxlength: 12
            }, 
            first_name: {
                required: true,
                minlength: 3,
            },
            last_name: {
                required: true,
                minlength: 3,
            },
            date: {
                required: true,
            },
            code: {
                required: true,
                minlength: 4,
            }
        },
        messages: {
            run: {
                required: "Debes ingresar un run",
                minlength: "Verifica la cantidad de digitos del run",
                maxlength: "Verifica la cantidad de digitos del run"
            }, 
            first_name: {
                required: "Debes ingresar un nombre",
                minlength: "Debe tener al menos tres caracteres"
            },
            last_name: {
                required: "Debes ingresar un primer apelliddo",
                minlength: "Debe tener al menos tres caracteres"
            },
            date: {
                required: "Debes ingresar una fecha",
            },
            code: {
                required: "Debes ingresar un codigo",
                minlength: "El codigo debe ser de a lo menos 4 digitos"
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
    $('#sendResult').validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            email2: {
                email: true
            }
        },
        messages: {
            email: {
                required: "Debes ingresar un correo",
                email: "Ingresa un correo valido",
            }, 
            email2: {
                email: "Ingresa un correo valido"
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
})