var express = require("express");
var router = express.Router();

var preferenciaController = require("../controllers/preferenciaController");

router.post("/cadastrar", function (req, res) {
    preferenciaController.cadastrar(req, res);
});

module.exports = router;