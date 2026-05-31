function validarSessao()
{
    console.log("SESSION INICIO:", sessionStorage);

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");
    var b_email = document.getElementById("b_email");

    if (email != null && nome != null)
    {
        b_usuario.innerHTML = nome;
        b_email.innerHTML = email;
    }
    
    else
    {
        window.location = "login.html";
    }
}

function limparSessao()
{
    sessionStorage.clear();
    window.location = "index.html";
}

function aguardar()
{
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto)
{
    if (texto)
    {
        alert(texto);
    }
}

function verSenha()
{
    let senha = document.getElementById('ipt_senha_user');
    let conf_senha = document.getElementById('ipt_conf_senha_user'); // quando houver na página

    if (senha.type == 'password')
    {
        document.getElementById('olho').src = `assets/icons/visible.png`;

        senha.type = 'text';
        conf_senha.type = 'text';
    }

    else
    {
        document.getElementById('olho').src = `assets/icons/not-visible.png`;

        senha.type = 'password';
        conf_senha.type = 'password';
    }
}