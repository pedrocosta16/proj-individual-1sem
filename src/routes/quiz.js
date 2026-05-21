var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/vizualizar-quizzes/:fkUsuario", function (req, res) {
    quizController.vizualizarQuizzes(req, res);
});

router.post("/realizar/:fkUsuario", function (req, res) {
    quizController.realizarQuiz(req, res);
});

module.exports = router;