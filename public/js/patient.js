$(function () {
    console.log("Funcionando en /js/patient")
    $('#formRegister').validate({
        rules: {
            run: {
                required: true,
                minlength: 11,
                maxlength: 12
            },
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            maiden_name: {
                required: true
            }
        },
        messages: {
            run: {
                required: "Ingresa un rut",
                minlength: "Verifica la cantidad de digitos del run",
                maxlength: "Verifica la cantidad de digitos del run"
            },
            first_name: {
                required: "Ingresa un nombre",
            },
            last_name: {
                required: "Ingresa un apellido",
            },
            maiden_name: {
                required: "Ingresa un apellido",
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
            run: {
                required: true,
                minlength: 11,
                maxlength: 12
            },
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            maiden_name: {
                required: true
            }
        },
        messages: {
            run: {
                required: "Ingresa un rut",
                minlength: "Verifica la cantidad de digitos del run",
                maxlength: "Verifica la cantidad de digitos del run"
            },
            first_name: {
                required: "Ingresa un nombre",
            },
            last_name: {
                required: "Ingresa un apellido",
            },
            maiden_name: {
                required: "Ingresa un apellido",
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
