var preferenciaModel = require("../models/preferenciaModel");
/*
function buscarUsuariosPorEmpresa(req, res)
{
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarAquariosPorEmpresa(idUsuario).then((resultado) =>
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
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}
*/

function cadastrar(req, res)
{
  var genero_musical = req.body.genero_musical;
  var objetivo_pilates = req.body.objetivo_pilates;
  var idUsuario = req.body.idUsuario;

  if (genero_musical == undefined){
    res.status(400).send("genero_musical está undefined!");
  }
  
  else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  }
  
  else {
    preferenciaModel.cadastrar(genero_musical, objetivo_pilates, idUsuario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  //buscarAquariosPorEmpresa,
  cadastrar
}