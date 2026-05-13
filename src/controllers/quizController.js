var quizModel = require("../models/quizModel");

function vizualizarQuizzes(req, res)
{
    var fkUsuario = req.params.fkUsuario;

    quizModel.vizualizarQuizzes(fkUsuario).then(function (resultado)
    {
        
        if (resultado.length > 0)
        {
            res.status(200).json(resultado);
        }
        
        else
        {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro)
    {
        console.log(erro);
        console.log("Houve um erro ao buscar os quizzes: ", erro.sqlMessage);

        res.status(500).json(erro.sqlMessage);
    });
}

/*
function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisardata_quiz(req, res)
{
    var data_quiz = req.params.data_quiz;

    quizModel.pesquisardata_quiz(data_quiz)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var pontuacao_quiz = req.body.pontuacao_quiz;
    var data_quiz = req.body.data_quiz;
    var idUsuario = req.params.idUsuario;

    if (pontuacao_quiz == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (data_quiz == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        quizModel.publicar(pontuacao_quiz, data_quiz, idUsuario)
            .then(
                function (resultado) {
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

function editar(req, res) {
    var novadata_quiz = req.body.data_quiz;
    var idAviso = req.params.idAviso;

    quizModel.editar(novadata_quiz, idAviso)
        .then(
            function (resultado) {
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

function deletar(req, res) {
    var idAviso = req.params.idAviso;

    quizModel.deletar(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
*/

module.exports = {
    //listar,
    //listarPorUsuario,
    //pesquisardata_quiz,
    vizualizarQuizzes,
    //editar,
    //deletar
}