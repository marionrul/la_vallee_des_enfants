var express = require('express');
var router = express.Router();

// Express middlewares
const AuthentificationController = require('../controllers/AuthentificationController')
const AuthentificationControllerPolicy = require('../policies/AuthentificationControllerPolicy')

router.post('/login', AuthentificationControllerPolicy.login, AuthentificationController.login)


module.exports = router;