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

const locationController = require ('../controllers/locationController')

router.get('/', authMiddleware, authAdminMiddleware, locationController.viewLocation);
router.get('/view', authMiddleware, authAdminMiddleware, locationController.viewLocation);
/* router.get('/search', authMiddleware, authAdminMiddleware, locationController.search); */
router.get('/edit/:id', authMiddleware, authAdminMiddleware, locationController.edit);
router.get('/*', authMiddleware, authAdminMiddleware, locationController.error);
router.post('/', validationRegister, authMiddleware, authAdminMiddleware, locationController.store); //Ruta que procesa el registro de pacientes

router.patch('/edit/:id', validationEdit, locationController.update);

module.exports = router;