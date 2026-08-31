const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('indexLog')
}

exports.create = (req, res) => {
    res.render('createContato', {
        contato: { }
    })
}

exports.createContato = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.registerContato()

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/create'))
            return
        }
        req.flash('success', 'Contato Registrado com sucesso')
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`))
        return
    }catch(e){
        console.error(e)
        res.render('404')
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404')
    
    const contato = new Contato(req.body)

    const user = await contato.buscarId(req.params.id)

    if(!user) return res.render('404')
    

    res.render('createContato', {
        contato: user
    })
}