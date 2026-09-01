const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    const contatos = new Contato()
    const contatosList = await contatos.buscaContatos()
    res.render('indexLog', {contatosList})
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
        req.session.save(() => res.redirect(`/contato/`))
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

exports.edit = async (req, res) => {
    try{
        if(!req.params.id) return res.render('404')

        const contato = new Contato(req.body)
        await contato.edit(req.params.id)

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(`/contato/${req.params.id}`))
            return
        }

        req.flash('success', 'Contato editado com sucesso')
        req.session.save(() => res.redirect(`/contato/`))
        return

    }catch(e){
        console.error(e)
        res.render('404')
    }
}

exports.deleteContato = async (req, res) => {
   
   try{
    if(!req.params.id) return res.render('404')

    const contato = new Contato(req.body)
    const user = await contato.deleteContato(req.params.id)
    if(!user) return res.render('404')
    
    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('/contato/'))
        return
    }

    req.flash('success', 'Contato deletado com sucesso')
    req.session.save(() => res.redirect('/contato/'))
    return
    }catch(e){
        console.error(e)
        res.render('404')
    }
}