const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const users = require('../users.json');


passport.use(new LocalStrategy({
        usernameField:'nombre',
        passwordField:'pass'
    }, function(username,password, done){
        console.log(username, password);
        let usr = users.find(u=>u.nombre == username && u.pass == password )
        if(usr){
            done(null,usr);
        }else{
            done(null, false, {error: "datos incorrectos"})
        }
    }))

function login(req,res){
    console.log(req.body);
    passport.authenticate('local', (err,usr,info)=>{
        console.log(usr);
        if(usr){
           let token = jwt.sign({nombre:usr.nombre},'palabra secreta', {expiresIn:'1h'}) 
           res.send({token})
        }else{
            res.status(401).send(info)
        }
    } )(req,res);

}

module.exports = {login}