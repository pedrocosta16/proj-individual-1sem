var dashboardModel = require("../models/dashboardModel");

function pontuacaoAtual(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  dashboardModel.pontuacaoAtual(fkUsuario).then((resultado) =>
  {
    res.status(200).json(resultado);
  });
}

function evolucao(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  dashboardModel.evolucao(fkUsuario).then((resultado) =>
  {
    var evolucao = resultado[0].evolucao;

    if (evolucao === 0)
    {
      res.status(200).json({ evolucao: null, mensagem: "Faça mais quizzes!" });
    }
    
    else
    {
      res.status(200).json({ evolucao: evolucao, mensagem: null });
    }

  });
}

function ranking(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  dashboardModel.ranking(fkUsuario).then((resultado) =>
  {
    res.status(200).json(resultado);
  });
}

function quizzesFeitos(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  dashboardModel.quizzesFeitos(fkUsuario).then((resultado) =>
  {
    res.status(200).json(resultado);
  });
}

function graficoEvolucao(req, res) {

    const limite_linhas = 7;

    var fkUsuario = req.params.fkUsuario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashboardModel.graficoEvolucao(fkUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}




module.exports = {
  pontuacaoAtual,
  evolucao,
  ranking,
  quizzesFeitos,
  graficoEvolucao
};
