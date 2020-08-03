let coresDiv;
let coresInputQtd = 1;
let fotosDiv;
let medOutroInput;

addMedidaOnChanges();


function salvarProduto (evento) {
    
}

function addCor () {
    if (!coresDiv) {
        coresDiv = document.querySelector('#pCores');
    }   
    coresDiv.appendChild(criarInputCor());
}

function criarInputCor () {
    const container = document.createElement('div');
    const input = document.createElement('input');
    const botaoRemover = document.createElement('button');

    input.type = "color";
    coresInputQtd++;
    input.id = input.name = "pCor" + coresInputQtd;

    botaoRemover.type = "button";
    botaoRemover.className = "form-botao-remover";
    botaoRemover.addEventListener('click', function () {
        container.remove();
    })  

    container.appendChild(input);
    container.appendChild(botaoRemover);

    return container;
}

function onChangeMedida (event) {
    if (event.target.value === "outro") {
        if (!medOutroInput) {
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

function addMedidaOnChanges () {
    const medOpcoes = document.forms.formProduto.pMed;

    for (let i = 0, len = medOpcoes.length; i < len; i++) {
        medOpcoes[i].addEventListener('change', onChangeMedida);
    }
}

function onFotoSelecionada (event) {
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


