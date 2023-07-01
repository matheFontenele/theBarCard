const formMesa = document.querySelector('#idMesa');
const inputMesa = document.querySelector('#number');
const btnCad = document.querySelector('#btn-open-card');


 


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
}

inputMesa.addEventListener('focusout', () => {
  validaInput();
})

formMesa.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = '../home.html'
    inputMesa.value = ''
})



