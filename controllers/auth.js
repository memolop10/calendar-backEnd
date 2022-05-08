
const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');

const createUser = async(req ,res = response) => {
  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email })

    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'There is already a user with that email'
      })
    }
    
    user = new User( req.body );
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt )

    await user.save()

    //Generar Token
    const token = await generateJWT(user.id, user.name)
  
    res.status(201).json({
      ok:true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Please call to a manager"
    })
  }
 
}

const userLogin =  async(req, res = response) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })

    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'The user does not exist with that email.'
      });
    }

     //Confirmar los passwords
     const validPassword = bcryptjs.compareSync( password, user.password );
     if ( !validPassword ) {
       return res.status(400).json({
         ok: false,
         msg: 'Incorrect Password'
       })
     }

    //Generar nuestro JWT
     const token = await generateJWT(user.id, user.name)

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Please call to a manager"
    })
  }
}


const revalidateToken = async(req,res = response) => {

  const { uid, name } = req;

  const token = await generateJWT( uid, name )
  console.log(token);

  res.json({
    ok:true,
    uid,
    name,
    token
  })
}

module.exports = {
  createUser,
  userLogin,
  revalidateToken
}
