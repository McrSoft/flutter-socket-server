const { io } = require('../index');


// mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
//    client.emit('bandas-activas',bands.getBands());

client.on('disconnect', () => { 
        console.log('cliente desconectado');
     });

//client.on('mensaje',(payload)=>{
//    console.log('mensaje', payload);
//    io.emit('mensaje', {admin:'Nuevo MAM'});
//});

  

  });
