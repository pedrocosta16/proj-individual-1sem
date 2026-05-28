// Importando framework express
// Utilizado para criar o servidor e gerenciar rotas HTTP do projeto
var express = require("express");

// Criando um objeto Router do express
// Utilizado para separar e organizar as rotas do projeto
var router = express.Router();

// Importando o arquivo quizController
var quizController = require("../controllers/quizController");




// ROTA GET para visualizar os quizzes de um usuário
// GET para buscar dados do servidor
router.get("/visualizar-quizzes/:fkUsuario", function (req, res)
{
    // Chamando a função visualizarQuizzes do quizController.js

    // :fkUsuario -> parâmetro de rota, o valor será dinâmico dependendo do usuario logado

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    quizController.visualizarQuizzes(req, res);
});




// Rota POST para realizar um quiz
// POST para enviar dados ao servidor
router.post("/realizar-quiz", function (req, res)
{
    // Chamando a função realizarQuiz do quizController.js

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    quizController.realizarQuiz(req, res);
});




// Exportando o router
// Permite utilizar essas rotas em outras partes do projeto
module.exports = router;