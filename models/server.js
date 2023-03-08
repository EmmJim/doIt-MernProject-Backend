const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {

    constructor(){
        this.app = express();
        this.port = 4000;

        this.paths = {
            auth: '/api/auth',
            user: '/api/users',
            todo: '/api/todos',
        }

        //Conectar a DB
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.todo, require('../routes/todo'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }

}

module.exports = Server;