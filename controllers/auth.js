const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req, res) => {
    const {email, password} = req.body;

    console.log(req.body)
    try {
        //Verificar si el email existe
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                msg: 'User does not exist'
            })
        }

        
        //Verficiar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Incorrect user or password'
            }) 
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }

    
}


module.exports = { login }