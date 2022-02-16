
const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const {usuarioConectado,usuarioDesconectado, grabarMensaje} = require ('../controllers/socket');

// mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
//    client.emit('bandas-activas',bands.getBands());
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    // verifica autenticación
    if (!valido) {return client.disconnect();}

    //cliente autenticado
    usuarioConectado(uid);
    
    //ingresar al usuario en una sala especifica
    //sala global, client.id,
    client.join( uid );

    // escuchar mensaje personal
    client.on('mensaje-personal', async ( payload ) => {
      await grabarMensaje( payload );
      io.to( payload.para ). emit ('mensaje-personal', payload );
          });
      

client.on('disconnect', () => { 
  usuarioDesconectado(uid);
     });

//client.on('mensaje',(payload)=>{
//    console.log('mensaje', payload);
//    io.emit('mensaje', {admin:'Nuevo MAM'});
//});

  

  });
