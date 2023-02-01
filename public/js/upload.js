$('#formUpload').validate({
    rules: {
        run: {
            required: true,
            minlength: 11,
            maxlength: 12
        }
    },
    messages: {
        run: {
            required: "Debes ingresar un run para realizar la busqueda",
            minlength: "Verifica la cantidad de digitos del run",
            maxlength: "Verifica la cantidad de digitos del run"
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

window.addEventListener("load", function(){
    console.log("JS funcionando desde /js/upload");
    let run = document.getElementById("run")
    let input = document.getElementById("run_disable").value;
    let editButton = document.getElementById("edit_patient");
    let addButton = document.getElementById("add_patient");
    
    
    if(input != ""){
        editButton.disabled = false;
        run.value = input;
    }
})
