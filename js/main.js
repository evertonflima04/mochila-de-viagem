const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [] // Verifica se tem alguma coisa no LocalStorage, senão cria uma lista vázia


itens.forEach((element) => {
    criarElemento(element)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();  // Interromper o padrão de funcionamento
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const existe = itens.find(element => element.nome === nome.value)
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe){
        itemAtual.id = existe.id

        atualizarElemento(itemAtual)
        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual

    }else{

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        criarElemento(itemAtual)
    
        itens.push(itemAtual)  // itemAtual será adicionada a lista de itens usando o [push]

    } 
    localStorage.setItem("itens", JSON.stringify(itens))  // Transformando o itemAtual em uma string
    
    nome.value = ""  //Quando criar um elemento o espaço do nome fica vazío
    quantidade.value = ""  //Quando criar um elemento o espaço da quantidade fica vazío

})

function criarElemento(item) { 
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade

    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem) 
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDelete(item.id))

    lista.appendChild(novoItem)


 }
 function atualizarElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade // Atualizando se existir um valor igual

 }

 function botaoDelete(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "x"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)

    })
    return elementoBotao
 }
 function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(element => element.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))

 }