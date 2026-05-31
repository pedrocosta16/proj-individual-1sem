// Importando o quizModel
var quizModel = require("../models/quizModel");


// Função que busca os quizzes de um user
function visualizarQuizzes(req, res)
{
    var fkUsuario = req.params.fkUsuario;

    // Chama o model responsável por buscar os dados no banco
    quizModel.visualizarQuizzes(fkUsuario)
    
    // Executado quando a consulta é feita com sucesso
    .then(function (resultado)
    {
        // Verifica se encontrou algum registro
        if (resultado.length > 0)
        {
            res.status(200).json(resultado);
        }
        
        else
        {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    // Executado quando erro na consulta SQL
    }).catch(function (erro)
    {
        console.log(erro);
        console.log("Houve um erro ao buscar os quizzes: ", erro.sqlMessage);

        res.status(500).json(erro.sqlMessage);
    });
}




// Função que salva o resultado de um quiz
function realizarQuiz(req, res)
{
    // Recupera o id do user enviado pelo front-end
    var fkUsuario = req.body.fkUsuarioServer;

    // Recupera a pontuação obtida no quiz
    var pontuacao_quiz = req.body.pontuacaoQuizServer;

    if (pontuacao_quiz == undefined)
    {
        res.status(400).send("A pontuação está indefinida!");
    }

    else
    {
        // Chama o model que insere no banco
        quizModel.realizarQuiz(pontuacao_quiz, fkUsuario)
            .then(
                function (resultado)
                {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}




// Exportando as funções do controller
// Outros arquivos podem usar essas funções
module.exports = {
    visualizarQuizzes,
    realizarQuiz
}