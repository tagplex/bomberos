const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
const viewMiddleware = require("../middlewares/viewMiddleware");

//Configurar multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/pdf')
    },
    filename: function (req, file, cb) {
        cb(null, "pdf_" + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({ storage: storage });
//Validación al subir un resultado
const validationsFile = [
    body('id_patient')
        .notEmpty().withMessage('Primero debes seleccionar un usuario'),
    body('code').notEmpty().withMessage('Debes ingresar un codigo de resultado.'),
    body('file').custom((value, { req }) => {
        let file = req.file;
        let acceptedextensions = ['.pdf', '.apdf', '.xps'];

        if (!file) {
            throw new Error("Solo puedes subir archivos");
        } else {
            let fileextensions = path.extname(file.originalname);
            if (!acceptedextensions.includes(fileextensions)) {
                throw new Error(`las extensiones permitidas son ${acceptedextensions.join(', ')}`);
            }
        }
        return true;
    })
]
//Validación al editar un resultado
const validationEdit = [
    body('date')
        .notEmpty().withMessage('Primero debes una fecha'),
    body('code').notEmpty().withMessage('Debes ingresar un codigo de resultado.'),
    body('file').custom((value, { req }) => {
        let file = req.file;
        let acceptedextensions = ['.pdf', '.apdf', '.xps'];
        if (!file) {
            return true
        } else {
            let fileextensions = path.extname(file.originalname);
            if (!acceptedextensions.includes(fileextensions)) {
                throw new Error(`las extensiones permitidas son ${acceptedextensions.join(', ')}`);
            }
        }
        return true;
    })
]

const validationSend = [
    body("email").notEmpty().withMessage("Debes escribir un correo electronico").bail()
        .isEmail().withMessage("Debes ingresar un formato de correo valido"),
    body("captcha").custom((value, { req }) => {
        if (!req.body["mtcaptcha-verifiedtoken"]) {
            throw new Error("Captcha es requerido");
        }
        return true;
    })
]

const resultController = require('../controllers/resultController')

router.get('/upload', authMiddleware, authAdminMiddleware, resultController.viewUpload);
router.get('/view', authMiddleware, viewMiddleware, resultController.viewResult);
router.get('/search', authMiddleware, viewMiddleware, resultController.search);
router.get('/r/upload', authMiddleware, authAdminMiddleware, resultController.upload);
router.get('/edit/:id/patient/:id_patient', authMiddleware, authAdminMiddleware, resultController.edit);
router.get('/send/:id', authMiddleware, viewMiddleware, resultController.send);
router.get('/*', authMiddleware, authAdminMiddleware, resultController.error);

router.post('/', upload.single("file"), validationsFile, authMiddleware, authAdminMiddleware, resultController.store);
router.post('/sendemail', validationSend, authMiddleware, viewMiddleware, resultController.sendemail);
router.patch('/edit/:id/patient/:id_patient', upload.single("file"), validationEdit, authMiddleware, authAdminMiddleware, resultController.update);
router.delete('/delete/:id', authMiddleware, authAdminMiddleware, resultController.delete);

module.exports = router;