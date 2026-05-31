// Importando o usuarioModel
var usuarioModel = require("../models/usuarioModel");


// Função que autentica um usuário
function autenticarUsuario(req, res)
{
    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario

    // Recuperando os dados enviados pelo front-end
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Validando se os dados foram recebidos corretamente
    if (email == undefined)
    {
        res.status(400).send("Seu email está undefined!");
    }
    
    else if (senha == undefined)
    {
        res.status(400).send("Sua senha está indefinida!");
    }
    
    else
    {
        // Chama a função do model que consulta o banco de dados
        usuarioModel.autenticarUsuario(email, senha)
            // then() é executado quando a consulta é feita com sucesso
            .then(
                // then()

                // O método database.executar() do model retorna uma Promise

                // Promises são utilizadas para lidar com operações que podem demorar
                // pra serem concluídas, como as consultas do banco
                // O código dentro do then() só será executado quando a consulta terminar com sucesso.
                
                // Contém os dados retornados pela consulta SQL
                function (resultadoAutenticar)
                {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`); // qtd de registros encontrados

                    // JSON.stringify() -> transforma um objeto JSON em texto pra facilitar a visualização no terminal

                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    // Se encontrou um usuário
                    if (resultadoAutenticar.length == 1)
                    {
                        console.log(resultadoAutenticar);

                        // Retorna os dados para o front-end no formato JSON
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            objetivo: resultadoAutenticar[0].objetivo,
                            genero: resultadoAutenticar[0].genero
                        });

                    }
                    
                    // Nenhum usuário encontrado
                    else if (resultadoAutenticar.length == 0)
                    {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    }
                    
                    else
                    {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }

            // catch() é executado quando falha na execução da promise
            ).catch(
                function (erro)
                {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    // FLUXO:
    // front envia email e senha
    // controller recebe e valida os dados e chama o model
    // model consulta o banco
    // resultado volta pro controller
    // controller envia resultado pro front
}




// Função que cadastra um novo user
function cadastrarUsuario(req, res)
{
    // Recuperando os dados enviados pelo form
    var nome = req.body.nomeServer;
    var dtNasc = req.body.dtNascServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Validando pra que nenhum dado venha vazio
    if (nome == undefined)
    {
        res.status(400).send("Seu nome está undefined!");
    }

    else if (dtNasc == undefined)
    {
        res.status(400).send("Sua data de nascimento está undefined!");
    }
    
    else if (email == undefined)
    {
        res.status(400).send("Seu email está undefined!");
    }
    
    else if (senha == undefined)
    {
        res.status(400).send("Sua senha está undefined!");
    }
    
    else
    {
        // Chama a função do model que executa o INSERT no banco
        usuarioModel.cadastrarUsuario(nome, dtNasc, email, senha)
            // Executado quando o cadastro ocorre com sucesso
            .then(
                function (resultado)
                {
                    // Retorna o resultado para o front-end em formato JSON
                    res.json(resultado);
                }
            // Executado quando tem algum erro durante o cadastro
            ).catch(
                function (erro)
                {
                    console.log(erro); // exibe erro no terminal
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );

                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    // FLUXO:
    // front envia os dados
    // controller recebe e valida os dados
    // model faz INSERT e banco salva o user
    // resultado volta pro controller
    // controller envia resultado pro front
}




// Função que busca os dados de um user
function visualizarUsuario(req, res)
{
    var fkUsuario = req.params.fkUsuario;

    // Chama a função do model que executa o SELECT no banco
    usuarioModel.visualizarUsuario(fkUsuario)
    .then(function (resultado)
    {
        // Verifica se algum registro foi encontrado
        if (resultado.length > 0)
        {
            // Retorna os dados encontrados em JSON
            res.status(200).json(resultado);
            console.log(resultado);
        }
        
        else
        {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    
    // Executado caso erro na consulta
    }).catch(function (erro)
    {
        console.log(erro);
        console.log("Houve um erro ao buscar as preferências: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

    // FLUXO:
    // front solicita os dados
    // controller recebe fkUsuario
    // model faz SELECT e banco retorna dados
    // controller verifica se encontrou registros
    // controller envia resultado pro front
}




// Função que atualiza os dados do user ja existente
function atualizarUsuario(req, res)
{
    // Identifica qual usuário terá seus dados atualizados no banco
    var fk_usuario = req.body.fkUsuarioServer;

    // Recupera os novos dados enviados pelo form
    var nome = req.body.nomeServer;
    var dtNasc = req.body.dtNascServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined)
    {
        res.status(400).send("Seu nome está undefined!");
    }

    else if (dtNasc == undefined)
    {
        res.status(400).send("Sua data de nascimento está undefined!");
    }
    
    else if (email == undefined)
    {
        res.status(400).send("Seu email está undefined!");
    }
    
    else if (senha == undefined)
    {
        res.status(400).send("Sua senha está undefined!");
    }
    
    else
    {
        // Chama a função do model que executa o UPDATE no banco de dados
        usuarioModel.atualizarUsuario(nome, dtNasc, email, senha, fk_usuario)
            // Executado quando a atualização ocorre com sucesso
            .then(
                function (resultado)
                {
                    // Retorna o resultado para o front-end em JSON
                    res.json(resultado);
                }
            // Executado caso ocorra algum erro na atualização
            ).catch(
                function (erro)
                {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização de dados! Erro: ",
                        erro.sqlMessage
                    );

                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    // FLUXO:
    // user altera os dados
    // front envia os novos dados
    // controller recebe e valida os dados
    // controller chama o model
    // model faz UPDATE e banco atualiza dados
    // resultado volta pro controller
    // controller envia resultado pro front
}




// Exportando as funções do controller
// Outros arquivos podem usar essas funções
module.exports =
{
    autenticarUsuario,
    cadastrarUsuario,
    visualizarUsuario,
    atualizarUsuario
}