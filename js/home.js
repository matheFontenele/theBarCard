const container = document.querySelector('#divAll')
const ulPedidosNow = document.querySelector('#ul-pedidos');
const priceTotalItens = document.querySelector('#total-itens');
const containerConta = document.querySelector('#show-conta');


//Variaveis Primarias
let valorItem;
let valorItemNumber;
let valorTotal = 0;

//Função para somar e subtrair o valor total da conta
const contaNota = (valor) =>{
    valor = String(valor)
    valor = valor.replace('.', ',')
    priceTotalItens.innerText = `R$ ${valor}`
}

//Função para formtar valores dos itens
const formatItemValor = (valor) =>{
    valor = valor.replace(',', '.')
    valor = Number(valor)
    console.log(valor)
}

//Funcção para desformatar (transformar em String) os valores


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
            itensList.setAttribute('id', 'btnChoice')
            ulList.appendChild(itensList);

            const spanList = document.createElement('span');
            spanList.setAttribute('id', 'itensStyle')
            itensList.appendChild(spanList);

            const name = document.createElement('p');
            name.innerHTML = item['menu'][i].itens[j].name;
            name.setAttribute('id', 'btnChoice')
            spanList.appendChild(name);

            const desc = document.createElement('p')
            desc.innerHTML = item['menu'][i].itens[j].descri;
            desc.setAttribute('id', 'btnChoice')
            spanList.appendChild(desc);

            const valor = document.createElement('p');
            valor.innerHTML = `R$ ${item['menu'][i].itens[j].valor}`;
            valor.setAttribute('id', 'btnChoice')
            valor.classList.add('valorText')
            itensList.appendChild(valor);

            formatItemValor(item['menu'][i].itens[j].valor)

        }
    }
}

//Função para adicionar e remover itens do pedido
const pedidosNow = (item, preco, total) => {

    item = valorItem.innerHTML
    preco = valorItemNumber
    total = valorTotal


    const newItemPedido = document.createElement('li');
    const removeItem = document.createElement('i');

    removeItem.classList.add('fa-solid');
    removeItem.classList.add('fa-trash');
    removeItem.setAttribute('id', 'btn-remove');

    newItemPedido.innerHTML = item
    const spanItem = newItemPedido.querySelector('span')
    spanItem.removeAttribute('id')
    const titleItem = newItemPedido.querySelector('p')
    titleItem.removeAttribute('id')
    const descrItem = newItemPedido.querySelector('#btnChoice')
    descrItem.removeAttribute('id')
    const valorItemRevise = newItemPedido.querySelector('.valorText')
    valorItemRevise.removeAttribute('id')

    newItemPedido.removeAttribute('id')

    newItemPedido.appendChild(removeItem)

    ulPedidosNow.appendChild(newItemPedido)

    contaNota(total)
    
}


//Lista de eventos com click
document.addEventListener('click', (e) => {
    const targetBtn = e.target
    const papaiTarget = targetBtn.closest('div')
    const liFather = targetBtn.closest('li');
    const childresnDiv = papaiTarget.querySelector('ul')
    const getIdElemtent = targetBtn.getAttribute('id');

    //Evento de mostrar e ocultar div de conta
    if (getIdElemtent  == 'btn-conta' | getIdElemtent == 'Npedir-conta'){{
        containerConta.classList.toggle('hide')
    }}

    //Evento de ocultar e mostrar sub itens de cardapio
    if(targetBtn.classList.contains('btnItens')){
        childresnDiv.classList.toggle('hide')
    }

    //Evento para adicionar valor total e itens a lista de revisar pedidos
    if(getIdElemtent == 'btnChoice' | getIdElemtent == 'valorText'){
        const getPriceString = liFather.querySelector('.valorText').innerText
        const getPriceNumber = getPriceString.replace(',', '.')
        const newValorItem = Number(getPriceNumber);

        valorItem = liFather
        valorItemNumber = newValorItem;
        valorTotal = valorTotal + valorItemNumber

        pedidosNow()   
    }

    //Evento para remover itens e alterar preço total na lista de pedidos
    if(getIdElemtent == 'btn-remove'){
        ulPedidosNow.removeChild(liFather);
    }

})

getCard();