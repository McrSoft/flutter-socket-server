const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN);
        console.log ('Db Online');

    } catch (error) {
        console.log(error);
        throw new Error ('Error al conectar la BD');
        
    }

}

module.exports = {
    dbConnection
}