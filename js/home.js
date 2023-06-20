const containerConta = document.querySelector('#show-conta');
const btnConta = document.querySelector('#btn-conta');
const btnFinalizar = document.querySelector('#pedir-conta');
const btnReturn = document.querySelector('#Npedir-conta');

//Função para abrir e fechar conta do cliente
function showConta() {
    containerConta.classList.toggle('hide');
}

btnConta.addEventListener('click', () =>{
    showConta();
})
btnReturn.addEventListener('click', () =>{
    showConta();
})