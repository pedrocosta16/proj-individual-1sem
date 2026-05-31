// Importando o arquivo de configuração do banco de dados
// Esse arquivo contém a função responsável por executar comandos SQL
var database = require("../database/config");


// Função que busca os quizzes realizados por um usuário
function visualizarQuizzes(fkUsuario)
{
    // Select que busca todos os quizzes que o usuário ja fez
    var instrucaoSql = `
        SELECT
        DATE_FORMAT(data_quiz, '%d/%m/%Y') AS data_quiz,
        pontuacao_quiz
        FROM resultado_quiz
        WHERE fk_usuario = ${fkUsuario};
    `;

    // DATE_FORMAT utilizado para formatar a data no formato DD/MM/AAAA

    // Exibe a query montada no terminal
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a query no banco e retorna o resultado
    return database.executar(instrucaoSql);
}




// Função responsável por inserir um novo resultado de quiz
function realizarQuiz(pontuacao_quiz, fkUsuario)
{
    // Insert que grava o resultado do quiz feito e a data
    var instrucaoSql = `
        INSERT INTO resultado_quiz(pontuacao_quiz, data_quiz, fk_usuario) VALUES
        (${pontuacao_quiz}, NOW(), ${fkUsuario})
    `;

    // Exibe a query montada no terminal
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a query no banco e retorna o resultado
    return database.executar(instrucaoSql);
}




// Exportando as funções do model
// Outros arquivos podem usar essas funções
module.exports = {
    visualizarQuizzes,
    realizarQuiz
}
