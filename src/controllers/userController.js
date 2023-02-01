const db = require("../database/models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const controllerUser = {
    //Metodo que procesa el listado de usuarios
    viewUser: (req, res) => {
        let usersActive = db.User.count({ where: { state: 1 } });
        let usersNotActive = db.User.count({ where: { state: 0 } });
        Promise.all([usersActive, usersNotActive])
            .then(function ([usersactive, usersnotactive]) {
                res.render('users/viewUser.ejs', { users: "", usersactive: usersactive, usersnotactive: usersnotactive })
            })
    },
    //Metodo que busca según parametros un usuario
    search: (req, res) => {
        let usersActive = db.User.count({ where: { state: 1 } });
        let usersNotActive = db.User.count({ where: { state: 0 } });
        let resultSearch1 = req.query.search1;
        let resultSearch2 = req.query.search2;
        let resultSearch3 = req.query.search3;
        let resultFind = db.User.findAll({
            where: {
                [Op.or]: [{
                    first_name: {
                        [Op.like]: `%${resultSearch1}%`
                    },
                    last_name: {
                        [Op.like]: `%${resultSearch2}%`
                    },
                    email: {
                        [Op.like]: `%${resultSearch3}%`
                    }
                }]
            },
            limit: 300
        })
        Promise.all([resultFind,usersActive, usersNotActive])
            .then(([users, usersactive, usersnotactive]) => {
                res.render('users/viewUser.ejs', { users: users, usersactive: usersactive, usersnotactive: usersnotactive })
            })
            .catch(error => res.send(error))
    },
    //Metodo que lista los pacientes que no estan habilitados"
    searchNotActive: (req, res) => {
        let usersActive = db.User.count({ where: { state: 1 } });
        let usersNotActive = db.User.count({ where: { state: 0 } });
        let resultFind = db.User.findAll({
            where: {
                state: 0
            }
        })
        Promise.all([resultFind,usersActive, usersNotActive])
            .then(([users, usersactive, usersnotactive]) => {
                res.render('users/viewUser.ejs', { users: users, usersactive: usersactive, usersnotactive: usersnotactive })
            })
            .catch(error => res.send(error))
    },
    //Metodo que procesa la vista de login
    login: (req, res) => {
        res.render('users/login.ejs')
    },
    //Metodo que procesa el registro de usuarios con validacion back y frond
    loginProcess: (req, res) => {

        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            console.log(resultValidation.errors)
            return res.render("users/login.ejs", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        let captcha = req.body["mtcaptcha-verifiedtoken"]
        let siteKey = captcha.substr(21, 18)

        let userToLogin = db.User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user) {
                    let password = bcrypt.compareSync(req.body.password, user.password);
                    if (password && user.state == 1 && siteKey === "MTPublic-3xPYgoH6T") {
                        req.session.userLogged = user;
                        if (req.body.remember) {
                            res.cookie('email', req.body.email, { maxAge: (9999 * 99) * 10 })
                        }
                        return res.redirect("/home")
                    } else if (user.state == 0) {
                        return res.render("users/login.ejs", {
                            errors: {
                                usernotactive: {
                                    msg: "Usuario no esta activo"
                                }
                            },
                            oldData: req.body
                        })
                    }
                }
                return res.render("users/login.ejs", {
                    errors: {
                        emailpass: {
                            msg: "Datos de usuario incorrectos."
                        }
                    },
                    oldData: req.body
                })
            })
            .catch(error => res.send(error))
    },
    //Metodo para cargar vista de registro de usuarios nuevos
    register: (req, res) => {
        res.render('users/register.ejs')
    },
    //Metodo que procesa el registro de usuarios al ingresar a la web con validacion back y frond
    store: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("users/register.ejs", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let captcha = req.body["mtcaptcha-verifiedtoken"]
        let siteKey = captcha.substr(21, 18)

        const newEmail = db.User.findOne({ where: { email: req.body.email } });
        if (siteKey === "MTPublic-3xPYgoH6T") {
            Promise.all([newEmail])
                .then(function (email) {
                    db.User.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        id_rol: req.body.role == undefined ? 2 : req.body.role,
                        state: 0
                    })
                        .then((email) => {
                            res.render("users/login.ejs", {
                                errors: {
                                    userCreate: {
                                        msg: "Cuenta registrada correctamente. Recuerda que tu cuenta debe ser habilitada por el administrador."
                                    }
                                }
                            })
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
                                to: 'estadisticas.quemchi@gmail.com',
                                subject: 'Nueva usuario registrado',
                                text: 'Hola se acaba de registrar un nuevo usuario',
                                html: '<b>Hola <strong>Administrador</strong><b>. Se creo la cuenta del usuario ' + email.first_name + ' ' + email.last_name + ', con el correo ' + email.email + '<br><br>www.saludquemchi.cl<br><b>Saludos de parte de unidad de Toma de Muestras.<br>Cesfam Quemchi.'
                            }

                            transporter.sendMail(mailOption, (error, info) => {
                                if (error) {
                                    res.status(500).send(error.message);
                                } else {
                                    console.log("Correo enviado")
                                    return res.redirect('/users/login')
                                }
                            })
                        })
                        .catch(error => {
                            if (error.errors[0].path == "email_UNIQUE") {
                                return res.render("users/register.ejs", {
                                    errors: {
                                        emailexist: {
                                            msg: "Existe una cuenta con ese correo, intenta con otro correo o recupera tu cuenta."
                                        },
                                    },
                                    oldData: req.body
                                })
                            }
                        })
                })
        } else {
            res.render('users/register.ejs')
        }
    },
    //Metodo para cargar vista de registro de usuarios desde el panel de administrador
    registerUser: (req, res) => {
        let allRole = db.Role.findAll();
        let states = ['Deshabilitado', 'Habilitado']; // Arreglo con estados 
        Promise.all([allRole, states])
            .then(function ([roles, state]) {
                res.render('users/createUser.ejs', { roles: roles, state: state })
            })
            .catch(error => res.send(error))
    },
    //Metodo que procesa el registro de usuarios desde el panel de administrador
    storeUser: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            let allRole = db.Role.findAll();
            let states = ['Deshabilitado', 'Habilitado']; // Arreglo con estados 
            Promise.all([allRole, states])
                .then(function ([roles, state]) {
                    return res.render('users/createUser.ejs', {
                        roles: roles, state: state, errors: resultValidation.mapped(),
                        oldData: req.body,
                        alert: true
                    })
                })

        } else {

            const newEmail = db.User.findOne({ where: { email: req.body.email } });
            Promise.all([newEmail])
                .then(function (email) {
                    db.User.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        id_rol: req.body.role == undefined ? 2 : req.body.role,
                        state: 1
                    })
                        .then(() => {
                            res.redirect('/users/view')
                        })
                        .catch(error => {
                            if (error.errors[0].path == "email_UNIQUE") {
                                let allRole = db.Role.findAll();
                                let states = ['Deshabilitado', 'Habilitado']; // Arreglo con estados 
                                Promise.all([allRole, states])
                                    .then(function ([roles, state]) {
                                        res.render('users/createUser.ejs', {
                                            roles: roles, state: state, errors: resultValidation.mapped(),
                                            oldData: req.body,
                                            errores: {
                                                duplicado: {
                                                    msg: "Existe una cuenta con ese correo, intenta con otro correo"
                                                }
                                            }
                                        })
                                    })
                                    .catch(error => res.send(error))
                            }
                        })
                })
        }
    },
    //Metodo que cargar el listado de usuario y roles para la creación de nuevos usuarios
    /* list: (req, res) => {
        let allUser = db.User.findAll({
            order: [["id", "DESC"]],
            limit: 30
        });
        let allRole = db.Role.findAll();
        Promise.all([allUser, allRole])
            .then(function ([user, role]) {
                res.render('users/viewUser.ejs', { users: user, roles: role })
            })
    }, */
    //Metodo para cargar vista de edición (Ver alternativa para cargar valores al modal)
    edit: (req, res) => {
        let allRole = db.Role.findAll();
        let userSearch = db.User.findByPk(req.params.id)
        let states = ['Deshabilitado', 'Habilitado']; // Arreglo con estados 
        Promise.all([userSearch, allRole, states])
            .then(function ([user, role, state]) {
                if (user) {
                    res.render('users/editUser', { user: user, role: role, state: state })
                } else {
                    res.render('404.ejs')
                }
            })
            .catch(error => res.send(error))
    },
    //Metodo para actualizar usuario
    update: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            let allRole = db.Role.findAll();
            let userSearch = db.User.findByPk(req.params.id)
            let states = ['Deshabilitado', 'Habilitado']; // Arreglo con estados 
            Promise.all([userSearch, allRole, states])
                .then(function ([user, role, state]) {
                    if (user) {
                        return res.render('users/editUser', {
                            user: user, role: role, state: state, errors: resultValidation.mapped(),
                            oldData: req.body
                        })
                    } else {
                        res.render('404.ejs')
                    }
                })
                .catch(error => res.send(error))

        } else {

            let userSearch = db.User.findByPk(req.params.id)
            Promise.all([userSearch])
                .then(function (user) {
                    db.User.update({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password.substr(0, 6) == "$2a$10" ? userSearch.password : bcrypt.hashSync(req.body.password, 10),
                        id_rol: req.body.role == undefined ? 2 : req.body.role,
                        state: req.body.state
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then((user) => {
                            res.redirect('/users/view')
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
                                to: req.body.email,
                                subject: 'Perfil Habilitado',
                                text: 'Hola se acaba de habilitar su perfil',
                                html: '<b>Hola, ' + req.body.first_name + ' ' + req.body.last_name + '.</b><br><br>Su perfil fue habilitado y/o modificado por el administrador.<br><br>www.saludquemchi.cl<br><b>Saludos de parte de unidad de Toma de Muestras.<br>Cesfam Quemchi.'

                            }

                            transporter.sendMail(mailOption, (error, info) => {
                                if (error) {
                                    res.status(500).send(error.message);
                                } else {
                                    console.log("Correo enviado")
                                    return res.redirect('/users/login')
                                }
                            })
                        })
                        .catch(error => {
                            if (error.errors[0].path == "email_UNIQUE") {
                                let allRole = db.Role.findAll();
                                let userSearch = db.User.findByPk(req.params.id)
                                let states = ['Deshabilitado', 'Habilitado']; // Arreglo con estados 
                                Promise.all([userSearch, allRole, states])
                                    .then(function ([user, role, state]) {
                                        if (user) {
                                            res.render('users/editUser', {
                                                user: user, role: role, state: state, errors: {
                                                    duplicado: {
                                                        msg: "Existe una cuenta con ese correo, intenta con otro correo"
                                                    },
                                                    oldData: req.body
                                                }
                                            })
                                        } else {
                                            res.render('404.ejs')
                                        }
                                    })
                                    .catch(error => res.send(error))
                            }
                        })
                })
        }
    },
    //Metodo para cargar vista de actualización de datos del usuario
    profile: (req, res) => {
        res.render("users/editProfile.ejs", { user: req.session.userLogged })
    },
    //Metodo que procesa la edición de datos de cada usuario
    updateProfile: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("users/editProfile.ejs", {
                user: req.session.userLogged,
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let user = req.session.userLogged
        db.User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: user.email,
            password: bcrypt.hashSync(req.body.password, 10),
            id_rol: user.id_rol,
            state: user.state
        }, {
            where: { id: user.id }
        })
            .then(() => {
                res.clearCookie('email');
                req.session.destroy();
                res.redirect("/users/login")
            })
            .catch(error => res.send(error))
    },
    delete: (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                let allUser = db.User.findAll({
                    order: [["id", "DESC"]],
                    limit: 30
                });
                let allRole = db.Role.findAll();
                Promise.all([allUser, allRole])
                    .then(function ([user, role]) {
                        res.render('users/viewUser.ejs', { users: user, roles: role })
                    })
            })
            .catch(error => res.send("El usuario que intentas eliminar no existe"))

    },
    //Metodo que procesa la vista paara solicitar el cambio de contraseña
    recovery: (req, res) => {
        res.render('users/recovery.ejs')
    },
    //Metodo que procesa la solicitud de token para cambiar la contraseña
    recoveryProcess: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            console.log(resultValidation.errors)
            return res.render("users/recovery.ejs", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        const email = db.User.findOne({ where: { email: req.body.email } })
            .then(function (email) {
                if (email) {
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
                        to: req.body.email,
                        subject: 'Cambio de contraseña para ' + email.first_name + '!',
                        text: 'Hola, ' + email.first_name + ', tu token de seguridad es: ' + email.password.substr(50, 6) + '   Para cambiar tu contraseña ingresa a https://saludquemchi.cl/users/change',
                        html: '<b>Hola <strong>' + email.first_name + ' ' + email.last_name + '</strong>.\n Tu codigo de seguridad es:<b>\n '
                            + email.password.substr(50, 6) + '</b></p><br><b><a href="https://saludquemchi.cl/users/change" target="_blank">Clic aquí para cambiar tu contraseña. </a><br><br>www.saludquemchi.cl<br><b>Saludos de parte de unidad de Toma de Muestras.<br>Cesfam Quemchi.'

                    }

                    transporter.sendMail(mailOption, (error, info) => {
                        if (error) {
                            res.status(500).send(error.message);
                        } else {
                            console.log("Correo enviado")
                            return res.redirect('/users/login')
                        }
                    })
                } else {
                    //Agregar return con mensaje de error
                    res.send("El correo ingresado no existe en la base de datos")
                }
            })
            .catch(error => res.send(error))
    },
    //Metodo que carga vista para cambiar la contraseña
    changePassword: (req, res) => {
        res.render('users/resetpassword.ejs', { alert: "" })
    },
    //Metodo que procesa el cambio de contraseña con el token del password
    changePassProcess: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            console.log(resultValidation.errors)
            return res.render("users/resetpassword.ejs", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let userEmail = db.User.findOne({ where: { email: req.body.email } })
            .then(function (email) {
                if (email.password.substr(50, 6) === req.body.token) {
                    db.User.update({
                        first_name: email.first_name,
                        last_name: email.last_name,
                        email: email.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        id_rol: email.id_rol,
                        state: email.state
                    }, {
                        where: { email: req.body.email }
                    })
                        .then(() => {
                            return res.redirect('/users/login')
                        })
                        .catch(error => {
                            return res.render("users/resetpassword.ejs", {
                                alert: true,
                                oldData: req.body
                            })
                        })

                } else {
                    //Codigo no coincide
                    return res.render("users/resetpassword.ejs", {
                        alert: true,
                        oldData: req.body
                    })
                }
            })
            .catch(error => {
                return res.render("users/resetpassword.ejs", {
                    alert: true,
                    oldData: req.body
                })
            })
    },
    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect("/");
    },
    error: (req, res) => {
        res.redirect('/users/view')
    }
}

module.exports = controllerUser;
