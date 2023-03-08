const express = require('express');
const router = express.Router();

const {check} = require('express-validator');

//Controllers
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todo');

//Middewares
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');


router.get('/', getTodos);
router.get('/:id', [
    check('id', 'That does not look like a MongoId').isMongoId(),
    validateFields
], getTodo);
router.post('/', [
    validateJWT,
    check('title', 'Todo title is required').not().isEmpty(),
    validateFields
], createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;