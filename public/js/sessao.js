function validarSessao()
{
    console.log("SESSION INICIO:", sessionStorage);

    // Busca dados do usuário logado salvos no sessionStorage
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    // Elementos do header onde o nome e email do user são exibidos
    var b_usuario = document.getElementById("b_usuario");
    var b_email = document.getElementById("b_email");

    // Se houver sessão ativa, exibe os dados do usuário na tela
    if (email != null && nome != null)
    {
        b_usuario.innerHTML = nome;
        b_email.innerHTML = email;
    }
    
    // Sem sessão ativa: redireciona para o login
    else
    {
        window.location = "login.html";
    }
}

function limparSessao()
{
    // Apaga todos os dados da sessão e redireciona para a página inicial
    sessionStorage.clear();
    window.location = "index.html";
}

function verSenha()
{
    // Campos de senha
    let senha = document.getElementById('ipt_senha_user');
    let conf_senha = document.getElementById('ipt_conf_senha_user'); // quando houver na página

    // Se estiver oculta: troca ícone e revela os campos de senha
    if (senha.type == 'password')
    {
        document.getElementById('olho').src = `assets/icons/visible.png`;

        senha.type = 'text';
        conf_senha.type = 'text';
    }

    // Se estiver visível: troca ícone e oculta novamente os campos de senha
    else
    {
        document.getElementById('olho').src = `assets/icons/not-visible.png`;

        senha.type = 'password';
        conf_senha.type = 'password';
    }
}