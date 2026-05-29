var database = require("../database/config");

function kpiPontuacaoAtual(fkUsuario)
{
  var instrucaoSql = `
  SELECT pontuacao_quiz
  FROM resultado_quiz
  WHERE fk_usuario = ${fkUsuario}
  ORDER BY id_quiz
  DESC LIMIT 1;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function kpiEvolucao(fkUsuario)
{
  var instrucaoSql = `
  SELECT 
    (SELECT pontuacao_quiz 
     FROM resultado_quiz 
     WHERE fk_usuario = ${fkUsuario} 
     ORDER BY id_quiz DESC 
     LIMIT 1)
    -
    (SELECT pontuacao_quiz 
     FROM resultado_quiz 
     WHERE fk_usuario = ${fkUsuario} 
     ORDER BY id_quiz ASC 
     LIMIT 1)
  AS evolucao;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function kpiRanking(fkUsuario)
{
  var instrucaoSql = `
  SELECT COUNT(*) + 1 AS posicao
  FROM resultado_quiz
  WHERE id_quiz IN (
      SELECT MAX(id_quiz)
      FROM resultado_quiz
      GROUP BY fk_usuario 
  )
  AND pontuacao_quiz >
  (
      SELECT pontuacao_quiz
      FROM resultado_quiz
      WHERE fk_usuario = ${fkUsuario}
      ORDER BY id_quiz DESC
      LIMIT 1
  );
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function kpiQuizzesFeitos(fkUsuario)
{
  var instrucaoSql = `SELECT COUNT(id_quiz) AS qtd_quiz FROM resultado_quiz WHERE fk_usuario = ${fkUsuario};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function graficoEvolucaoQuiz(fkUsuario, limite_linhas) {

    var instrucaoSql = `
    SELECT 
    pontuacao_quiz
    FROM resultado_quiz
    WHERE fk_usuario = ${fkUsuario}
    ORDER BY id_quiz DESC LIMIT ${limite_linhas};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoObjetivos()
{
  var instrucaoSql = `
    SELECT
    p.objetivo_pilates,
    TRUNCATE(AVG(pontuacao_quiz), 0) as media_quiz
    FROM resultado_quiz r
    JOIN preferencia_usuario p ON r.fk_usuario = p.fk_usuario
    GROUP BY p.objetivo_pilates;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoGeneroMusical()
{
  var instrucaoSql = `
    SELECT
    p.genero_musical,
    TRUNCATE(AVG(pontuacao_quiz), 0) as media_quiz
    FROM resultado_quiz r
    JOIN preferencia_usuario p ON r.fk_usuario = p.fk_usuario
    GROUP BY p.genero_musical;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports =
{
  kpiPontuacaoAtual,
  kpiEvolucao,
  kpiRanking,
  kpiQuizzesFeitos,
  graficoEvolucaoQuiz,
  graficoObjetivos,
  graficoGeneroMusical
}