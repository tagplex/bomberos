const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware")

//Validacion de inicio de sesión
const validationLogin = [
    body("email").notEmpty().withMessage("Debes escribir un correo electronico").bail().isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("password").notEmpty().withMessage("Debes escribir una contraseña"),
    body("captcha").custom((value, { req }) => {
        if (!req.body["mtcaptcha-verifiedtoken"]) {
            throw new Error("Captcha es requerido");
        }
        return true;
    })
]
//Validacion de registro de usuarios
const validationRegister = [
    body("first_name")
        .notEmpty().withMessage("Debes escribir un nombre")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("last_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("email")
        .notEmpty().withMessage("Debes escribir un correo electronico").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("password")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1}).withMessage("La contraseña debe tener mayusculas, minusculas, numeros y caracteres especiales"),  
    body("repeatPassword")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .custom((value, { req })=>{
            if(req.body.password != req.body.repeatPassword){
                throw new Error("Las contraseñas no son iguales");
            }
            return true;
        }),
    body("captcha").custom((value, { req }) => {
            if (!req.body["mtcaptcha-verifiedtoken"]) {
                throw new Error("Captcha es requerido");
            }
            return true;
        })
]
//Validacion de registro de usuario desde el panel de administrador
const validationRegisterUser = [
    body("first_name")
        .notEmpty().withMessage("Debes escribir un nombre")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("last_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("email")
        .notEmpty().withMessage("Debes escribir un correo electronico").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("password")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1}).withMessage("La contraseña debe tener mayusculas, minusculas, numeros y caracteres especiales"),
    body('role').notEmpty().withMessage('Debes seleccionar un rol'),
]
//Validacion de edición de usuarios desde el panel de administrdor
const validationEdit = [
    body("first_name")
        .notEmpty().withMessage("Debes escribir un nombre")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("last_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("email")
        .notEmpty().withMessage("Debes escribir un correo electronico").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("password")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("La contraseña debe tener mayusculas, minusculas, numeros y caracteres especiales"),
    body('role').notEmpty().withMessage('Debes seleccionar un rol'),
    body('state').notEmpty().withMessage('Debes seleccionar un estado')
]
//Validacion de edición de perfil de cada usuario
const validationEditProfile = [
    body("first_name")
        .notEmpty().withMessage("Debes escribir un nombre")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("last_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
        body("password")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1}).withMessage("La contraseña debe tener mayusculas, minusculas, numeros y caracteres especiales"),  
    body("repeatPassword")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .custom((value, { req })=>{
            if(req.body.password != req.body.repeatPassword){
                throw new Error("Las contraseñas no son iguales");
            }
            return true;
        }),
]
//Validacion de solicitud de reestablecer contraseña
const validationRecovery = [
    body("email").notEmpty().withMessage("Debes escribir un correo electronico").bail().isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("captcha").custom((value, { req }) => {
        if (!req.body["mtcaptcha-verifiedtoken"]) {
            throw new Error("Captcha es requerido");
        }
        return true;
    })
]
//Validacion de cambio de contraseña
const validationChange = [
    body("email").notEmpty().withMessage("Debes escribir un correo electronico").bail().isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("token")
        .notEmpty().withMessage("Debes el codigo de seguridad que se envio a tu correo").bail(),
    body("password")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1}).withMessage("La contraseña debe tener mayusculas, minusculas, numeros y caracteres especiales"),  
    body("repeatPassword")
        .notEmpty().withMessage("Debes escribir una contraseña").bail()
        .custom((value, { req })=>{
            if(req.body.password != req.body.repeatPassword){
                throw new Error("Las contraseñas no son iguales");
            }
            return true;
        }),    
    body("captcha").custom((value, { req }) => {
        if (!req.body["mtcaptcha-verifiedtoken"]) {
            throw new Error("Captcha es requerido");
        }
        return true;
    })
]

const userController = require('../controllers/userController')

router.get('/', authMiddleware, authAdminMiddleware, userController.viewUser);
router.get('/view', authMiddleware, authAdminMiddleware, userController.viewUser);
router.get('/search', authMiddleware, authAdminMiddleware, userController.search);
router.get('/searchna', authMiddleware, authAdminMiddleware, userController.searchNotActive);
router.get('/login', guestMiddleware, userController.login);
router.get('/register', guestMiddleware, userController.register);
router.get('/recovery', guestMiddleware, userController.recovery);
router.get('/change', guestMiddleware, userController.changePassword);
router.get('/createUser', authMiddleware, authAdminMiddleware, userController.registerUser);
router.get('/edit/:id', authMiddleware, authAdminMiddleware, userController.edit);
router.get('/logout', userController.logout);
router.get('/profile', authMiddleware, userController.profile);
router.get('/*', authMiddleware, authAdminMiddleware, userController.error);

router.post('/', validationRegister, userController.store); //Ruta que procesa el registro de usuarios
router.post('/create', validationRegisterUser, authMiddleware, authAdminMiddleware, userController.storeUser);
router.post('/login', validationLogin, userController.loginProcess); //Ruta que procesa el inicio de sesión de los usuarios
router.post('/recovery', validationRecovery, userController.recoveryProcess)
router.post('/change', validationChange, userController.changePassProcess)

router.patch('/edit/:id', validationEdit, authAdminMiddleware, authMiddleware, userController.update);
router.patch('/profile/:id', validationEditProfile, authMiddleware, userController.updateProfile);
router.delete('/delete/:id', authMiddleware, authAdminMiddleware, userController.delete);


module.exports = router;