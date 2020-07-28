
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
    Após encontrar o elemento desejado, você pode alterar suas propriedas como você faria em uma classe de JS. 
    Por exemplo alterar o texto de um parágrafo:  
*/
const firstParagraph = document.querySelector('p');
const text = "mudou via JS outra <strong>linha<strong>";

/* retorna apenas o texto */
console.log(firstParagraph.innerText);

/* retorna o HTML inteiro */
console.log(firstParagraph.innerHTML);


/* muda o texto */
firstParagraph.innerText = text;

/* muda o HTML inteiro */
firstParagraph.innerHTML = text;

/*
    Você poderia alterar e consultar varias coisas no elemento. De uma olhada aqui:
    https://developer.mozilla.org/pt-BR/docs/Web/API/Element
*/




/* Cria um elemento 'img' dinamicamente. */
const image = document.createElement('img');

/* Altera o atributo 'src' para o caminho da imagem desejada, relativo ao caminho do arquivo 'index.html' */
image.src = 'images/img01.jpg';

image.width = '250px';
image.height = '250px';

/* Adiciona o novo elemento como filho do 'body' */
document.documentElement.appendChild(image);
        /* body */      /* 'acrescenta', ou seja coloca no final, após o ultimo elemento presente. */

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
}

Element.prototype.$ = function (selector) {
    return $(selector, this);
};

Element.prototype.$$ = function (selector, returnNodeList = false) {
    return $$(selector, this, returnNodeList);
};