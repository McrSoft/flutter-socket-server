
const {response} = require ('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {
    
  const {email, password} = req.body;
  try {
      const existeEmail = await Usuario.findOne({email});
      if (existeEmail){
          return res.status(400).json({
            ok:false,
            msg: "Email ya existe!"
        });
      }
    const usuario = new Usuario( req.body);
      // encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
   await usuario.save();

   // generar jsonwebtoken
   const token = await generarJWT( usuario.id);
    
    res.json({
            ok: true,
            usuario,
            token
        });  

  } catch (error) {
      console.log(error);
      res.status(500).json({
          ok:false,
          msg: "Error en BD"
      });
  }
 
}

const login  = async (req, res = response) => {
    
  const {email, password} = req.body;
  try {
      const usuarioDB = await Usuario.findOne({email});
      if ( !usuarioDB ){
        return res.status(404).json({
          ok:false,
          msg : "Datos incorrectos"
        });
      }
      // validar password
      const existePaswword = bcrypt.compareSync(password, usuarioDB.password);
      if (!existePaswword){
        return res.status(404).json({
          ok:false,
          msg : "Datos incorrectos en contraseña"
        });
      
      }
      // generar JWT
      const token = await generarJWT(usuarioDB.id);
      res.json({
        ok: true,
        usuario: usuarioDB,
        token
    });  

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: "Error en BD -L"
    });
    
  }
  
 
}


const renewToken = async (req, res = response) => {

  try {
    const uid = req.uid;

  const token = await generarJWT(uid);
  
  const usuario = await Usuario.findById(uid);
  
   res.json({
   ok: true,
   usuario,
   token
  });

  } catch (error) {
    console.log('OJO'+error);
     res.status(500).json({
        ok:false,
        msg: "Error en revalidar token"
    });
    
  }
  
}

module.exports = {
    crearUsuario, login,renewToken
}