
/*
    DOM (Document Object Model) - É a representação da hierarquia dos
    elementos na página (tags) em forma de objetos de Javascript, para que possamos consular e 
    alterar seus valores e atributos, e criar novos elementos dinamicamente.

    document - Objeto que contém propriedades e funções a respeito do documento (página HTML)
*/

/*
    document.querySelector(seletores) - Seleciona um elemento usando seletores de CSS (id, classe, nome da tag), 
    pode ser mais de um separado por virgulas. Retorna o primeiro elemento que encontrar com os seletores especificados.

    document.querySelectorAll(seletores) - Mesma coisa, porém retornar todos os elementos encontrados.
*

/* Selecionaum  elemento pelo nome no atributo id */
console.log(document.querySelector('#nomeDoId'));

/* Seleciona um elemento pelo nome no atributo classe, */
console.log(document.querySelector('.nome-da-classe'));

/* Seleciona um elemento pelo nome da tag HTML */
console.log(document.querySelector('p'));

/* Seleciona todos os elementos que usam essa classe */
console.log(document.querySelectorAll('.nome-da-classe'));

/* Seleciona um elemento do tipo 'button' que use a classe 'nome-da-classe' */
console.log(document.querySelector('button.nome-da-classe'));

/* Seleciona um elemento do tipo 'p' que seja um filho (dentro da tag dele) de uma 'button' */
console.log(document.querySelector('button p'));

/* Seleciona todos os elementos do tipo 'button' e 'div' */
console.log(document.querySelectorAll('button, div'));

/* Seleciona um elemento 'a' com o atributo 'target' que contenha o valor '_blank' */
console.log(document.querySelector('a[target="_blank"]'));


/* 
    Você também pode selecionar elementos filhos apos ter o elemento pai em mãos.
*/

/* 
    Seleciona o botão com o atributo 'type' com o valor 'submit'. É interessante usar 'const'
    porque não queremos que essa variável esteja aberta a mudanças, ela deve ser apenas o botão do tipo submit.
*/
const submitButton = document.querySelector('button[type="submit"]');
                                        

/* Seleciona o elemento 'p' filho (dentro) do botão */                                  
console.log(submitButton.querySelector('p'))       



/* 
    Após encontrar o elemento desejado, você pode alterar suas propriedas como você faria em uma classe de JS:  
*/
const firstParagraph = document.querySelector('p');
const text = "mudou via <strong>JS<strong>";

/* retorna apenas o texto */
console.log(firstParagraph.innerText);

/* retorna o HTML inteiro */
console.log(firstParagraph.innerHTML);


/* muda o texto */
firstParagraph.innerText = text;

/* muda o HTML inteiro */
firstParagraph.innerHTML = text;

/* acessa o estilo (CSS) do elemento e muda a cor (outras propriedades do estilo podem ser mudadas também) */
firstParagraph.style.color="#ff0000";

/* acessa o estilo (CSS) do elemento e muda o alinhamento do texto */
firstParagraph.style.textAlign = "center";

/* muda atributo 'id' para valor desejado (outros atributos em outras tags poderiam ser mudados da mesma forma: src, href e etc) */
firstParagraph.id = "textoDinamico"


/*
    Você poderia alterar e consultar varias coisas no elemento. De uma olhada aqui:
    https://developer.mozilla.org/pt-BR/docs/Web/API/Element
*/

/* Cria um elemento 'img' dinamicamente. */
const image = document.createElement('img');

/* Altera o atributo 'src' para o caminho da imagem desejada, relativo ao caminho do arquivo 'index.html' */
image.src = 'images/img01.jpg';

image.width = '250';
image.height = '250';
image.style.margin = "20px"

/* Adiciona o novo elemento como filho do 'body' */
document.documentElement.appendChild(image);
        /* body */      /* 'acrescenta', ou seja coloca no final, após o ultimo elemento presente. */


const divText = document.createElement('p');
divText.innerText = "Texto adicionado via js";

/* Adiciona o novo elemento como filho da div com o id = nomeDoId */
document.querySelector('#nomeDoId').appendChild(divText);



function onProductClick () {
    const [name, qtd] =  Array.prototype.slice.call(this.querySelectorAll('td'));

    document.forms['productForm']['fname'].value = name.innerText;
    document.forms['productForm']['fqtd'].value = qtd.innerText;
    document.forms['productForm']['fsubmit'].innerText = "Editar";
}

function createProduct (evt) {
    evt.preventDefault();

    const productName = document.forms['productForm']['fname'];
    const productQtd = document.forms['productForm']['fqtd'];

    const productTableBody = document
        .querySelector('#productTable')
        .querySelector('tbody');

    const newTr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.innerText = productName.value;
    
    const qtdTd = document.createElement('td');
    qtdTd.innerText = productQtd.value;

    newTr.appendChild(nameTd);
    newTr.appendChild(qtdTd);
    
    newTr.className = "product-table__item";

    newTr.id = productTableBody.childElementCount +1;

    newTr.addEventListener('click', onProductClick);

    productTableBody.appendChild(newTr);
}


/* 
    Como usamos muito esses metodos é interessante abstrair eles (reduzir a complexidade pegando só a parte importante) 
    para uma função nossa. Por convenção essas funções são nomeadas da seguinte forma:
*/
function $ (selector, el = null) {
    return (el || document).querySelector(selector);
}

function $$ (selector, el = null, returnNodeList = false) {
    const nodeList = (el || document).querySelectorAll(selector);

    return returnNodeList ? nodeList : Array.prototype.slice.call(nodeList);
                                        /*  usado normalmente para 'cortar' um array, nesse contexto esta sendo usado 
                                            para converter uma variavel 'estilo array' (geralmente chamada de array-like)
                                            em um array.
                                        */
}

/*
    Na linha abaixo a classe 'Element', disponibilizada pelo navegador, esta tendo o seu 'prototype' (protótipo) 
    acessado para acrescentar um novo metodo a ela, o protótipo seria a especificação original da classe, 
    em que nesse momento esta sendo modificada para todos que a usem na janela aberta*
*/
Element.prototype.$ = function (selector) {
    return $(selector, this);
};

Element.prototype.$$ = function (selector, returnNodeList = false) {
    return $$(selector, this, returnNodeList);
};

/* 
    *Todas as variaveis e modificações em 'prototype' são mantidas no estado do navegador enquanto a janela (aba) do navegador 
    estiver aberta, apos fechada tudo é pertido e retorna ao estado original.
*/