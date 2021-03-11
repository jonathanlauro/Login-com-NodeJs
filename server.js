const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const authenticaterequired = require('./config/middAuth');
const midAdmin = require('./config/midAdmin');

const app = express()

//mok de Usuários
var usuarios = [{"usuario":"jonathan",type:1,"senha":"12345"},{"usuario":"admin",type:1,"senha":"admin"},{"usuario":"emille",type:0,"senha":"emille3006"}]


app.use(session({secret:'@#$ABC123#@!',resave:false,saveUninitialized:true,cookie:{maxAge:60000}}));

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.post('/',(req,res)=>{
    const usuario = usuarios.find(u => u.usuario == req.body.usuario)

    if(usuario == undefined){
        
        res.redirect('/')
    }else{
            if(usuario.usuario == req.body.usuario && usuario.senha == req.body.senha && (usuario != undefined)){
                
                req.session.usuario = usuario
                console.log("Usuário Logado "+usuario.usuario);
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
app.get('/admin',authenticaterequired,midAdmin,(req,res)=>{
    res.json({msg:"usuario master"})
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
    console.log('rodando porta:3232')
})