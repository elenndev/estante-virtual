const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados(){
    try{
        console.log('Conexão com o banco de dados foi iniciada')
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Conexão feita com sucesso')
    } catch(error){
        console.log(error)
    }
}

module.exports = conectaBancoDeDados