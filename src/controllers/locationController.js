const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");


const controllerLocation = {
    //Metodo que carga la vista de pacientes.
    viewLocation: (req, res) => {
        let allLocation = db.Location.findAll()
        .then((locations) => {
            res.render('locations/viewLocation.ejs', {locations : locations})
        })
    },
    //Metodo que procesa la busqueda, no requiere validación de ninguna clase
    /* search: (req, res) => {
        let resultSearch1 = req.query.search1;
        let resultSearch2 = req.query.search2;
        let resultSearch3 = req.query.search3;
        let resultSearch4 = req.query.search4;
        let resultFind = db.Patient.findAll({
            where: {
                [Op.or]: [{
                    first_name: {
                        [Op.like]: `%${resultSearch1}%`
                    },
                    last_name: {
                        [Op.like]: `%${resultSearch2}%`
                    },
                    maiden_name: {
                        [Op.like]: `%${resultSearch3}%`
                    },
                    run: {
                        [Op.like]: `%${resultSearch4}%`
                    }
                }]
            },
            limit: 300
        })
            .then((patients) => {
                res.render('patients/viewPatient.ejs', { patients: patients })
            })
            .catch(error => res.send(error))
    }, */
    //Metodo que carga la vista de edición de pacientes, tiene validación para solo cargar pacientes con id correctos
    edit: (req, res) => {
        let patientSeach = db.Patient.findByPk(req.params.id)
            .then(function (patient) {
                if (patient) {
                    res.render('patients/editPatient.ejs', { patient: patient })
                } else {
                    res.render('404.ejs')
                }
            })
            .catch(error => res.send(error))
    },
    //Metodo que procesa la creaciópn de pacientes, cuenta con validación de back y front
    store: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("patients/viewPatient.ejs", {
                errors: resultValidation.mapped(),
                patients: "",
                oldData: req.body
            });
        }

        const newRun = db.Patient.findOne({ where: { run: req.body.run } });
        Promise.all([newRun])
            .then(function (run) {
                db.Patient.create({
                    run: req.body.run,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    maiden_name: req.body.maiden_name
                })
                    .then(() => {
                        res.redirect('/patients/view')
                    })
                    .catch(error => {
                        res.render('patients/viewPatient.ejs', {
                            patients: "",
                            errors: {
                                runexist: {
                                    msg: "Existe un paciente registrado con ese run. Verifica los datos ingresados."
                                },
                            },
                            oldData: req.body
                        })
                    })
            })
    },
    //Metodo que procesa la actualización de pacientes, cuenta con validación de back y front
    update: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            let patientSeach = db.Patient.findByPk(req.params.id)
                .then(function (patient) {
                    if (patient) {
                        res.render('patients/editPatient.ejs', {
                            patient: patient,
                            errors: resultValidation.mapped(),
                            oldData: req.body,
                        })
                    } else {
                        res.render('404.ejs')
                    }
                })
                .catch(error => res.send(error))

        } else {

            let patientSearch = db.Patient.findByPk(req.params.id)
            db.Patient.update({
                run: req.body.run,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                maiden_name: req.body.maiden_name,
            }, {
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    console.log(req.body)
                    res.redirect('/patients/view')
                })
                .catch(error => {
                    if (error.errors[0].path == "run_UNIQUE") {
                        let patientSeach = db.Patient.findByPk(req.params.id)
                            .then(function (patient) {
                                if (patient) {
                                    res.render('patients/editPatient.ejs', {
                                        patient: patient, errors: {
                                            runexist: {
                                                msg: "Existe un paciente registrado con ese run. Verifica los datos ingresados."
                                            },
                                        },
                                        oldData: req.body
                                    })
                                } else {
                                    res.render('404.ejs')
                                }
                            })
                            .catch(error => res.send(error))
                    }
                })
        }
    },
    error: (req, res) => {
        res.redirect('/patients/view')
    }
}

module.exports = controllerLocation;
