document.getElementById('formulario').addEventListener('submit', pegarDados);

function pegarDados(e) {

    /** Input form data. */

    var nome = document.getElementById('nome').value;
    var cpf = document.getElementById('cpf').value;
    var tel = document.getElementById('tel').value;
    var email = document.getElementById('email').value;
    var cep = document.getElementById('cep').value;
    var rua = document.getElementById('rua').value;
    var num = document.getElementById('num').value;
    var bairro = document.getElementById('bairro').value;
    var cidade = document.getElementById('cidade').value;
    var uf = document.getElementById('uf').value;


    var mensagem = document.getElementById('mensagem').value;

    if (!nome && !cpf && !tel && !email && !mensagem && !cep && !rua && !num && !bairro && !cidade && !uf && !mensagem) {
        alert("Por favor, preencha os campos em branco!");
        return false;
    }

    dado = {
        nome: nome,
        cpf: cpf,
        tel: tel,
        email: email,
        rua: rua,
        cep: cep,
        num: num,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        mensagem: mensagem,
    }

    if (localStorage.getItem('dadosCadastrados') == null) {
        var dados = [];
        dados.push(dado);
        localStorage.setItem('dadosCadastrados', JSON.stringify(dados));
    } else {
        var dados = JSON.parse(localStorage.getItem('dadosCadastrados'));
        dados.push(dado);
        localStorage.setItem('dadosCadastrados', JSON.stringify(dados));
        alert("Dados cadastrados com sucesso! ");
    }

    document.getElementById('formulario').reset();

    mostrarCadastro();

    e.preventDefault();
}

/** Del data. */

function apagarCadastro(cpf) {
    var dados = JSON.parse(localStorage.getItem('dadosCadastrados'));

    for (var i = 0; i < dados.length; i++) {
        if (dados[i].cpf == cpf) {
            dados.splice(i, 1);
        }
        localStorage.setItem('dadosCadastrados', JSON.stringify(dados));
    }

    var r = confirm("Deseja mesmo excluir? ");
    if (r == true) {
        mostrarCadastro();
    } else {
        alert("Exclusão canelada!");
    }
}

/** List data. */
function mostrarCadastro() {
    var dados = JSON.parse(localStorage.getItem('dadosCadastrados'));
    var dadosResultado = document.getElementById('resultados');

    dadosResultado.innerHTML = '';
    for (var i = 0; i < dados.length; i++) {
        var nome = dados[i].nome;
        var cpf = dados[i].cpf;
        var tel = dados[i].tel;
        var email = dados[i].email;
        var rua = dados[i].rua;
        var num = dados[i].num;
        var bairro = dados[i].bairro;
        var cidade = dados[i].cidade;
        var uf = dados[i].uf;
        var cep = dados[i].cep;
        var mensagem = dados[i].mensagem;

        dadosResultado.innerHTML +=

            '<tr>' +
            '<td data-title="Nome">' + nome + '</td>' +
            '<td data-title="CPF">' + cpf + '</td>' +
            '<td data-title="Telefone">' + tel + '</td>' +
            '<td data-title="E-mail">' + email + '</td>' +
            '<td data-title="Endereço">' + rua + ', ' + num + " " + bairro + ' - ' + cidade + ' - ' + uf + ', ' + cep + '.' + '</td>' +
            '<td data-title="Mensagem">' + mensagem + '</td>' +
            '<td><button class="btn btn-danger" onclick="apagarCadastro(\'' + cpf + '\')">Excluir</button></td>' +
            '</tr>';

    }
}
