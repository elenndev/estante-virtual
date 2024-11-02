const mongoose = require('mongoose')

const LivroSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('biblioteca', LivroSchema) //nome da colecao e model