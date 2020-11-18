 /*
    API de mock* criada no site: https://mockapi.io/

    *mock = Ao pé da letra significa imitação, é um termo usado para quando 
    criamos algo falso ou incompleto apenas para simular uma situação 
    e fazer testes, por exemplo criar uma lista de produtos chumbada no 
    código para poder vizualizar o estilo da listagem e trabalhar nele 
    enquanto ainda não tem essa funcionalidade na API.

    Uma variável constante que será usada apenas para guardar um valor 
    que estaria chumbado no código e atribuir significado a ele é chamada de constante
    e é geralmente declarada em letras maiúsculas com palavras separadas por '_' 
*/
const API_URL = 'https://5fb083ba7edddb001646854e.mockapi.io';


/*
    XMLHttpRequest - Objeto que fornece funcionalidade ao cliente (site) para 
    transferir dados entre um cliente e um servidor. Ele fornece uma maneira fácil 
    de recuperar dados de uma URL sem ter que fazer uma atualização de página inteira. 
    Isso permite que uma página da Web atualize apenas uma parte do conteúdo sem interromper 
    o que o usuário esteja fazendo. 
    
    O nome desse conceito é AJAX (acrônimo para JavaScript assíncrono + XML). Termo utilizado 
    para descrever a utilização de chamadas assíncronas e atualizações dinâmicas na DOM para fazer 
    rapidamente atualizações incrementais para a interface do usuário sem recarregar a página inteira. 
    Isso torna a aplicação mais rápida e sensível às ações do usuário.

    Embora a letra X em AJAX corresponda ao XML, atualmente o JSON é mais utilizado que o XML devido às suas vantagens,
    como ser mais leve e ser parte do JavaScript.
*/

/* 
    Serviço para abstrair a comunicação com a API. Serviços abstraem funcionalidades para impedir 
    repetição de código e separar as responsabilidades, para que cada função continue tendo apenas 
    um próposito e cada arquivo JS tenha apenas um contexto, o produto.js não deve ter 
    que se preocupar com requisições HTTP, apenas com coisas específicas de produtos.  
*/
function chamarAPI (caminho, metodo, onload, dados = null) {
    /* Cria um novo objeto de requisição */
    const reqHttp = new XMLHttpRequest();

    /* Recebe a função a ser executada caso a chamada termine com sucesso */
    reqHttp.onload = function () {
        /* Converte o retorno em JSON para um objeto e passa como parâmetro para o callback onload */
        onload(JSON.parse(reqHttp.responseText));
    };

    /* Recebe a função a ser executada caso ocorra um erro */
    reqHttp.onerror = function () {
        /* Dispara um alerta com o retono da chamada */
        alert(reqHttp.responseText);
    };
    
    /* Inicia a requisição, recebe o método e a URL como parâmetros */
    reqHttp.open(metodo, API_URL + caminho);

    /* 
        Aplica headers (cabeçalhos) a requisição.

        Os cabeçalhos HTTP permitem que o cliente e o servidor passem informações adicionais com a solicitação ou a resposta HTTP. 
        Cabeçalhos podem ser classificados de acordo com os seus contextos:

            Cabeçalho genérico: Cabeçalhos que podem ser usados tanto em solicitações quanto em respostas, porém sem relação com os dados 
            eventualmente transmitidos no corpo da mensagem.

            Cabeçalho de solicitação: Cabeçalhos contendo mais informação sobre o recurso a ser obtido ou sobre o próprio cliente.

            Cabeçalho de resposta: Cabeçalhos contendo informação adicional sobre a solicitação, como a sua localização ou sobre o servidor.

            Cabeçalho de entidade: Cabeçalhos contendo mais informação sobre o conteúdo da entidade, como o tamanho do conteúdo ou o 
            seu MIME-type (tipo do dado a ser trafegado, nesse caso JSON).
        
        De uma olhada nas opções aqui: 
        https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers
    */
    reqHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    /* Envia a requisição, podendo receber o corpo da requisição como parâmetro */
    reqHttp.send(dados ? JSON.stringify(dados) : null);
}