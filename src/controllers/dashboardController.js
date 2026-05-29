var dashboardModel = require("../models/dashboardModel");

function kpiPontuacaoAtual(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  dashboardModel.kpiPontuacaoAtual(fkUsuario).then((resultado) =>
  {
    res.status(200).json(resultado);
  });
}

function kpiEvolucao(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  dashboardModel.kpiEvolucao(fkUsuario).then((resultado) =>
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

function kpiRanking(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  dashboardModel.kpiRanking(fkUsuario).then((resultado) =>
  {
    res.status(200).json(resultado);
  });
}

function kpiQuizzesFeitos(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  dashboardModel.kpiQuizzesFeitos(fkUsuario).then((resultado) =>
  {
    res.status(200).json(resultado);
  });
}

function graficoEvolucaoQuiz(req, res) {

    const limite_linhas = 10;

    var fkUsuario = req.params.fkUsuario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    dashboardModel.graficoEvolucaoQuiz(fkUsuario, limite_linhas).then(function (resultado) {
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

function graficoObjetivos(req, res) {

    console.log(`Recuperando as ultimas medidas`);

    dashboardModel.graficoObjetivos().then(function (resultado) {
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

function graficoGeneroMusical(req, res) {

    console.log(`Recuperando as ultimas medidas`);

    dashboardModel.graficoGeneroMusical().then(function (resultado) {
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
  kpiPontuacaoAtual,
  kpiEvolucao,
  kpiRanking,
  kpiQuizzesFeitos,
  graficoEvolucaoQuiz,
  graficoObjetivos,
  graficoGeneroMusical
};
