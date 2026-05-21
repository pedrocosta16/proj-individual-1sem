var database = require("../database/config");

function pontuacaoAtual(fkUsuario)
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

function evolucao(fkUsuario)
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

function ranking(fkUsuario)
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

function quizzesFeitos(fkUsuario)
{
  var instrucaoSql = `SELECT COUNT(id_quiz) AS qtd_quiz FROM resultado_quiz WHERE fk_usuario = ${fkUsuario};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function graficoEvolucao(fkUsuario, limite_linhas) {

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


module.exports =
{
  pontuacaoAtual,
  evolucao,
  ranking,
  quizzesFeitos,
  graficoEvolucao
}