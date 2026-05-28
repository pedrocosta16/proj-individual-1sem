// Importando framework express
// Utilizado para criar o servidor e gerenciar rotas HTTP do projeto
var express = require("express");

// Criando um objeto Router do express
// Utilizado para separar e organizar as rotas do projeto
var router = express.Router();

// Importando o arquivo dashboardController
var dashboardController = require("../controllers/dashboardController");



// ROTA GET para visualizar a pontuação atual (último quiz feito) de um usuário
// GET para buscar dados do servidor
router.get("/kpi-pontuacao-atual/:fkUsuario", function (req, res)
{
    // Chamando a função kpiPontuacaoAtual do dashboardController.js

    // :fkUsuario -> parâmetro de rota, o valor será dinâmico dependendo do usuario logado

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    dashboardController.kpiPontuacaoAtual(req, res);
});




// ROTA GET para visualizar a evolução (ultimo quiz - primeiro quiz) de um usuário
// GET para buscar dados do servidor
router.get("/kpi-evolucao/:fkUsuario", function (req, res)
{
    // Chamando a função kpiEvolucao do dashboardController.js

    // :fkUsuario -> parâmetro de rota, o valor será dinâmico dependendo do usuario logado

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    dashboardController.kpiEvolucao(req, res);
});




// ROTA GET para visualizar a posição de um usuário no ranking geral de pontos
// GET para buscar dados do servidor
router.get("/kpi-ranking/:fkUsuario", function (req, res)
{
    // Chamando a função kpiRanking do dashboardController.js

    // :fkUsuario -> parâmetro de rota, o valor será dinâmico dependendo do usuario logado

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    dashboardController.kpiRanking(req, res);
});




// ROTA GET para visualizar a quantidade de quizzes feito de um usuário
// GET para buscar dados do servidor
router.get("/kpi-quizzes-feitos/:fkUsuario", function (req, res)
{
    // Chamando a função kpiQuizzesFeitos do dashboardController.js

    // :fkUsuario -> parâmetro de rota, o valor será dinâmico dependendo do usuario logado

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    dashboardController.kpiQuizzesFeitos(req, res);
});




// ROTA GET para visualizar a evolução de pontuação do quiz de um usuário
// GET para buscar dados do servidor
router.get("/grafico-evolucao-quiz/:fkUsuario", function (req, res)
{
    // Chamando a função graficoEvolucaoQuiz do dashboardController.js

    // :fkUsuario -> parâmetro de rota, o valor será dinâmico dependendo do usuario logado

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    dashboardController.graficoEvolucaoQuiz(req, res);
});




// Exportando o router
// Permite utilizar essas rotas em outras partes do projeto
module.exports = router;