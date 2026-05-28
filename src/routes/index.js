// Importando framework express
// Utilizado para criar o servidor e gerenciar rotas HTTP do projeto
var express = require("express");

// Criando um objeto Router do express
// Utilizado para separar e organizar as rotas do projeto
var router = express.Router();




// ROta GET para "/"
// Quando alguém acessar http://localhost:3000/ esse cod sera executado
router.get("/", function (req, res)
{
    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Resposta que o servidor vai devolver

    // Procura o arquivo index e transforma ele em HTML pra enviar pro navegador
    res.render("index");
});




// Exportando o router
// Permite utilizar essas rotas em outras partes do projeto
module.exports = router;