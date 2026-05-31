// Importando o dashboardModel
var dashboardModel = require("../models/dashboardModel");


// KPI: última pontuação do usuário
function kpiPontuacaoAtual(req, res)
{
  // id do usuário vindo da URL
  var fkUsuario = req.params.fkUsuario;

  // busca no banco a última pontuação
  dashboardModel.kpiPontuacaoAtual(fkUsuario).then(function (resultado)
  {
    // Verifica se algum registro foi encontrado
    if (resultado.length > 0)
      {
      // Retorna os dados encontrados em JSON
      res.status(200).json(resultado);
      console.log(resultado);
    }

    else
    {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  });
}




// KPI: evolução entre ultimo e 1º quiz
function kpiEvolucao(req, res)
{
  // id do usuário
  var fkUsuario = req.params.fkUsuario;

  // consulta evolução no model
  dashboardModel.kpiEvolucao(fkUsuario).then(function (resultado)
  {
    // valor do SQL
    var evolucao = resultado[0].evolucao;

    // tratando caso sem evolução
    if (evolucao === 0)
    {
      res.status(200).json({
        evolucao: null,
        mensagem: "Faça mais quizzes!"
      });
    }

    else
    {
      res.status(200).json({
        evolucao: evolucao,
        mensagem: null
      });
    }

  });
}




// KPI: posição no ranking
function kpiRanking(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  // busca posição no ranking
  dashboardModel.kpiRanking(fkUsuario).then(function (resultado)
  {
    // Verifica se algum registro foi encontrado
    if (resultado.length > 0)
    {
      // Retorna os dados encontrados em JSON
      res.status(200).json(resultado);
      console.log(resultado);
    }

    else
    {
      // Consulta feita, mas sem dados encontrados
      res.status(204).send("Nenhum resultado encontrado!")
    }
  });
}




// KPI: total de quizzes feitos
function kpiQuizzesFeitos(req, res)
{
  var fkUsuario = req.params.fkUsuario;

  // conta quizzes do usuário
  dashboardModel.kpiQuizzesFeitos(fkUsuario).then(function (resultado)
  {
    // Verifica se algum registro foi encontrado
    if (resultado.length > 0)
      {
      // Retorna os dados encontrados em JSON
      res.status(200).json(resultado);
      console.log(resultado);
    }

    else
    {
      // Consulta feita, mas sem dados encontrados
      res.status(204).send("Nenhum resultado encontrado!")
    }
  });
}




// Gráfico: evolução dos quizzes
function graficoEvolucaoQuiz(req, res)
{
  const limite_linhas = 10;

  var fkUsuario = req.params.fkUsuario;

  // busca 10 últimos quizzes
  dashboardModel.graficoEvolucaoQuiz(fkUsuario, limite_linhas).then(function (resultado)
  {
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
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}




// Gráfico: média por objetivo
function graficoObjetivos(req, res)
{
  dashboardModel.graficoObjetivos().then(function (resultado)
  {
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
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}




// Gráfico: média por gênero musical
function graficoGeneroMusical(req, res)
{
  dashboardModel.graficoGeneroMusical().then(function (resultado)
  {
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
    console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}




// Exportando as funções do controller
// Outros arquivos podem usar essas funções
module.exports = {
  kpiPontuacaoAtual,
  kpiEvolucao,
  kpiRanking,
  kpiQuizzesFeitos,

  graficoEvolucaoQuiz,
  graficoObjetivos,
  graficoGeneroMusical
};
