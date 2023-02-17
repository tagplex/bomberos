const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");


const controllerVehicle = {
    //Metodo que carga la vista de pacientes.
    viewType: (req, res) => {
        let allTypeVehicles = db.Typevehicle.findAll()
        .then((typevehicles) => {
            res.render('vehicles/viewTypes.ejs', {typevehicles : typevehicles})
        })
    }
}

module.exports = controllerVehicle;
