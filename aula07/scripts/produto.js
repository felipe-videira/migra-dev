/*
    const elemento = document.querySelector(seletor) = Busca e retorna um element HMTL, pelo seletor (id, classe, nome da tag) 
    passado como parametro, em forma de um objeto que pode ser usado para manipular a DOM.

    DOM (Document Object Model) - É a representação da hierarquia dos
    elementos na página (tags) em forma de objetos de Javascript, para que possamos consultar e 
    alterar seus valores e atributos, e criar novos elementos dinamicamente.

    document - Objeto que contém propriedades e funções a respeito do documento (página HTML)
*/


/*
    elemento.addEventListener(nome do evento, função) = Adiciona uma função "ouvinte" para algum evento que possa 
    ser disparado naquele elemento, quando for disparado a função será executada. 

    Abaixo a função "onSubmitFormProduto" está sendo atribuida para ser executada quando o formulario #formProduto emitir o evento de "submit",
    essa atribuição poderia ser feita no HTML também, mas é uma melhor pratica realizarmos isso no JS, para deixar o HTML limpo.
*/
document.querySelector("#formProduto").addEventListener('submit', onSubmitFormProduto);

/*
    Busca e monta a lista de produtos ao entrar na tela. 
*/
buscarProdutos();


/*
    Seleciona e armazena a lista de produto para usar depois 
*/
const listaProduto = document.querySelector('#listaProduto');


/* 
    É recomendado que as funções sejam declaras na ordem de uso, para facilitar a leitura, 
    e declaradas de forma que cada uma tenha apenas 1 propósito para facilitar a manutenção, 
    por isso as diferentes partes do processo são quebradas em pequenas funções  
*/

/* Realiza as ações necessárias após o evento de submit do formulário de produtos */
function onSubmitFormProduto(event) {
    /* 
        Acessa o objeto do evento e executa a função preventDefault que impede o comportamento padrão do evento de acontecer, 
        nesse caso executar as intruções passadas no action e method do formulário  
    */
    event.preventDefault();


    const produto = {
        nome: document.forms['formProduto']['nome'].value,
        descricao: document.forms['formProduto']['descricao'].value
    }

    salvarProduto(produto);
}


/* Envia os dados do produto para o servidor para serem persistidos */
function salvarProduto(produto) {
    /* 
        Chama o serviço chamarAPI passando como parâmetro a rota de produtos na API, 
        POST como método a ser usado, adicionarProdutoNaLista como a função a ser executada após concluir
        a chamada com sucesso e o por último os dados do produto 
    */
    chamarAPI('/produtos', 'POST', adicionarProdutoNaLista, produto);
}

/* Busca os produtos salvos no servidor */
function buscarProdutos() {
    chamarAPI('/produtos', 'GET', montarListaProdutos);
}

/* Monta a lista de produtos a partir de um array */
function montarListaProdutos(produtos) {
    for (let i = 0, len = produtos.length; i < len; i++) {
        adicionarProdutoNaLista(produtos[i]);
    }
}

/* Cria e adiciona um item na lista de produtos */
function adicionarProdutoNaLista(produto) {
    const item = document.createElement('p');

    item.innerText = produto.nome;
    item.classList.add("itemProduto");

    listaProduto.appendChild(item);
}
