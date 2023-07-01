const containerConta = document.querySelector('#show-conta');
const btnConta = document.querySelector('#btn-conta');
const btnReturn = document.querySelector('#Npedir-conta');

//DOM da lista de itens dos cardapioss
const drinksList = document.querySelector('#list-drinks');
const petisList = document.querySelector('#list-petis');
const burguerList = document.querySelector('#list-burguers');

//Função para abrir e fechar conta do cliente
function showConta() {
    containerConta.classList.toggle('hide');
}

//Função para buscar bebidas da API
const getDrinksCard = async () => {
    const url = '../json/bebidas.json'
    const resp = await fetch(url);
    const data = await resp.json();
    newDrinkCard(data)
}

//Função para buscar petiscos da API
const getPetiscCard = async () => {
    const url = '../json/petiscos.json'
    const resp = await fetch(url);
    const data = await resp.json();
    newPetisCard(data)
}

//Função para buscar hamburgues da API
const getBurguerCard = async () => {
    const url = '../json/burguer.json'
    const resp = await fetch(url);
    const data = await resp.json();
    newBurguerCard(data)
}


//Função para adicionar drinks no cardapio
const newDrinkCard = (item) => {

    const size = Object.keys(item['Bebidas']).length
    for (let i = 0; i < size ; i++) {
    
    const itensList = document.createElement('li');
    drinksList.appendChild(itensList);
    const spanList = document.createElement('span');
    spanList.classList.add('itensStyle');
    itensList.appendChild(spanList);

    const name = document.createElement('p');
    name.innerHTML = item['Bebidas'][i].name;
    spanList.appendChild(name);

    const desc = document.createElement('p');
    desc.innerHTML = item['Bebidas'][i].descri;
    spanList.appendChild(desc);

    const valor = document.createElement('p');
    valor.innerHTML = `${item['Bebidas'][i].valor} $R$`;
    valor.classList.add('valorText');
    itensList.appendChild(valor);

        const valorItem = item['Bebidas'][i].valor.replace(',', '.')
        const newValorItem = Number(valorItem);

        console.log(newValorItem)
        
    }
}

//Função para adicionar petiscos no cardapio
const newPetisCard = (item) => {

    const size = Object.keys(item['Petiscos']).length
    for (let i = 0; i < size ; i++) {
    
    const itensList = document.createElement('li');
    petisList.appendChild(itensList);
    const spanList = document.createElement('span');
    spanList.classList.add('itensStyle');
    itensList.appendChild(spanList);

    const name = document.createElement('p');
    name.innerHTML = item['Petiscos'][i].name;
    spanList.appendChild(name);

    const desc = document.createElement('p');
    desc.innerHTML = item['Petiscos'][i].descri;
    spanList.appendChild(desc);

    const valor = document.createElement('p');
    valor.innerHTML = `${item['Petiscos'][i].valor} $R$`;
    valor.classList.add('valorText');
    itensList.appendChild(valor);
    }
}

//Função para adicionar hamburguers no cardapio
const newBurguerCard = (item) => {

    const size = Object.keys(item['Hamburguer']).length
    for (let i = 0; i < size ; i++) {
    
    const itensList = document.createElement('li');
    burguerList.appendChild(itensList);
    const spanList = document.createElement('span');
    spanList.classList.add('itensStyle');
    itensList.appendChild(spanList);

    const name = document.createElement('p');
    name.innerHTML = item['Hamburguer'][i].name;
    spanList.appendChild(name);

    const desc = document.createElement('p');
    desc.innerHTML = item['Hamburguer'][i].descri;
    spanList.appendChild(desc);

    const valor = document.createElement('p');
    valor.innerHTML = `${item['Hamburguer'][i].valor} $R$`;
    valor.classList.add('valorText');
    itensList.appendChild(valor);

    }
}

const revisaItens = [];



//Função para abrir e fechar container de itens do cardapio
document.addEventListener('click', (e) => {
    const targetBtn = e.target
    const papaiTarget = targetBtn.closest('div')
    const childresnDiv = papaiTarget.querySelector('ul')

    if(papaiTarget.classList.contains('itemsCard')){
        childresnDiv.classList.toggle('hide')
    }
    
});

btnConta.addEventListener('click', () => {
    showConta();
})

btnReturn.addEventListener('click', () =>{
    showConta();
})

getDrinksCard()
getPetiscCard()
getBurguerCard()
