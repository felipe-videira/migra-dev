/*
    const elemento = document.querySelector(seletor) = Busca e retorna um element HMTL, pelo seletor (id, classe, nome da tag) 
    passado como parametro, em forma de um objeto que pode ser usado para manipular a DOM.

    DOM (Document Object Model) - É a representação da hierarquia dos
    elementos na página (tags) em forma de objetos de Javascript, para que possamos consultar e 
    alterar seus valores e atributos, e criar novos elementos dinamicamente.

    document - Objeto que contém propriedades e funções a respeito do documento (página HTML)
    
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

    const formValido = validarFormProduto();

    if (formValido) {
        const produto = {
            nome: document.forms['formProduto']['pNome'].value,
            descricao: document.forms['formProduto']['pDescricao'].value
        }

        salvarProduto(produto);
    }
}

/* Valida o formulário de produtos */
function validarFormProduto() {
    const descricao = document.forms['formProduto']['pDescricao'].value;

    /*
        string.trim() = Limpa todos os espaços antes e depois da string: 

            "  texto de verdade     ".trim() === "texto de verdade"

        string.replace() = Substitui uma parte da string por outra:

            "abc".replace("a", "c") === "cbc"

        / +/g = Expressão regular (Regex), é usado para realizar condições simples e complexas em strings, muito util 
        para validações e formatações pois reduz drasticamente o código necessário, a estrutura mais basica dela seria:

            /busca/forma de busca

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
function montarListaProdutos (produtos) {
    for (let i = 0, len = produtos.length; i < len; i++) {
        const produto = new ItemListaProdutos(produtos[i]);

        document.querySelector('#listaProduto').appendChild(produto);
    }
}

/* 
    Componente do item da lista de produtos. 
    
    Um componente é um pedaço de código reutilizável, que serve a um propósito de forma genérica
    e desacoplada, podendo ser adicionado ou removido de um pai sem afetar o funcionamento do mesmo ou de seus outros componentes, 
    e no objetivo de ser genérico pode ter seu resultado alterado pelos valores passados para ele. 

    Em front end o termo componente geralmente é usado para se referir a componentes de interface, que são classes ou funções 
    com nomes com letra maiúscula e que são invocadas com a palavra-chave 'new', que retonam um elemento HMTL para ser adicionado ao documento.
    
    Neste caso ItemListaProdutos é um componente de interface que cria a visualização de um item da lista de produtos, 
    recebe como parâmetro os dados do produto, e seu resultado final é variavél pelo nome do produto.
*/
function ItemListaProdutos (produto) {
    const item = document.createElement('p');

    item.innerText = produto.nome;
    item.classList.add("itemProduto");

    return item;
}
