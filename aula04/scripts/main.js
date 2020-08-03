/*
    inicializa variaveis no começo de tudo para não correr 
    o risco de acessar algo que não foi inicializado
*/
let coresDiv;
let coresInputQtd = 1;
let fotosDiv;
let medOutroInput;


function salvarProduto (event) {
    event.preventDefault();

    /* 
        retorna true se o formulario estiver valido e falso se não, 
        nesse caso executamos um return para parar a execução do metodo por aqui. 
        Essencialmente ele retorna 'undefined' dessa forma, mas não tem ninguem 
        esperando por esse retorno e se tivesse ele receberia um retorno considerado 
        negativo em JS, ou seja !salvarProduto() daria true, o que estaria conceitualmente correto ja 
        que o metodo não foi executado corretamente.
    */
    if (!validarForm()) return;

    /* 
        converte a lista de inputs em um array e filtra seus resultados pela 
        propriedade checked, se checked === true entra no novo array
        
        .filter() aceita uma função como parametro que realiza sua logica se um determinado item 
        deveria entrar no novo array e retorna true ou false, ele executara a função que você passar para 
        cada item do array e pelo retorno true ou false ira determinar o novo array, então .filter(funcao) 
        é mais ou menos igual a:
        
        const novoArray;
        for (let i = 0, len = seuArray.length; i < len; i++) {
            if (suaFuncao(seuArray[i], i)) {  <- voce pode acessar o indice no segundo parametro se precisar
                novoArray.push(seuArray[i]);
            }
        }
        return novoArray;
    */
    const pagamentosSelecionados = converterParaArray(document.forms['formProduto']['pPag']).filter(function (input) { return input.checked; });


    console.log(document.forms['formProduto']['pNome'].value);
    console.log(document.forms['formProduto']['pDescricao'].value);
    console.log(document.forms['formProduto']['pQtd'].value);
    console.log(document.forms['formProduto']['pMed'].value);
    console.log(pagamentosSelecionados);

    /*
        para acessar os arquivos em um input[type="file"] use a propriedade 'files'
    */
    console.log(document.forms['formProduto']['pFoto'].files);
    console.log(document.forms['formProduto']['pData'].value);
    console.log(document.forms['formProduto']['pTipo'].value);
}


function validarForm () {
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

function converterParaArray (arrayLike) {
    /*
        Acessa o prototype do objeto Array e invoca o metodo 'slice' substituindo o valor do this pelo parâmetro passado
        
        object.prototype = o prototipo do objeto ou seja a declaração original de sua classe, pode ser usado para acessar ou sobrescrever 
        suas propriedades originais
        
        function.call = invoca uma função podendo substituir o valor de seu 'this' pelo primeiro argumento, e 
        recebe o argumentos 'normais' nos espaços subsequentes

        Abaixo estamos usando o metodo 'slice' normamente presente em arrays para cortar o array de um indice a outro, para converter 
        um objeto array-like em um array, ou seja um objeto que tem as mesmas propriedades chave de um array, que seriam poder ser 
        acessado atraves de indices numericos (0, 1, 2) e ter uma propriedade chamada length, com o numero de itens presentes, como abaixo:

        objeto = {
            "0": "primeiro",
            "1": "segundo",
            length: 2
        }

        O objeto acima não é um array, mas poderiamos usa-lo como um, com execeção dos metodos imbutiudos de array 
        como o filter, map, slice e etc. Então para usarmos esses metodos e facilitar trabalhar com esses valores 
        convertemos ele para um array de verdade.
        
        Array.prototype.slice.call(arrayLike) é igual a:

        const arrayDeVerdade;
        for (let i = 0, len = arrayLike.length; i < len; i++ ) {
            arrayDeVerdade.push(arrayLike[i]);
        }
        return arrayDeVerdade;

        Porém temos que chama-lo dessa forma pois dentro do slice ele está mais ou menos desse jeito:

        const resultado;
        for (let i = 0, len = this.length; i < len; i++ ) {
            // logica para cortar o array (não estamos usando)
            resultado.push(this[i]); <- arrayParaCortar.slice(1), onde this é igual a arrayParaCortar
        }
        return resultado; // resultado final = um array novo

        com o .call substituimos o this pela a variavel arrayLike e nos aproveitamos da logica do 
        slice de sempre retornar um array novo para converter o array.
    */
    return Array.prototype.slice.call(arrayLike);

}

function addMedidaOnChanges () {
    const medOpcoes = document.forms['formProduto']['pMed'];

    for (let i = 0, len = medOpcoes.length; i < len; i++) {
        /*
            Adiciona um ouvinte de evento (Event Listener), uma função que 
            sera executa quando um determinado evento for executado, neste caso 
            adicionado um Event Listener a todos os radios de medidada 
            
            elemento.addEventListener('change', funcao) é igual a:

            <elemento onchange="funcao(event)" /> , o addEventListener passa o event para a função por padrão
        */
        medOpcoes[i].addEventListener('change', onChangeMedida);
    }
}

/*
    valida o novo valor de medida a cada mudança e 
    mostra e esconde o input da descrição de outro de acordo, e tambem retira sua validação 
    de obrigatorio, caso não tire o formulario iria validar esse campo e impedir o submit mesmo 
    ele não estando visivel
*/
function onChangeMedida (event) {
    if (event.target.value === "outro") {
        if (!medOutroInput) {
            /*
                Guarda o elemento criado para mais tarde, melhora perfomance e 
                evita o uso de codigo desnecessario, algo como: document.querySelector("#input-do-outros") 
                toda vez que esse metodo fosse chamado.
            */
            medOutroInput = document.createElement('input');
            medOutroInput.type = "text"
            medOutroInput.placeholder = "Por favor especifique..."
    
            document.querySelector('#pMedidaOutro').appendChild(medOutroInput);
        }
        medOutroInput.style.display = "block";
        medOutroInput.required = true;
    } else if (medOutroInput) {
        medOutroInput.style.display = "none";
        medOutroInput.required = false;
    }
}

function onFotoSelecionada (event) {
    /*
        em um input do tipo file a propriedade files e que armazena os arquivos
    */
    const files = event.target.files;

    if (files.length === 0) return;

    if (!fotosDiv) {
        fotosDiv = document.querySelector('#pFotos');
    } else {
        const imgsAntigas = fotosDiv.querySelectorAll('img');

        for (let i = 0, len = imgsAntigas.length; i < len; i++) {
            imgsAntigas[i].remove();
        }
    }  

    for (let i = 0, len = files.length; i < len; i++) {
        const img = document.createElement('img');

        img.className = "form-img"
        img.src = window.URL.createObjectURL(files[i]);

        fotosDiv.appendChild(img);
    }
}

/*
    Executa função apos todas as inicializações para evitar erros
*/
addMedidaOnChanges();
