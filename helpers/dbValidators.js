const User = require('../models/user');

const emailExiste = async(email = '') => {
    //Verificar si el correo existe
    const existeEmail = await User.findOne({email});

    if(existeEmail){
        throw new Error('Ese correo ya esta registrado');
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioPorId
}