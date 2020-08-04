const express = require('express')
const jwt = require('jsonwebtoken')
const Router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../../models/User')

process.env.SECRET_KEY = 'f121fd12fd13fdgd3fdf1d2fdsd123fd'

Router.get("/", (req, res, next) => {
  res.send("Je suis sur la route GET de login");
})




// http://localhost:3000/login/login

Router.post('/login', (req, res) => {
  // console.log(req.body)
  User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (user) {
        // console.log(user)
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let tokenUserinfo = { fullname: user.fullname, id: user.id, isAdmin: user.isAdmin}
          let token = jwt.sign(tokenUserinfo, process.env.SECRET_KEY, {
            expiresIn: '1h'
          })
          res.header("Access-Control-Expose-Headers", "x-access-token")
          res.set("x-access-token", token)
          res.status(200).send({ details: "user connected", user })
        }
      } else {
        res.status(400).json({ error: 'User does not exist ' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})



// http://localhost:3000/login/protected
const getToken = req => {
  if ( req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer" ) {
    return req.headers.authorization.split(" ")[1]
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};


Router.post("/protected", (req, res, next) => {
  const token = getToken(req);
  const objectTests = { test: 'ok' }   // exemple de data appeler par la bdd 

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(200).send({ mess: 'N\'a pas acces au données' })
    }
    console.log('decode', decoded)
    return res.status(200).send({ message: 'Token OK' })
    // return res.status(200).send({ mess: 'Token verifié', objectTests })
  })
})




module.exports = Router