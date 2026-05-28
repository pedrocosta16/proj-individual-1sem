// Importando framework express
// Utilizado para criar o servidor e gerenciar rotas HTTP do projeto
var express = require("express");

// Criando um objeto Router do express
// Utilizado para separar e organizar as rotas do projeto
var router = express.Router();

// Importando o arquivo preferenciaController
var preferenciaController = require("../controllers/preferenciaController");




// Rota POST para cadastrar preferencias
// POST para enviar dados ao servidor
router.post("/cadastrar-preferencias", function (req, res)
{
    // Chamando a função cadastrarPreferencias do preferenciaController.js

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    preferenciaController.cadastrarPreferencias(req, res);
});




// ROTA GET para visualizar as preferências de um usuário
// GET para buscar dados do servidor
router.get("/visualizar-preferencias/:fkUsuario", function (req, res)
{
    // Chamando a função visualizarPreferencias do preferenciaController.js

    // :fkUsuario -> parâmetro de rota, o valor será dinâmico dependendo do usuario logado

    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Direcionando a requisição pro controller responsavel
    preferenciaController.visualizarPreferencias(req, res);
});




// Exportando o router
// Permite utilizar essas rotas em outras partes do projeto
module.exports = router;