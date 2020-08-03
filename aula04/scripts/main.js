let coresDiv;
let coresInputQtd = 1;
let fotosDiv;
let medOutroInput;

addMedidaOnChanges();

function salvarProduto (event) {
    event.preventDefault();

    if (!validarForm()) return;

    const pagamentosSelecionados = Array.prototype.slice.apply(document.forms['formProduto']['pPag'])
        .reduce((total, item) => {
            if (item.checked) {
                total.push(item);
            }
            return total;
        }, []);

    console.log(document.forms['formProduto']['pNome'].value);
    console.log(document.forms['formProduto']['pDescricao'].value);
    console.log(document.forms['formProduto']['pQtd'].value);
    console.log(document.forms['formProduto']['pMed'].value);
    console.log(pagamentosSelecionados);
    console.log(document.forms['formProduto']['pFoto'].files);
    console.log(document.forms['formProduto']['pData'].value);
    console.log(document.forms['formProduto']['pTipo'].value);
}

function validarForm () {
    const descricao = document.forms['formProduto']['pDescricao'].value;
    const descricaoLimpa = descricao.trim().replace(/  /g, "");

    if (descricaoLimpa.length === 0) {
        return false;
    }

    return true;
}

function addMedidaOnChanges () {
    const medOpcoes = document.forms.formProduto.pMed;

    for (let i = 0, len = medOpcoes.length; i < len; i++) {
        medOpcoes[i].addEventListener('change', onChangeMedida);
    }
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


