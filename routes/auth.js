const express = require('express');
const router = express.Router();

const {check} = require('express-validator');

//Controllers
const { login } = require('../controllers/auth');

//Middewares
const { validateFields } = require('../middlewares/validateFields');

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;