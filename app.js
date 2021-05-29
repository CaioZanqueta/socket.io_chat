const app = require('./config/server')

const server = app.listen(80, () => console.log("\nServidor ON\n"))

const io = require('socket.io')(server)

app.set('io', io)

io.on('connection', (socket) => {

    console.log("Usuário conectou\n")

    socket.on('disconnect', () => console.log("Usuário desconectou\n"))

    socket.on('msgParaServidor', (data) => {

        socket.emit(
            'msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            }
        )

        socket.broadcast.emit(
            'msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            }
        )

        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){

            socket.emit(
                'participantesParaCliente',
                {
                    apelido: data.apelido
                }
            )
    
            socket.broadcast.emit(
                'participantesParaCliente',
                {
                    apelido: data.apelido
                }
            )

        }
    })
})