/*
    const elemento = document.querySelector(seletor) = Busca e retorna um element HMTL, pelo seletor (id, classe, nome da tag) 
    passado como parametro, em forma de um objeto que pode ser usado para manipular a DOM*.
    
    elemento.addEventListener(nome do evento, função) = Adiciona uma função "ouvinte" para algum evento que possa 
    ser disparado naquele elemento, quando for disparado a função será executada. 

    Abaixo a função "onSubmitFormProduto" está sendo atribuida para ser executada quando o formulario #formProduto emitir o evento de "submit",
    essa atribuição poderia ser feita no HTML também, mas é uma melhor pratica realizarmos isso no JS, para deixar o HTML limpo.
*/
// document.querySelector("#formProduto").addEventListener('submit', onSubmitFormProduto);

/*
    Busca e monta a lista de produtos ao entrar na tela. 
*/
buscarProdutos();


/* É recomendado que as funções sejam declaras na ordem de uso, para facilitar a leitura */
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
        string.trim() = Limpa todos os espaços antes e depois da string: 

            "  texto de verdade     ".trim() === "texto de verdade"

        string.replace() = Substitui uma parte da string por outra:

            "abc".replace("a", "c") === "cbc"

        / +/g = Expressão regular (Regex), é usado para realizar condições simples e complexas em strings, muito util 
        para validações e formatações pois reduz drasticamente o codigo nescessario, a estrutura mais basica dela seria:

            /busca/forma-de-busca

            Neste caso: 

            / +/g = Selecionando espaços maiores que 1 (+) globalmente (g), ou seja em toda a string e não so o primeiro que encontrar, pois:

            .replace("  ", "") = Substitui apenas o primeiro espaço duplo;
            .replace(/ +/g, "") = Substitui todos os espaços que são maiores que um.
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

    document.querySelector('#listaProduto').appendChild(paragrafo);
}




/*
    *DOM (Document Object Model) - É a representação da hierarquia dos
    elementos na página (tags) em forma de objetos de Javascript, para que possamos consultar e 
    alterar seus valores e atributos, e criar novos elementos dinamicamente.

    document - Objeto que contém propriedades e funções a respeito do documento (página HTML)
*/