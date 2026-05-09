var express = require("express");
var router = express.Router();

var preferenciaController = require("../controllers/preferenciaController");

router.post("/cadastrar", function (req, res) {
    preferenciaController.cadastrar(req, res);
});

router.get("/visualizar/:fkUsuario", function (req, res) {
    preferenciaController.visualizar(req, res);
});

module.exports = router;