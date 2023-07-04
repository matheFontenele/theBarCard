const container = document.querySelector('#divAll')
const ulPedidosNow = document.querySelector('#ul-pedidos');
const priceTotalItens = document.querySelector('#total-itens');
const containerConta = document.querySelector('#show-conta');
const btnGetAllPedidos = document.querySelector('#getItensPedido')


//Variaveis Globais
let valorItem;
let valorTotal = 0;

//Função para somar e subtrair o valor total da conta
const contaNota = (valor) =>{
    valor = valor.toFixed(2)
    valor = String(valor);
    valor = valor.replace('.', ',')
    priceTotalItens.innerText = (valor)
}


//Função para transformar string para number
const toNumber = (valor) =>{
    valor = valor.replace(',', '.')
    valor = valor.replace('R$', '')
    valorItem = Number(valor)
}

//Função para desabilitar botão de fazer pedidos caso esteja vazio
const noEmpyCar = () =>{
    if (priceTotalItens.innerText == '-0,00'){
        priceTotalItens.innerText == '0,00'
        btnGetAllPedidos.setAttribute('disabled', '');
    }
    console.log(btnGetAllPedidos)
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
            spanList.setAttribute('id', 'itensStyle')
            itensList.appendChild(spanList);

            const name = document.createElement('p');
            name.innerHTML = item['menu'][i].itens[j].name;
            name.classList.add('btnChoice')
            name.setAttribute('id', 'nameItem');
            spanList.appendChild(name);

            const desc = document.createElement('p')
            desc.innerHTML = item['menu'][i].itens[j].descri;
            desc.classList.add('btnChoice')
            desc.setAttribute('id', 'descItem');
            spanList.appendChild(desc);

            const valor = document.createElement('p');
            valor.innerHTML = `R$ ${item['menu'][i].itens[j].valor}`;
            valor.setAttribute('id', 'valorText')
            valor.classList.add('btnChoice')
            itensList.appendChild(valor);

            

        }
    }
}

//Função para adicionar itens do pedido
const pedidosNow = (price) => {

    const newItemPedido = document.createElement('li');
    const removeItem = document.createElement('i');

    removeItem.classList.add('fa-solid');
    removeItem.classList.add('fa-trash');
    removeItem.setAttribute('id', 'btn-remove');

    newItemPedido.innerHTML = (price)
    const descItem = newItemPedido.querySelector('#descItem')
    descItem.classList.add('hide')

    newItemPedido.appendChild(removeItem)

    ulPedidosNow.appendChild(newItemPedido)

    const desableName = newItemPedido.querySelector('#nameItem')
    desableName.classList.remove('btnChoice')
    
    const desablePrice = newItemPedido.querySelector('#valorText')
    desablePrice.classList.remove('btnChoice')
    
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
    if(targetBtn.classList.contains('btnChoice')){
        let valorNumberItem = liFather.querySelector('#valorText').innerText
        toNumber(valorNumberItem)
        valorTotal = valorTotal + valorItem
        const newItem = liFather.innerHTML
        contaNota(valorTotal)
        pedidosNow(newItem)
        
    }

    //Evento para remover itens e alterar preço total na lista de pedidos
    if(getIdElemtent == 'btn-remove'){
        let valorNumberItem = liFather.querySelector('#valorText').innerText
        toNumber(valorNumberItem)
        valorTotal = valorTotal - valorItem
        contaNota(valorTotal)
        ulPedidosNow.removeChild(liFather);
    }

    //Evento para adicionar itens do pedido feito na conta total
    if(getIdElemtent == 'getItensPedido'){
        console.log('travei aqui')
    }
    console.log(priceTotalItens.innerText)
})

getCard();
noEmpyCar();
