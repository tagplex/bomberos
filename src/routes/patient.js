const express = require ('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
const { body } = require("express-validator");

const validationRegister = [
    body("run")
        .notEmpty().withMessage("Debes escribir un run")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("first_name")
        .notEmpty().withMessage("Debes escribir un nombre")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("last_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("maiden_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
]
const validationEdit = [
    body("run")
        .notEmpty().withMessage("Debes escribir un run")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("first_name")
        .notEmpty().withMessage("Debes escribir un nombre")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("last_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
    body("maiden_name")
        .notEmpty().withMessage("Debes escribir un apellido")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),
]

const patientController = require ('../controllers/patientController')

router.get('/', authMiddleware, authAdminMiddleware, patientController.viewPatient);
router.get('/view', authMiddleware, authAdminMiddleware, patientController.viewPatient);
router.get('/search', authMiddleware, authAdminMiddleware, patientController.search);
router.get('/edit/:id', authMiddleware, authAdminMiddleware, patientController.edit);
router.get('/*', authMiddleware, authAdminMiddleware, patientController.error);
router.post('/', validationRegister, authMiddleware, authAdminMiddleware, patientController.store); //Ruta que procesa el registro de pacientes

router.patch('/edit/:id', validationEdit, patientController.update);

module.exports = router;