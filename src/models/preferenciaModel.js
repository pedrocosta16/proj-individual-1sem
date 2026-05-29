var database = require("../database/config");

function cadastrarPreferencias(genero_musical, objetivo_pilates, tempo_treino, fk_usuario)
{
  var instrucaoSql = `
  INSERT INTO preferencia_usuario (genero_musical, objetivo_pilates, tempo_treino, fk_usuario) VALUES
  ('${genero_musical}', '${objetivo_pilates}', '${tempo_treino}', '${fk_usuario}')`;

  return database.executar(instrucaoSql);
}

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

  return database.executar(instrucaoSql);
}

function atualizarPreferencias(genero_musical, objetivo_pilates, tempo_treino, fkUsuario)
{
  var instrucaoSql = `
  UPDATE preferencia_usuario SET
  genero_musical = '${genero_musical}',
  objetivo_pilates = '${objetivo_pilates}',
  tempo_treino = '${tempo_treino}'
  WHERE fk_usuario = ${fkUsuario};
  `;

  return database.executar(instrucaoSql);
}

module.exports =
{
  cadastrarPreferencias,
  visualizarPreferencias,
  atualizarPreferencias
};
