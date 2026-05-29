var database = require("../database/config");

function cadastrarPreferencias(genero_musical, objetivo_pilates, tempo_treino, fk_usuario) {
  var instrucaoSql = `INSERT INTO preferencia_usuario (genero_musical, objetivo_pilates, tempo_treino, fk_usuario) VALUES ('${genero_musical}', '${objetivo_pilates}', '${tempo_treino}', '${fk_usuario}')`;

  return database.executar(instrucaoSql);
}

function visualizarPreferencias(fkUsuario) {
  var instrucaoSql = `
  SELECT
  genero_musical,
  objetivo_pilates,
  TIMESTAMPDIFF(MONTH, tempo_treino, NOW()) AS tempo_treino
  FROM preferencia_usuario
  WHERE fk_usuario = ${fkUsuario};
  `;

  return database.executar(instrucaoSql);
}

module.exports =
{
    cadastrarPreferencias,
    visualizarPreferencias
};
