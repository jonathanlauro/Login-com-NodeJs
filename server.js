const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const authenticaterequired = require('./config/middAuth');

const app = express()

//mok de Usuários
var usuarios = [{"usuario":"jonathan","senha":"12345"},{"usuario":"admin","senha":"admin"},{"usuario":"emille","senha":"jonathan12345"}]


app.use(session({secret:'@#$ABC123#@!',resave:false,saveUninitialized:true,cookie:{maxAge:60000}}));

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.post('/',(req,res)=>{
    const usuario = usuarios.find(u => u.usuario == req.body.usuario)

    console.log(usuario)
    if(usuario == undefined){
        
        res.redirect('/')
    }else{
            if(usuario.usuario == req.body.usuario && usuario.senha == req.body.senha && (usuario != undefined)){
                
                console.log("existe")
                req.session.usuario = usuario
                res.render('logado.ejs',{usuario:usuario})
            }else{
                console.log("Erro ao logar")
                res.render('index.ejs')
            }
    }
})
app.get('/',(req,res)=>{
    if(req.session.usuario != undefined){

        res.render('logado.ejs',{usuario:req.session.usuario})
    }else{

        res.render('index.ejs')
    }
})

app.get('/jow',authenticaterequired,(req,res)=>{
    res.json({msg:"fala Mano!"})
})
app.get('/logout',(req,res)=>{
    req.session.usuario = undefined;
    res.redirect('/')
})
const port = 3232
app.listen(port,()=>{
    console.log('rondando porta:3232')
})