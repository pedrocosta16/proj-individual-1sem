var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/pontuacao-atual/:fkUsuario", function (req, res) {
    dashboardController.pontuacaoAtual(req, res);
});

router.get("/evolucao/:fkUsuario", function (req, res) {
    dashboardController.evolucao(req, res);
});

router.get("/ranking/:fkUsuario", function (req, res) {
    dashboardController.ranking(req, res);
});

router.get("/quizzes-feitos/:fkUsuario", function (req, res) {
    dashboardController.quizzesFeitos(req, res);
});

router.get("/grafico-evolucao/:fkUsuario", function (req, res) {
    dashboardController.graficoEvolucao(req, res);
});

/*router.get("/grafico-posicao/:fkUsuario", function (req, res) {
    dashboardController.graficoPosicao(req, res);
});

router.get("/grafico-objetivo/:fkUsuario", function (req, res) {
    dashboardController.graficoObjetivo(req, res);
});*/

module.exports = router;