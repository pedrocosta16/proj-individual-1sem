var database = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM aquario a WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(tempo_treino, fk_usuario) {
  
  var instrucaoSql = `INSERT INTO treino (tempo_treino, fk_usuario) VALUES (${tempo_treino}, ${fk_usuario})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  //buscarAquariosPorEmpresa,
  cadastrar
}
