const express = require("express") 
const route = express.Router() 
const cors = require('cors') 


//banco de dados
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()
const Livro = require('./livroModel')

const app = express() 
app.use(express.json())
app.use(cors())
const porta = 3333 


// get
async function mostraLivros(request, response) {
    try{
        const livrosSalvosNoBancoDeDados = await Livro.find()
        response.json(livrosSalvosNoBancoDeDados)
    }catch(error){

    }
}

// post
async function criaLivro(request, response){
    const novoLivro =  new Livro({
        nome: request.body.nome,
        autor: request.body.autor,
        categoria: request.body.categoria
    })

    try {
        const livroCriado = await novoLivro.save()
        response.status(200).json(livroCriado)
    } catch(error){
        console.log(error)
    }
}

// patch
async function corrigeLivro(request, response){
    try{
        const livroEncontrado = await Livro.findById(request.params.id)
        if (request.body.nome){
            livroEncontrado.nome = request.body.nome
        }
        if (request.body.autor){
            livroEncontrado.autor = request.body.autor
        }
        if (request.body.categoria){
            livroEncontrado.categoria = request.body.categoria
        }
        const livroAtualizadoNoBandoDeDados = await livroEncontrado.save()
        response.json(livroAtualizadoNoBandoDeDados)
    }catch(error){
        console.log(error)
    }


}

// delete
async function deletaLivro(request, response){
    try {
        await Livro.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Livro deletado com sucesso com sucesso'})
    }catch(error){
        console.log(error)
    }

}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(route.get('/livros', mostraLivros))
app.use(route.post('/livros', criaLivro))
app.use(route.patch('/livros/:id', corrigeLivro))
app.use(route.delete('/livros/:id', deletaLivro))
app.listen(porta, mostraPorta) 