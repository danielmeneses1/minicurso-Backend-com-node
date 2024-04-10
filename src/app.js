import express from "express"

export const App = express();
App.use(express.json())
const livros = [
    {id: 1, nome: "O hobbit"},
    {id: 2, nome: "O senhor dos anéis"},
]

App.get("/", (req,res)=>{
    res.status(200).json(livros)
})

App.post("/", (req,res)=>{
    livros.push(req.body)
    res.status(201).send("livro inserido com sucesso")
})