const express = require ('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const mainController = require ('../controllers/mainController')

router.get('/', authMiddleware, mainController.index);
router.get('/home', authMiddleware, mainController.index);
router.get('/test', authMiddleware, mainController.test);

module.exports = router;