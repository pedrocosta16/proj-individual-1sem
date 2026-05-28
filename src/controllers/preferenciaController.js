var preferenciaModel = require("../models/preferenciaModel");

function visualizarPreferencias(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  preferenciaModel.visualizarPreferencias(fkUsuario)
  .then((resultado) =>
  {
    if (resultado.length > 0)
    {
      res.status(200).json(resultado);
    }
    
    else
    {
      res.status(204).json([]);
    }

  }).catch(function (erro)
  {
    console.log(erro);
    console.log("Houve um erro ao buscar as preferências: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrarPreferencias(req, res)
{
  var genero_musical = req.body.generoMusicalServer;
  var objetivo_pilates = req.body.objetivoPilatesServer;
  var tempo_treino = req.body.tempoTreinoServer;
  var fk_usuario = req.body.fkUsuarioServer;

  if (genero_musical == undefined){
    res.status(400).send("genero_musical está undefined!");
  }
  
  else if (objetivo_pilates == undefined) {
    res.status(400).send("Objetivo pilates está undefined!");
  }

  else if (tempo_treino == undefined) {
    res.status(400).send("Tempo de treino está undefined!");
  }

  else if (fk_usuario == undefined) {
    res.status(400).send("Fk usuário está undefined!");
  }

  
  else
  {
    preferenciaModel.cadastrarPreferencias(genero_musical, objetivo_pilates, tempo_treino, fk_usuario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro de preferências! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  visualizarPreferencias,
  cadastrarPreferencias
}