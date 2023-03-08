const express = require('express');
const router = express.Router();

const {check} = require('express-validator');

//Controllers
const { createUser, getUser } = require('../controllers/user');

//Helpers
const { emailExiste, existeUsuarioPorId } = require('../helpers/dbValidators');

//Middewares
const { validateFields } = require('../middlewares/validateFields');


router.get('/:id', [
    check('id', 'That does not look like a MongoId').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validateFields
], getUser);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'That does not look like an email').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], createUser);


module.exports = router;