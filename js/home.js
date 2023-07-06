const container = document.querySelector('#divAll')
const ulPedidosNow = document.querySelector('#ul-pedidos');
const priceTotalItens = document.querySelector('#total-itens');
const containerConta = document.querySelector('#show-conta');


//Variaveis Globais
const contaItensPedidos = []
let itensPedido = []
let valorItem;
let valorTotal = 0;
let valueString;

//Função para adicionar pedidos a conta final
const showContaFinal = () => {
    console.log(contaItensPedidos)
}


//Função para adicionar valores ao array de pedidos
const newItemPedido = (nome, valor) => {
    itensPedido.push(
        {
            nome: nome,
            valor: valor
        }
    )
}

//Função para alterar valor total de pedidos
const newTotalValue = (total) =>{
    changeString(total.toFixed(2))
    priceTotalItens.innerText = valueString
}


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

//Função para transformar number para string
const changeString = (valor) =>{
    valor = String(valor)
    valor = valor.replace('.', ',')
    valor = `R$ ${valor}` 
    valueString = valor
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

//Função para criar lista de pedidos
const newCardPedidos = (nome, valor) => {

    const newItem = document.createElement('li');
    ulPedidosNow.appendChild(newItem)

    const newTitleItem = document.createElement('p')
    newTitleItem.innerText = nome
    newItem.appendChild(newTitleItem)

    const newValorItem = document.createElement('p')
    newValorItem.setAttribute('id', 'valorItem')
    newValorItem.innerText = valor
    newItem.appendChild(newValorItem)

    const removeItem = document.createElement('i');
    removeItem.classList.add('fa-solid');
    removeItem.classList.add('fa-trash');
    removeItem.setAttribute('id', 'btn-remove');
    newItem.appendChild(removeItem)
}


//Lista de eventos com click
document.addEventListener('click', (e) => {
    const targetBtn = e.target
    const papaiTarget = targetBtn.closest('div')
    const liFather = targetBtn.closest('li');
    const childresnDiv = papaiTarget.querySelector('ul')
    const getIdElemtent = targetBtn.getAttribute('id');
    
    //Evento de ocultar e mostrar sub itens de cardapio
    if(targetBtn.classList.contains('btnItens')){
        childresnDiv.classList.toggle('hide')
    }

    //Evento para adicionar valor total e itens a lista de revisar pedidos
    if(targetBtn.classList.contains('btnChoice')){
        const nameChoice = liFather.querySelector('#nameItem').innerText;
        const valorChoice = liFather.querySelector('#valorText').innerText;

        newItemPedido(nameChoice, valorChoice)
        newCardPedidos(nameChoice, valorChoice)

        toNumber(valorChoice)
        valorTotal = valorTotal + valorItem
        newTotalValue(valorTotal)
    }

    //Evento para remover itens do pedido e diminuir valor da conta
    if(getIdElemtent == 'btn-remove'){
        const valorChoice = liFather.querySelector('#valorItem').innerText
        toNumber(valorChoice)
        valorTotal = valorTotal - valorItem
        newTotalValue(valorTotal)

        ulPedidosNow.removeChild(liFather);
    }

    //Evento de mostrar e ocultar div de conta
    if (getIdElemtent  == 'btn-conta' | getIdElemtent == 'Npedir-conta'){{
        containerConta.classList.toggle('hide')
}}

    //Evento para adicionar itens pedidos na conta final
    if (getIdElemtent == 'getItensPedido'){
        let arrayLength = itensPedido.length
        let empyArray = []
        
        for( let i = 0; i < arrayLength; i++){
           
            contaItensPedidos.push(itensPedido[i])
        }
        showContaFinal()
        itensPedido = empyArray
        

        for( let i = 0; i < arrayLength; i++){
            const erasedList = ulPedidosNow.querySelector('li')
            ulPedidosNow.removeChild(erasedList)
            newTotalValue(0)
        }
    }

})

getCard();
