const containerConta = document.querySelector('#show-conta');
const btnConta = document.querySelector('#btn-conta');
const btnFinalizar = document.querySelector('#pedir-conta');
const btnReturn = document.querySelector('#Npedir-conta');
const btnOptions = document.querySelector('#btn-choise');
const itensChoice = document.querySelector('#itemsCard');
const testeBtn = document.querySelector('#value-btn');

//Função para abrir e fechar conta do cliente
function showConta() {
    containerConta.classList.toggle('hide');
}


btnConta.addEventListener('click', () =>{
    showConta();
    console.log(testeBtn.textContent)
})
btnReturn.addEventListener('click', () =>{
    showConta();
})