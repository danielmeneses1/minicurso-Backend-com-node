import express from "express"

export const App = express();

App.get("/", (req,res)=>{
    res.status(200).send("hello world")
})