//https://mockapi.io/

buscarProdutos();
document.getElementById("formProduto").addEventListener('submit', onSubmitFormProduto);

function buscarProdutos() {
    chamarAPI('/produtos', 'GET', function (res) {
        montarListaProduto(res);
    });
}

function montarListaProduto (produtos) {
    for (let i = 0, len = produtos.length; i < len; i++) {
        adicionarProduto(produtos[i]);
    }
}

function adicionarProduto (produto) {
    const paragrafo = document.createElement('p');

    paragrafo.innerText = produto.nome;
    paragrafo.classList.add("itemProduto");

    document.getElementById('listaProduto').appendChild(paragrafo);
}

function onSubmitFormProduto(event) {
    event.preventDefault();

    let formValido = validarFormProduto();

    if (formValido) {
        const produto = {
            nome: document.forms['formProduto']['pNome'].value,
            descricao: document.forms['formProduto']['pDescricao'].value
        }

        salvarProduto(produto);
    }
}

function validarFormProduto() {
    const descricao = document.forms['formProduto']['pDescricao'].value;

    /*
        string.trim() = limpa todos os espaços antes e depois da string: 
            "  texto de verdade     ".trim() === "texto de verdade"

        string.replace() = substitui uma parte da string por outra:
        "abc".replace("a", "c") === "cbc"

        / +/g = expressão regular (Regex), é usado para realizar condições simples e complexas em strings, muito util 
        para validações e formatações pois reduz drasticamente o codigo nescessario, a estrutura mais basica dela seria:

        /busca/forma-de-busca

        neste caso: 

        / +/g = selecionando espaços maiores que 1 (+) globalmente (g), ou seja em toda a string e não so o primeiro que encontrar, pois:

        .replace("  ", ""); === substitui apenas o primeiro espaço duplo
        .replace(/ +/g, "") === substitui todos os espaços que são maiores que um
    */
    const descricaoLimpa = descricao.trim().replace(/ +/g, "");

    /* se depois da limpeza não sobrar nada então o usuário não digitou nada */
    if (descricaoLimpa.length === 0) {
        return false;
    }

    return true;
}

function salvarProduto(produto) {
    chamarAPI('/produtos', 'POST', function (res) {
        adicionarProduto(res);
    }, produto);
}

function chamarAPI (caminho, metodo, onload, dados = null) {
    let reqHttp;

    if (window.XMLHttpRequest) {
        // para navegadores novos
        reqHttp = new XMLHttpRequest();
     } else {
        // para navegadores antigos
        reqHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    reqHttp.onload = function () {
        onload(JSON.parse(reqHttp.responseText));
    };

    reqHttp.onerror = function () {
        alert(reqHttp.responseText);
    };
    
    reqHttp.open(metodo, 'https://5fb083ba7edddb001646854e.mockapi.io' + caminho);
    reqHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    reqHttp.send(dados ? JSON.stringify(dados) : null);
}