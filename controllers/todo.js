const Todo = require('../models/todo');

const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({todos});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

const getTodo = async(req, res) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findById(id);

        if(!todo){
            return res.status(404).json({msg: 'Todo does not exist'});
        }

        res.status(200).json({todo});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

const createTodo = async (req, res) => {
    const {title, description, status} = req.body;
    try {
        const todo = new Todo({
            title, description, status
        })

        todo.userId = req.user._id;

        await todo.save();

        res.status(200).json({todo});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Something went wrong"})
    }
}

const updateTodo = async(req, res) => {
    
}

const deleteTodo = async(req, res) => {
    
}


module.exports = {
    getTodos, 
    getTodo, 
    createTodo, 
    updateTodo, 
    deleteTodo
}