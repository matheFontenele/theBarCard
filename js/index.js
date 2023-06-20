const inputMesa = document.querySelector('#number');
const btnCad = document.querySelector('#btn-open-card');

function mesaSaveId(){
    let mesaNumber = inputMesa.value
}

//Validação do input
function validaInput(mesaId, mesaIdLength) {
    mesaId = inputMesa.value;
    mesaIdLength = mesaId.length;

    if(mesaIdLength == 0){
        inputMesa.classList.add('error');
        btnCad.setAttribute('disabled', 'disabled');
    }else{
        inputMesa.classList.remove('error');
        btnCad.removeAttribute('disabled', 'disabled');
    }
    console.log(mesaIdLength)
}

inputMesa.addEventListener('focusout', () => {
    validaInput();
})


