const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const fs = require('fs');
const nodemailer = require("nodemailer");

/* 
Sentencia correcta mysql para realizar busqueda
SELECT r.id, p. run, p.first_name, p.last_name, r.date, r.code_result, r.file FROM results AS r JOIN patients AS p ON r.id_patient = p.id;
*/

const controllerResult = {
    //Metodo que carga la vista del formulario de subida de examenes. No requiere validación
    viewUpload: (req, res) => {
        res.render('results/upload.ejs', { patient: "", alert: "" })
    },
    //Metodo que carga la vista del listado y busqueda de resultados. No requiere validación
    viewResult: (req, res) => {
        res.render('results/viewResults.ejs', { results: "", alertdelete: "", sendemail: "", errorsendemail: "", })
    },
    //Metodo que procesa los resultados. No requiere validación de ningun tipo, ya que puede procesar cualquier tipo de caracter
    search: (req, res) => {
        let resultSearch1 = req.query.search1;
        let resultSearch2 = req.query.search2;
        let resultSearch3 = req.query.search3;
        let resultSearch4 = req.query.search4;
        let resultFind = db.Result.findAll({
            where: {
                state: 1
            },
            order: [["date", "DESC"]],
            include: {
                association: 'patient',
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
                }
            },
            limit: 300
        })
            .then((results) => {
                res.render('results/viewResults.ejs', { results: results, alertdelete: "", sendemail: "", errorsendemail: "" })
            })
            .catch(error => res.send(error))
    },
    //Metodo que procesa la busqueda de pacientes para subir el resultado, validación de back realizada (NO POR RUTA)
    upload: (req, res) => {

        let resultSearch = req.query.run;
        const patientResult = db.Patient.findOne({ where: { run: resultSearch } })
            .then(function (patient) {
                if (patient) {
                    res.render('results/upload.ejs', { patient: patient, alert: "" })
                } else {
                    res.render('results/upload.ejs', {
                        patient: "",
                        errors: {
                            run: {
                                msg: "El RUN ingresado no existe en la base de datos. Lo puedes registrar en el boton Agregar. Tambien es posible que no hayas ingresado ningún RUN."
                            },
                        },
                        alert: ""
                    })
                }
            })
            .catch(error => res.send(error))
    },
    //Metodo que procesa la subida de archivos al servidor
    store: (req, res) => {

        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("results/upload.ejs", {
                patient: "",
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let today = new Date();
        let now = today.toLocaleDateString('en-US');
        db.Result.create({
            id_patient: req.body.id_patient,
            date: now,
            file: req.file.filename,
            code_result: req.body.code,
            state: 1,
            id_user: 1
        })
            .then(() => {
                res.render('results/upload.ejs', { patient: "", alert: true })
            })
            .catch(error => {
                console.log(error)
                res.send("Hubo un problema con tu registro");
            })
    },
    //Metodo que carga vista para editar un resultado
    edit: (req, res) => {
        let resultSearch = db.Result.findByPk(req.params.id, {
            include: {
                association: 'patient',
                where: {
                    id: req.params.id_patient
                }
            }
        })
            .then(function (result) {
                if (result) {
                    res.render('results/editResult.ejs', { result: result })
                } else {
                    res.render('404.ejs')
                }
            })
            .catch(error => res.send(error))
    },
    //Metodo que procesa la actualización de un resultado, cuenta con validación de back y front
    update: (req, res) => {

        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            let resultSearch = db.Result.findByPk(req.params.id, {
                include: {
                    association: 'patient',
                    where: {
                        id: req.params.id_patient
                    }
                }
            })
                .then(function (result) {
                    if (result) {
                        res.render('results/editResult.ejs', {
                            result: result,
                            errors: resultValidation.mapped(),
                            oldData: req.body
                        })
                    } else {
                        res.render('404.ejs')
                    }
                })
                .catch(error => res.send(error))
        } else {
            let today = new Date();
            let now = today.toLocaleDateString('en-US');
            let resultSearch = db.Result.findByPk(req.params.id)
                .then(function (result) {
                    db.Result.update({
                        id_patient: resultSearch.id_patient,
                        date: req.body.date != resultSearch.date ? req.body.date : now,
                        file: req.file == undefined ? resultSearch.file : req.file.filename,
                        code_result: req.body.code,
                        state: 1,
                        id_user: 1
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => {
                            res.redirect('/results/view')
                        })
                        .catch(error => res.send(error))
                })
        }
    },
    //Metodo para visualizar el examen y enviarlo por correo
    send: (req, res) => {
        const resultSearch = db.Result.findOne({ where: { id: req.params.id } })
            .then(function (result) {
                if (result) {
                    res.render('results/sendResult.ejs', { result: result })
                } else {
                    res.render('404.ejs')
                }
            })
            .catch(error => res.send(error))
    },
    sendemail: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            const resultSearch = db.Result.findOne({ where: { id: req.body.id } })
                .then(function (result) {
                    if (result) {
                        res.render('results/sendResult.ejs', {
                            result: result,
                            errors: resultValidation.mapped(),
                            oldData: req.body
                        })
                    } else {
                        res.render('404.ejs')
                    }
                })
                .catch(error => res.send(error))
        } else {
            const resultSearch = db.Result.findOne({ where: { id: req.body.id } })
                .then(function (result) {
                    if (fs.existsSync('public/pdf/' + result.file)) {
                        if (result) {
                            let transporter = nodemailer.createTransport({
                                host: "mail.saludquemchi.cl",
                                port: 465,
                                secure: true,
                                auth: {
                                    user: "no-reply@saludquemchi.cl",
                                    pass: "Vizur!17812!"
                                }
                            });
        
                            let mailOption = {
                                from: "no-reply@saludquemchi.cl",
                                to: [req.body.email, req.body.email2],
                                subject: 'Resultados de examenes Cesfam Quemchi',
                                text: 'Hola, resultados de examenes recibidos',
                                html: 'Hola, recibiste correctamente el resultado de examen que solicitaste.<br><br>www.saludquemchi.cl<br><b>Saludos de parte de unidad de Toma de Muestras.<br>Cesfam Quemchi.',
                                attachments: [{
                                      filename: result.code,
                                      path: 'https://saludquemchi.cl/pdf/'+result.file
                                    }]
                            }
        
                            transporter.sendMail(mailOption, (error, info) => {
                                if (error) {
                                    res.send("Error")
                                    res.status(500).send(error.message);
                                } else {
                                    return res.render('results/viewResults.ejs', {
                                        results: "",
                                        errorsendemail: "",
                                        sendemail: true,
                                        alertdelete: ""
                                    })
                                }
                            })
                        } else {
                            //Agregar return con mensaje de error
                            res.send("El correo ingresado no existe en la base de datos")
                        }
                    } else {
                        res.render('results/viewResults.ejs', {
                            results: "",
                            alertdelete: "",
                            sendemail: "",
                            errorsendemail: true,
                        })
                    }
                })
        }
    },
    //Metodo que procesa la eliminación de un resultado
    delete: (req, res) => {
        let resultSearch = db.Result.findByPk(req.params.id)
            .then((result) => {
                fs.unlinkSync('./public/pdf/' + result.file);
                db.Result.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => {
                        res.render('results/viewResults.ejs', { results: "", sendemail: "", alertdelete: true, errorsendemail: "" });
                    })
                    .catch(error => res.send("El resultado que intentas eliminar no existe o ya fue eliminado."))
            })
            .catch(error => res.send("El resultado que intentas eliminar no existe o ya fue eliminado."))
    },
    //Metodo que procesa el error en rutas
    error: (req, res) => {
        res.redirect('/results/view')
    }
}

module.exports = controllerResult;
