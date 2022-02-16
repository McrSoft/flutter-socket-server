/*
  path: api/login
*/

const  { Router  } = require('express');
const { check } = require('express-validator');

const {crearUsuario, login, renewToken} = require('../controllers/auth');
const { getUsuarios } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

 router.post('/new', [
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('password','El password es obligatorio').not().isEmpty(),
     check('email', 'El email no es valido').isEmail(),
     validarCampos
 ],crearUsuario);

 router.post('/',[
  check('email', 'El email no es valido').isEmail(),
  check('password','El password es obligatorio').not().isEmpty(),
  validarCampos
 ],login);

 //validarJWT
 router.get('/renew', validarJWT, renewToken);


  //recupepra todos los usuarios
  router.get('/', validarJWT, getUsuarios);

module.exports = router;