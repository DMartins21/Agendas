const mongoose = require('mongoose');
const validator = require('validator')

const Contatochema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: ''},
  telefone: { type: String, required: false, default: ''},
  email: { type: String, required: false, default: ''},
  criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', Contatochema);

class Contato {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

async buscarId(id){
  if(typeof id !== 'string') return

  const user = await ContatoModel.findById(id);
  return user
}

async registerContato(){
  this.validaContato()

  if(this.errors.length > 0) return

  this.contato = await ContatoModel.create(this.body)
}

validaContato(){
    this.cleanUp()

    if(this.body.email && !validator.isEmail(this.body.email)){
      this.errors.push('Email Inválido')
  }
  if(!this.body.nome) this.errors.push('Nome é obrigatório')
  if(!this.body.email && !this.body.telefone) this.errors.push('Contato deve ter um telefone ou email')
}


cleanUp(){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = ''
      }
    }
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      telefone: this.body.telefone,
      email: this.body.email
    }
}


}


module.exports = Contato;
