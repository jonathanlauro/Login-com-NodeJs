function admin(req,res,next){
    let tipo = parseInt(req.session.usuario.type)
    if(tipo == 1){
        next()
    }else{
        res.redirect('/')
    }
}
module.exports = admin;