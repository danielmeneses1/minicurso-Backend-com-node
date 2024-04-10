import express from "express"
import {connect} from "./dbconnect.js"
import { Livro } from "../models/Livro.js";

const connection = await connect();

connection.on("error", (erro)=>{
    console.log("Erro ao conectar ao banco de dados", erro)
})
connection.once("open", ()=>{
    console.log("Conexão estabelecida com sucesso")
})

export const App = express();
App.use(express.json())


App.get("/livros", async (req,res)=>{
    const listalivros = await Livro.find({})
    res.status(200).json(listalivros)
})

App.post("/inserirLivro", async (req,res) =>{
    const novoLivro = (req.body);
    try {
        await Livro.create(novoLivro);
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(500).send(error)
    }
})

App.delete("/deletarlivro/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const livroExcluido = await Livro.findByIdAndDelete(id)
        if (livroExcluido) {
            res.status(204).send("Livro excluído com sucesso", livroExcluido)    
        } 
        else {
            res.status(404).send("Livro não encontrado")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

App.patch("/atualizarlivro/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const livroatualizado = await Livro.findByIdAndUpdate({_id :id}, 
            req.body, {new : true}
        )
        if(livroatualizado){
            res.status(200).json(livroatualizado)
        }else{
            res.status(404).send("livro não encontrado")
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

