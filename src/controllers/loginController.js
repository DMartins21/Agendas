const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    res.render('login')
}

exports.register = (req, res) => {
    res.render('register')
}

exports.userRegister = async(req, res) => {
    try{
        const login = new Login(req.body)
        await login.register()

        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/login/')
            })

            return
        }
        req.flash('sucess', 'Seu Usuário foi registrado com sucesso!')
        req.save(function(){
            return redirect('/login/')
        })
        res.send(login)
    }catch(e){
        console.log(e)
        res.render('404')
    }
}