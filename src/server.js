const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// importar asociaciones de schemas
require('./models/public/asociaciones');
require('./models/forms/asociaciones.forms');

const patg = require('path')
const { log } = require('console');


//! Configuracion de sockets
const http = require('http');
const socketio = require('socket.io')
const path = require('path');
const Sockets = require('./sockets'); //impotacion de la clase
//!---------------------------

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //!configuracion de sockets
        //Http server
        this.server = http.createServer(this.app)
        //Configuraciones de sockets
        this.io = socketio(this.server)
        this.socket = new Sockets(this.io)
        //!---------------------------


        // path public
        this.personasPath = '/api/personas';
        this.usuariosPath = '/api/usuarios';
        this.entidadesPath = '/api/entidades';
        this.intruccionesPath = '/api/instruccion';

        //modulos public
        this.authPath = '/api/auth';

        //modulos formularios
        this.formsPath = '/api/forms';
        this.formDataPath = '/api/formData';

        //multimedia
        this.formMultimediaPath = '/api/multimedia';

        // middlewares
        this.middlewares();

        // rutas de la aplicacion
        this.routes();

    }
    middlewares() {
        // CORS
        this.app.use(cors({ optionsSuccessStatus: 200 }));

        // lectura y parseo de datos del body
        this.app.use(express.json());

        // HTTP request logger
        this.app.use(morgan('dev'));

        // directorio publico
        this.app.use(express.static('public'));
        this.app.use('/multimedia/imagenes', express.static('src/uploads/multimedia/imagenes'));
        this.app.use('/multimedia/videos', express.static('src/uploads/multimedia/videos'));

    }

    routes() {
        //schema public
        this.app.use(this.authPath, require('./routes/public/modulos/auth'));
        this.app.use(this.personasPath, require('./routes/public/personas'));
        this.app.use(this.usuariosPath, require('./routes/public/usuarios'));
        this.app.use(this.entidadesPath, require('./routes/public/entidades'));

        //schema formularios

        this.app.use(this.formsPath, require('./routes/forms/formulario'));
        this.app.use(this.formDataPath, require('./routes/forms/formData'));

        //multimedia
        this.app.use(this.formMultimediaPath, require('./routes/multimedia/multimedia'));


        // Lo último
        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server corriendo en el puerto', this.port)
        })
    }

}

module.exports = Server