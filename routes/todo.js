const express = require('express');
const router = express.Router();

const {check} = require('express-validator');

//Controllers
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todo');

//Helpers
const { existTodoPorId } = require('../helpers/dbValidators');

//Middewares
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');


router.get('/', getTodos);
router.get('/:id', [
    check('id', 'That does not look like a MongoId').isMongoId(),
    check('id').custom(existTodoPorId),
    validateFields
], getTodo);
router.post('/', [
    validateJWT,
    check('title', 'Todo title is required').not().isEmpty(),
    validateFields
], createTodo);
router.put('/:id', [
    check('id', 'That does not look like a MongoId').isMongoId(),
    check('id').custom(existTodoPorId),
    validateFields
], updateTodo);
router.delete('/:id', [
    check('id', 'That does not look like a MongoId').isMongoId(),
    check('id').custom(existTodoPorId),
    validateFields
],deleteTodo);

module.exports = router;