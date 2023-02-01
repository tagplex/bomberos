window.addEventListener("load", ()=>{
    console.log("JS funcionando en index")
    let formularioRegistro = document.querySelector("form.register");
    let modalRegistro = document.getElementById("modalRegister")

    formularioRegistro.addEventListener("submit", (e)=>{
        e.preventDefault();
        swal({
            title: "Registro correcto",
            text:"Te registraste correctamente. Da aviso al laboratorio del cesfam para que habilite tu acceso. Si no te habilitan no podrás acceder.",
            button: "Aceptar"});            
    })
})