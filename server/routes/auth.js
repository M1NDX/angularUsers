const router = require('express').Router()
const passport = require('passport')
const users = require('../users.json')
const passportLocal = require('./passportLocal')
const passportGoogle = require('./passportGoogle')


// router.post('/api/login',(req,res)=>{

//     if(req.body.nombre && req.body.pass){
//       let usr=  users.find(u => u.nombre == req.body.nombre && u.pass == req.body.pass)
//       if(usr){
//         res.send({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0ZXN0IjoiZHNhcXdmZHNhZGYiLCJleHAiOjE2NzcyMzkwMjJ9.gMcSIErZ4rwo8FJ4OLDt0L5bjZs1uKjpUNcGBqJxu_Y"})
//       }else{
//         res.status(401).send({error: "Datos incorrectos, verifique"})
//       }
//     }else{
//         res.status(400).send({error: "faltan datos"})
//     }
// })

router.post('/api/login', passportLocal.login)

router.get('/api/google/login',passport.authenticate('google',{scope:['profile','email']}))

router.get('/api/google/redirect',  passportGoogle.googleLogin)

module.exports = router;