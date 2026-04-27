var express = require("express");
var router = express.Router();

var treinoController = require("../controllers/treinoController");

router.post("/cadastrar", function (req, res) {
    treinoController.cadastrar(req, res);
});
/*
router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})*/

module.exports = router;