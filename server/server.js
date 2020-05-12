const express = require('express')
const cors = require('cors')
const fs = require('fs')
const users = require('./users.json')
const uploadRouter = require('./routes/upload')
const authRouter = require('./routes/auth');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    const chat = require('./routes/chat')(socket, io);
})


app.use(cors()); 
app.use(express.json())


app.use(express.static(__dirname+'/public'))

app.use(uploadRouter);
app.use(authRouter);

// app.get('/',(req,res)=>{
//     res.send("Server")
// })




app.get('/api/users', (req,res)=>{
    console.log("query params", req.query);
    res.json(users);
})

app.post('/api/users',(req,res)=>{
    console.log(req.body);
    
    let {nombre, pass, estado, hobbies} = req.body;

    if(nombre && pass && estado && hobbies!= undefined){
        if(users.some(u=> u.nombre == nombre)){
            res.status(401).send({error: "usuario ya existe"})
        }else{
            let newUser = {nombre, pass, estado, hobbies};
            users.push(newUser);
            fs.writeFileSync('users.json',JSON.stringify(users));
        }
    }else{
        res.status(400).send({error: "faltan datos"})
    }
    

})

app.get('*',(req,res)=>res.sendFile(__dirname+'/public/index.html'))


http.listen(3000, ()=> console.log("running"))