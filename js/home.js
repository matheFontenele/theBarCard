const container = document.querySelector('#divAll')
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
        card.appendChild(btnItens);

        const ulList = document.createElement('ul');
        ulList.classList.add('hide')
        card.appendChild(ulList)

        const sizeng = Object.keys(item['menu'][i].itens).length
        for (let j = 0; j < sizeng; j++){
            

            const itensList = document.createElement('li');
            ulList.appendChild(itensList);

            const spanList = document.createElement('span');
            spanList.classList.add('itensStyle');
            itensList.appendChild(spanList);

            const name = document.createElement('p');
            name.innerHTML = item['menu'][i].itens[j].name;
            spanList.appendChild(name);

            const desc = document.createElement('p');
            desc.innerHTML = item['menu'][i].itens[j].descri;
            spanList.appendChild(desc);

            const valor = document.createElement('p');
            valor.innerHTML = `${item['menu'][i].itens[j].valor} $R$`;
            valor.classList.add('valorText');
            itensList.appendChild(valor);

            const valorItem = item['menu'][i].itens[j].valor.replace(',', '.')
        const newValorItem = Number(valorItem);

        console.log(newValorItem)

        }
    }
}




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


getCard();