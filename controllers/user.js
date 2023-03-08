const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const getUser = async(req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    
    try {
        const user = new User({
            name, email, password
        })

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Something went wrong"})
    }
}



module.exports = {
    getUser,
    createUser
}