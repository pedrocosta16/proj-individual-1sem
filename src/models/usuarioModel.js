var database = require("../database/config");

function autenticarUsuario(email, senha)
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    
    var instrucaoSql = `
        SELECT id_usuario as id,
        nome_usuario as nome,
        email_usuario as email
        FROM usuario
        WHERE email_usuario = '${email}' AND senha_usuario = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUsuario(nome, dt_nasc, email, senha)
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome_usuario, dt_nasc_usuario, email_usuario, senha_usuario) VALUES
        ('${nome}', '${dt_nasc}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function visualizarUsuario(fkUsuario)
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >>Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ")

    var instrucaoSql = `
        SELECT
        nome_usuario,
        DATE_FORMAT(dt_nasc_usuario, '%d/%m/%Y') AS dt_nasc_usuario,
        email_usuario,
        senha_usuario
        FROM usuario
        WHERE id_usuario = ${fkUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarUsuario(nome, dt_nasc, email, senha, fkUsuario)
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >>Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ")

    var instrucaoSql = `
        UPDATE usuario SET
        nome_usuario = '${nome}',
        dt_nasc_usuario = '${dt_nasc}',
        email_usuario = '${email}',
        senha_usuario = '${senha}'
        WHERE id_usuario = ${fkUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticarUsuario,
    cadastrarUsuario,
    visualizarUsuario,
    atualizarUsuario
};