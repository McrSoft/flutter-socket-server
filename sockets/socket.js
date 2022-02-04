const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Caifanes'));
bands.addBand(new Band('Mon'));
bands.addBand(new Band('Cafe Tacuba'));

// mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('bandas-activas',bands.getBands());

    client.on('disconnect', () => { 
        console.log('cliente desconectado');
     });

client.on('mensaje',(payload)=>{
    console.log('mensaje', payload);

    io.emit('mensaje', {admin:'Nuevo mate'});
});

//client.on('emitir-mensaje', (payload)=> {
    //console.log(payload);
    //io.emit('nuevo-mensaje',payload ); //LO EMITE A TODOS
  //  client.broadcast.emit('nuevo-mensaje',payload); //emite a todos menos quien lo  emitio

  client.on('vote-band',(payload) => {
      bands.voteBand(payload.id);
      io.emit('bandas-activas',bands.getBands());
  
} );


client.on('add-band',(payload) => {
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit('bandas-activas',bands.getBands());

} );

client.on('delete-band',(payload) => {
    
    bands.deleteBand(payload.id);
    io.emit('bandas-activas',bands.getBands());

} );



  });
