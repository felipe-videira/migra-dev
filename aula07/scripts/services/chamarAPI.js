 /*
    API de mock* criada no site: https://mockapi.io/

    *mock = Ao pé da letra significa imitação, é um termo usado para quando 
    criamos algo falso ou incompleto apenas para simular uma situação 
    e fazer testes, por exemplo criar uma lista de produtos chumbada no 
    código para poder vizualizar o estilo da listagem e trabalhar nele 
    enquanto ainda não tem essa funcionalidade na API.
*/
const API_URL = 'https://5fb083ba7edddb001646854e.mockapi.io';


/*
    XMLHttpRequest - Objeto que fornece funcionalidade ao cliente (site) para 
    transferir dados entre um cliente e um servidor. Ele fornece uma maneira fácil 
    de recuperar dados de um URL sem ter que fazer uma atualização de página inteira. 
    Isso permite que uma página da Web atualize apenas uma parte do conteúdo sem interromper 
    o que o usuário esteja fazendo. 
    
    O nome desse conceito é AJAX (acrônimo para JavaScript assíncrono + XML). Termo utilizado 
    para descrever a utilização de chamadas assíncronas e atualizações dinâmicas na DOM para fazer 
    rapidamente atualizações incrementais para a interface do usuário sem recarregar a página inteira 
    do navegador. Isso torna a aplicação mais rápida e sensível às ações do usuário.

    Embora a letra X em AJAX corresponda ao XML, atualmente o JSON é mais utilizado que o XML devido às suas vantagens,
    como ser mais leve e ser parte do JavaScript.

    https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Methods 
    https://www.w3schools.com/xml/tryit.asp?filename=tryxml_httprequest_ie
*/
function chamarAPI (caminho, metodo, onload, dados = null) {
    const reqHttp = new XMLHttpRequest();

    reqHttp.onload = function () {
        onload(JSON.parse(reqHttp.responseText));
    };

    reqHttp.onerror = function () {
        alert(reqHttp.responseText);
    };
    
    /* Inicia a requisição */
    reqHttp.open(metodo, API_URL + caminho);

    reqHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    reqHttp.send(dados ? JSON.stringify(dados) : null);
}