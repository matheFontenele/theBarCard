const container = document.querySelector('#divAll')
const ulPedidosNow = document.querySelector('#ul-pedidos');
const divPedidosNow = document.querySelector('#div-pedidosNow')
const priceTotalItens = document.querySelector('#total-itens');
const containerConta = document.querySelector('#show-conta');
const btnConta = document.querySelector('#btn-conta');
const btnReturn = document.querySelector('#Npedir-conta');

//DOM da lista de itens dos cardapioss
const drinksList = document.querySelector('#list-drinks');
const petisList = document.querySelector('#list-petis');
const burguerList = document.querySelector('#list-burguers');


//Variaveis Primarias
let valorItem;
let valorItemNumber;
let valorTotal = 0;

//Função para abrir e fechar conta do cliente
function showConta() {
    containerConta.classList.toggle('hide');
}


//Função para pegar API de cardapio
const getCard = async () => {
    const url = "../json/cardapio.json";
    const resp = await fetch(url);
    const data = await resp.json();
    creatCard(data);
}

const creatCard = (item) => {

    const size = Object.keys(item['menu']).length
    for (let i = 0; i < size ; i++) {
        
        const card = document.createElement('div');
        card.classList.add('itemsCard');
        container.appendChild(card);

        const btnItens = document.createElement('button');
        btnItens.innerText = item['menu'][i].name
        btnItens.classList.add('btnItens')
        card.appendChild(btnItens);

        const ulList = document.createElement('ul');
        ulList.classList.add('hide')
        card.appendChild(ulList)

        const sizeng = Object.keys(item['menu'][i].itens).length
        for (let j = 0; j < sizeng; j++){
            

            const itensList = document.createElement('li');
            itensList.classList.add('btnChoice')
            ulList.appendChild(itensList);

            const spanList = document.createElement('span');
            spanList.classList.add('btnChoice')
            spanList.setAttribute('id', 'itensStyle')
            itensList.appendChild(spanList);

            const name = document.createElement('p');
            name.innerHTML = item['menu'][i].itens[j].name;
            name.classList.add('btnChoice')
            spanList.appendChild(name);

            const desc = document.createElement('p')
            desc.innerHTML = item['menu'][i].itens[j].descri;
            desc.classList.add('btnChoice')
            spanList.appendChild(desc);

            const valor = document.createElement('p');
            valor.innerHTML = item['menu'][i].itens[j].valor;
            valor.setAttribute('id', 'valorText')
            valor.classList.add('btnChoice')
            itensList.appendChild(valor);

            const valorItem = item['menu'][i].itens[j].valor.replace(',', '.')
            const newValorItem = Number(valorItem);

        }
    }
}

//Função para adicionar e remover itens do pedido
const pedidosNow = (item, preco, total) => {

    item = valorItem.innerHTML
    preco = valorItemNumber
    total = valorTotal.toFixed(2)


    const newItemPedido = document.createElement('li');
    const removeItem = document.createElement('i');
    const totalItensTitle = document.createElement('h5');
    const totalItens = document.createElement('p');

    removeItem.classList.add('fa-solid');
    removeItem.classList.add('fa-trash')

    newItemPedido.innerHTML = item
    newItemPedido.removeAttribute('id')

    const spanItem = newItemPedido.querySelector('.btnChoice');
    spanItem.classList.remove('btnChoice')
    newItemPedido.appendChild(removeItem)

    ulPedidosNow.appendChild(newItemPedido)

    priceTotalItens.innerText = `R$ ${String(total)}`.replace('.', ',')
    
}


//Função para abrir e fechar container de itens do cardapio
document.addEventListener('click', (e) => {
    const targetBtn = e.target
    const papaiTarget = targetBtn.closest('div')
    const liFather = targetBtn.closest('li');
    const childresnDiv = papaiTarget.querySelector('ul')


    if(targetBtn.classList.contains('btnItens')){
        childresnDiv.classList.toggle('hide')
    }
    if(targetBtn.classList.contains('btnChoice')){
        const getPriceString = liFather.querySelector('#valorText').innerText
        const getPriceNumber = getPriceString.replace(',', '.')
        const newValorItem = Number(getPriceNumber);

        valorItem = liFather
        valorItemNumber = newValorItem;
        valorTotal = valorTotal + valorItemNumber

        pedidosNow()
        
    }
})



btnConta.addEventListener('click', () => {
    showConta();
})

btnReturn.addEventListener('click', () =>{
    showConta();
})


getCard();