//import mesaSaveId from './index.js';

const mainContainer = document.querySelector('#container');
const containerConta = document.querySelector('#show-conta');
const btnConta = document.querySelector('#btn-conta');
const btnFinalizar = document.querySelector('#pedir-conta');
const btnReturn = document.querySelector('#Npedir-conta');
const itensChoice = document.querySelector('#itemsCard');

//Função para abrir e fechar conta do cliente
function showConta() {
    containerConta.classList.toggle('hide');
}

//Função para buscar itens da API
const getItensCard = async (item) => {
    const url = '../thebar.json'
    const resp = await fetch(url);
    const data = await resp.json();
    
    Object.keys(data).map(key => {
         item = data[key]
    })

    const cardapio = document.createElement('div');
    cardapio.classList.add('containerHome');
    mainContainer.appendChild(cardapio);

    const cardTitle = document.createElement('h1');
    cardTitle.innerText = 'Cardapio';
    cardapio.appendChild(cardTitle);

    const boxCardItens = document.createElement('div');
    boxCardItens.classList.add('cardAll');
    cardapio.appendChild(boxCardItens);

    const itemPrimary = document.createElement('span');
    itemPrimary.innerText = item.name
    boxCardItens.appendChild(itemPrimary);

    const divItensCard = document.createElement('div');
    divItensCard.classList.add('itemsCard');
    boxCardItens.appendChild(divItensCard);

    const listBox = document.createElement('ul');
    divItensCard.appendChild(listBox);

    const itensListBox = `<li><p>${item['Cervejas']['01']['name']}</p><p>${item['Cervejas']['01']['valor']}</p><p>${item['Cervejas']['01']['tipo']}</p></li>`;
    divItensCard.innerHTML = itensListBox;


    console.log(item)

}





btnConta.addEventListener('click', () => {
    showConta();
})

btnReturn.addEventListener('click', () =>{
    showConta();
})

getItensCard();