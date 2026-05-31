// Importando o arquivo de configuração do banco de dados
// Esse arquivo contém a função responsável por executar comandos SQL
var database = require("../database/config");



// Função que retorna a pontuação do ultimo quiz feito pelo usuário
function kpiPontuacaoAtual(fkUsuario)
{
  var instrucaoSql = `
  SELECT pontuacao_quiz
  FROM resultado_quiz
  WHERE fk_usuario = ${fkUsuario}
  ORDER BY id_quiz
  DESC LIMIT 1;
  `;

  // ORDER BY id_quiz DESC -> ordena os quizzes do mais recente para o mais antigo
  // LIMIT 1 -> retorna o último quiz realizado
  
  // Exibe a query montada no terminal
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  // Executa a query no banco e retorna o resultado
  return database.executar(instrucaoSql);
}




// Função que calcula a evolução do usuário comparando a 1º e última tentativa feita
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

  // 1º select retorna a pontuação do quiz mais recente que o user fez
  // 2º select retorna a pontuação do 1º quiz que o user fez
  // select principal faz o ultimo quiz - primeiro quiz

  // Exibe a query montada no terminal
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  // Executa a query no banco e retorna o resultado
  return database.executar(instrucaoSql);
}




// Função que calcula a posição do usuário em relação aos outros users
function kpiRanking(fkUsuario)
{

  /*
  primeiro eu pego a pontuação do último quiz do usuário
  
  Depois verifico quantos usuários tem a pontuação maior do que essa,
  considerando apenas a ultima tentativa de cada um
  
  Depois somo 1 ao resultado para ter a posição no ranking
  */

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

  /*
    SELECT COUNT(*) + 1:
    
    Conta quantos usuários tem a pontuação maior que o user atual

    O +1 é usado porque a posição começa em 1

    exemplo: se tem 3 usuários com pontuação maior, a posição sera 4
        


    SELECT MAX(id_quiz)
    FROM resultado_quiz
    GROUP BY fk_usuario

    Retorna o ultimo quiz feito por cada user

    ---> Esse ranking considera apenas a ultima tentativa de cada usuário

  
    
    pontuacao_quiz > ....

    Compara a pontuação dos demais usuários com a pontuação do usuário atual

    Apenas pontuações maiores são contabilizadas


    
    SELECT pontuacao_quiz
    FROM resultado_quiz
    WHERE fk_usuario = ${fkUsuario}
    ORDER BY id_quiz DESC
    LIMIT 1

    Busca a pontuação do último quiz feito pelo usuário logado

    ORDER BY id_quiz DESC -> ordena do mais recente pro mais antigo

    LIMIT 1 -> retorna apenas o quiz mais recente

    
    
    exemplo:

    João = 10
    Maria = 9
    Pedro = 8
    Ana = 7

    User logado no site: pedro com pontuação 8

    Usuários com pontuação maior: João e Maria

    COUNT(*) = 2

    Resultado:

    posicao = 2 + 1
    posicao = 3

    Pedro ficou em 3º lugar
  */


  // Exibe a query montada no terminal
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  // Executa a query no banco e retorna o resultado
  return database.executar(instrucaoSql);
}




// Função que conta quantos quizzes foram feito pelo usuario
function kpiQuizzesFeitos(fkUsuario)
{
  var instrucaoSql = `
  SELECT
  COUNT(id_quiz) AS qtd_quiz
  FROM resultado_quiz
  WHERE fk_usuario = ${fkUsuario};
  `;

  // Exibe a query montada no terminal
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  // Executa a query no banco e retorna o resultado
  return database.executar(instrucaoSql);
}




// Função que retorna as 10 ultimas pontuações no quiz do usuario
function graficoEvolucaoQuiz(fkUsuario, limite_linhas) {

    var instrucaoSql = `
    SELECT 
    pontuacao_quiz
    FROM resultado_quiz
    WHERE fk_usuario = ${fkUsuario}
    ORDER BY id_quiz DESC LIMIT ${limite_linhas};
    `;

    // ORDER BY id_quiz DESC -> Retorna os quizzes mais recentes primeiro

    // Exibe a query montada no terminal
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a query no banco e retorna o resultado
    return database.executar(instrucaoSql);
}




// Função que calcula a média das pontuações agrupadas por objetivo do pilates
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

    // AVG(pontuacao_quiz) -> calcula a média das pontuações
    // GROUP BY objetivo_pilates -> agrupa usuarios que tem o mesmo objetivo
    // TRUNCATE 0 -> remove as casas decimais da média pra ficar mais facil de ver
    
    // Exibe a query montada no terminal
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a query no banco e retorna o resultado
    return database.executar(instrucaoSql);
}




// Função que calcula a média das pontuações agrupadas por gênero musical
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

    // AVG(pontuacao_quiz) -> calcula a média das pontuações
    // GROUP BY genero_musical -> agrupa usuarios que tem o mesmo genero musical
    // TRUNCATE 0 -> remove as casas decimais da média pra ficar mais facil de ver
    
    // Exibe a query montada no terminal
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a query no banco e retorna o resultado
    return database.executar(instrucaoSql);
}




// Exportando as funções do model
// Outros arquivos podem usar essas funções
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