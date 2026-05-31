// Importando o arquivo de configuração do banco de dados
// Esse arquivo contém a função responsável por executar comandos SQL
var database = require("../database/config");


// Função que cadastra as preferências do usuário
function cadastrarPreferencias(genero_musical, objetivo_pilates, tempo_treino, fk_usuario)
{
  // INSERT que grava os dados na tabela preferencia_usuario
  var instrucaoSql = `
  INSERT INTO preferencia_usuario (genero_musical, objetivo_pilates, tempo_treino, fk_usuario) VALUES
  ('${genero_musical}', '${objetivo_pilates}', '${tempo_treino}', '${fk_usuario}')`;

  // Exibe a query montada no terminal
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  // Executa a query no banco e retorna o resultado
  return database.executar(instrucaoSql);
}




// Função que busca as preferências do usuario
function visualizarPreferencias(fkUsuario)
{
  var instrucaoSql = `
  SELECT
  genero_musical,
  objetivo_pilates,
  TIMESTAMPDIFF(MONTH, tempo_treino, NOW()) AS tempo_treino_meses,
  DATE_FORMAT(tempo_treino, '%d/%m/%Y') AS tempo_treino
  FROM preferencia_usuario
  WHERE fk_usuario = ${fkUsuario};
  `;

  // TIMESTAMPDIFF pra calcular a diferença entre hoje e o tempo_treino cadastrado, retornando em meses
  // DATE_FORMAT utilizado para formatar a data no formato DD/MM/AAAA

  // Exibe a query montada no terminal
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  // Executa a query no banco e retorna o resultado
  return database.executar(instrucaoSql);
}




// Função que atualiza as preferências já cadastradas pelo usuario
function atualizarPreferencias(genero_musical, objetivo_pilates, tempo_treino, fkUsuario)
{
  var instrucaoSql = `
  UPDATE preferencia_usuario SET
  genero_musical = '${genero_musical}',
  objetivo_pilates = '${objetivo_pilates}',
  tempo_treino = '${tempo_treino}'
  WHERE fk_usuario = ${fkUsuario};
  `;

  // Exibe a query montada no terminal
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  // Executa a query no banco e retorna o resultado
  return database.executar(instrucaoSql);
}




// Exportando as funções do model
// Outros arquivos podem usar essas funções
module.exports =
{
  cadastrarPreferencias,
  visualizarPreferencias,
  atualizarPreferencias
};
