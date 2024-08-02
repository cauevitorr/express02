import "dotenv/config"
import express from "express"
import mysql from "mysql2"
import { v4 as uuidv4 } from "uuid"

const PORT = 3333

const app = express()

//Receber dados em formato json
app.use(express.json())

//Criar conexão com o banco de dados
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "Sen@iDev77!.",
 database: "livraria3F",
 port: "3306"
})

//Conectar ao banco de dados
conn.connect((err) => {
 if (err) {
  console.log(err)
 }
 console.log("MYSQL conectado!")

 app.listen(PORT, () => {
  console.log("Servidor on PORT " + PORT)
 })

})

app.get("/livros", (request, response) => {
 const sql = /*sql*/`SELECT * FROM livros`
 conn.query(sql, (err, data) => {
  if (err) {
   console.error(err)
   response.status(500).json({ err: "Erro so buscar livro" })
   return
  }
  const livros = data
  response.status(200).json(livros)
 })
})

app.post("/livros", (request, response) => {
 const { titulo, autor, ano_publicacao, genero, preco } = request.body

 //validações
 if (!titulo) {
  response.status(400).json({ err: "o titulo é obrgatório" })
 }
 if (!autor) {
  response.status(400).json({ err: "o autor é obrgatório" })
 }
 if (!ano_publicacao) {
  response.status(400).json({ err: "o ano de publicação é obrgatório" })
 }
 if (!genero) {
  response.status(400).json({ err: "o gênero é obrgatório" })
 }
 if (!preco) {
  response.status(400).json({ err: "o preço é obrgatório" })
  return
 }

 //verificar se o livro não foi cadastrado 
 const checkSql = /*sql*/`SELECT * FROM livros where titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`
 conn.query(checkSql, (err, data) => {
  if (err) {
   console.log(err)
   response.status(500).json({ err: "Erro ao buscar livro" })
   return
  }
  if (data.length > 0) {
   response.status(409).json({ err: "Livro já foi cadastrado" })
   return
  }

  //cadastrar o livro
  const id = uuidv4()
  const disponibilidade = 1
  const insertSql = /*sql*/` INSERT INTO livros(livro_id, titulo, autor, ano_publicacao, genero, preco, disponibilidade) VALUES("${id}", "${titulo}", "${autor}", "${ano_publicacao}", "${genero}", "${preco}", "${disponibilidade}")`

  conn.query(insertSql, (err) => {
   if (err) {
    console.error(err)
    response.status(500).json({ err: "Erro ao cadastrar o livro" })
    return
   }
   response.status(201).json({ message: "Livro cadastrado" })
  })
 })
})

app.get("livros/:id",(request, response)=>{
 const updateSql = /*sql*/`UPDATE livros SET titulo = "${titulo}", autor = "${autor}", `
})
app.put("/livros/:id", (request, response)=>{

})

app.delete("livros/:id", (request, response)=>{
 const {id} = request.params

 const deleletSql = /*sql*/`DELETE FROM livros WHERE livros_id = "${id}"`

 conn.query(deleletSql, (err, info)=>{
  if (err) {
   console.error(err)
   response.status(500).json({err:"Erro ao deletar livro"})
   return
  }

  if (info.affectedRows === 0) {
    response.status(200).json("Livro deletado")
  }
 })
})

/*************** ROTAS DE FUNCIONÁRIOS *************** */
/* tabela(id, nome, cargo, data_contartação, salario, email, created_at, update_at)
/* 1º listar todos os funcionários
/* 2º cadastrar um funcionário (email único)
/* 3º listar um funcionário
/* 4º atualizar um funcionário (email único)
/* 5º deletar um funcionário 
*/
