const passport = require('passport')
const GoogleStrategy= require('passport-google-oauth').OAuth2Strategy;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const googleConfig = require('../googleConfig');
const users = require('../users.json');


passport.use(new GoogleStrategy({
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleConfig.callbackURL  //http://localhost:3000/google/redirect?code=asfasfasfasfa
}, function(accessToken, refreshToken, profile, done){
    console.log(profile);
    if(profile==null){
        done(null,false, {error: "No fue posible autenticarse"})
        return;
    }

    let newUser= {
        nombre: profile._json.email,
        info: profile._json 
    }

    let findUser = users.find(u => u.nombre == newUser.nombre);

    if(findUser){
        done(null,findUser)
        return;
    }else{
        users.push(newUser);
        fs.writeFileSync('users.json',JSON.stringify(users));
        done(null,newUser)
    }
}

))

function googleLogin(req, res){
    console.log("Entrando a google login");

    passport.authenticate('google',(err,user, info)=>{
        console.log("Entrando a google strategy");
        console.log(user);
        if(user){
            let token = jwt.sign({nombre:user.nombre},'palabra secreta', {expiresIn:'1h'}) 
            res.send({token})
         }else{
             res.status(401).send(info)
         }
    })(req,res)

}


module.exports = {googleLogin};

