var treinoModel = require("../models/treino");

function buscarPortempo_treino(req, res) {
  var tempo_treino = req.query.tempo_treino;

  treinoModel.buscarPortempo_treino(tempo_treino).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  treinoModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  treinoModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var tempo_treino = req.body.tempo_treino;
  var fk_usuario = req.body.fk_usuario;

  treinoModel.buscarPortempo_treino(tempo_treino).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o tempo_treino ${tempo_treino} já existe` });
    } else {
      treinoModel.cadastrar(fk_usuario, tempo_treino).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  buscarPortempo_treino,
  //buscarPorId,
  cadastrar,
  //listar,
};
