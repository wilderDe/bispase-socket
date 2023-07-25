
class Sockets{

    constructor( io  ){

        this.io = io;
        this.socketEvent();
    }

    socketEvent(){
        //Evento padre
        this.io.on('connection', (socket) => {

            console.log('cliente-conectado')

            socket.on('mensaje', (data) => {
                console.log(data)
            })

            socket.emit('emit', {
                msg: "hola mundo",
                fecha: new Date()
            } )

        })
    }
}

module.exports = Sockets