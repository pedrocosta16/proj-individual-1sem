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




module.exports = {
  pontuacaoAtual,
  evolucao,
  ranking,
  quizzesFeitos
};
