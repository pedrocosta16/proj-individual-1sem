// Importando o preferenciaModel
var preferenciaModel = require("../models/preferenciaModel");


// Função que busca as preferências de um user
function visualizarPreferencias(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  // Chama o model que executa o SELECT no banco
  preferenciaModel.visualizarPreferencias(fkUsuario)
  .then(function (resultado)
  {
    // Verifica se encontrou algum registro
    if (resultado.length > 0)
    {
      res.status(200).json(resultado);
    }
    
    else
    {
      res.status(204).send("Nenhum resultado encontrado!")
    }

  }).catch(function (erro)
  {
    console.log(erro);
    console.log("Houve um erro ao buscar as preferências: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}




// Função que insere as preferências do user no banco
function cadastrarPreferencias(req, res)
{
  // Recupera dados enviados pelo front-end
  var genero_musical = req.body.generoMusicalServer;
  var objetivo_pilates = req.body.objetivoPilatesServer;
  var tempo_treino = req.body.tempoTreinoServer;
  var fk_usuario = req.body.fkUsuarioServer;

  if (genero_musical == undefined)
  {
    res.status(400).send("genero_musical está undefined!");
  }
  
  else if (objetivo_pilates == undefined)
  {
    res.status(400).send("Objetivo pilates está undefined!");
  }

  else if (tempo_treino == undefined)
  {
    res.status(400).send("Tempo de treino está undefined!");
  }

  else if (fk_usuario == undefined)
  {
    res.status(400).send("Fk usuário está undefined!");
  }

  else
  {
    // Chama o model que faz o INSERT no banco
    preferenciaModel.cadastrarPreferencias(genero_musical, objetivo_pilates, tempo_treino, fk_usuario)
      .then(function (resultado)
      {
        res.status(201).json(resultado);
      }
      ).catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o cadastro de preferências! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function atualizarPreferencias(req, res)
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
    preferenciaModel.atualizarPreferencias(genero_musical, objetivo_pilates, tempo_treino, fk_usuario)
      .then(function (resultado)
      {
        res.status(201).json(resultado);
      }

      ).catch(function (erro)
      {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro de preferências! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}




// Exportando as funções do controller
// Outros arquivos podem usar essas funções
module.exports = {
  visualizarPreferencias,
  cadastrarPreferencias,
  atualizarPreferencias
}