var database = require("../database/config");
/*
function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}*/

function cadastrar(genero_musical, objetivo_pilates, tempo_treino, fk_usuario) {
  var instrucaoSql = `INSERT INTO preferencia_usuario (genero_musical, objetivo_pilates, tempo_treino, fk_usuario) VALUES ('${genero_musical}', '${objetivo_pilates}', '${tempo_treino}', '${fk_usuario}')`;

  return database.executar(instrucaoSql);
}

function visualizar(fkUsuario) {
  var instrucaoSql = `SELECT genero_musical, objetivo_pilates, tempo_treino FROM preferencia_usuario WHERE fk_usuario = ${fkUsuario};`;

  return database.executar(instrucaoSql);
}

module.exports =
{
    //buscarPorCnpj,
    //buscarPorId,
    cadastrar,
    visualizar
    //listar
};
