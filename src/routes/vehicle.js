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

const vehicleController = require ('../controllers/vehicleController')

router.get('/view', authMiddleware, authAdminMiddleware, vehicleController.viewType);


module.exports = router;