// Seleciona todos os botões 'Adicionar'
const botoesAdicionar = document.querySelectorAll('.adicionar');

// Seleciona a lista onde os itens do pedido serão exibidos
const listaPedido = document.getElementById('lista-pedido');

// Seleciona o elemento que exibirá o valor total do pedido
const totalElemento = document.getElementById('total');

// Cria variável que armazena o total do pedido
let total = 0;
let pedido = [];

// Função que adiciona itens ao pedido
function adicionarAoPedido(nome, preco) {
    // Cria um novo item de lista <li> para adicionar o produto ao pedido
    const itemPedido = document.createElement('li');
    itemPedido.textContent = `${nome} - R$ ${preco.toFixed(2)}`;
    
    // Adiciona o item criado à lista de pedidos
    listaPedido.appendChild(itemPedido);

    // Atualiza a lista de pedidos
    pedido.push({ nome, preco });

    // Atualiza o total da compra
    total += preco;
    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Adiciona o evento de clique para cada botão 'Adicionar'
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        const produto = botao.closest('.produto'); // Pega o produto que foi clicado

        if (!produto) return; // Segurança: evita erros se o botão estiver fora de um produto

        // Obtém o nome do produto a partir do texto da tag <h3>
        const nomeElemento = produto.querySelector('h3');
        const precoElemento = produto.querySelector('.preco');

        if (!nomeElemento || !precoElemento) return; // Segurança: evita erros se faltar algum dado

        const nome = nomeElemento.textContent;
        const preco = parseFloat(precoElemento.textContent.replace('R$', '').replace(',', '.').trim());

        if (isNaN(preco)) return; // Segurança: evita adicionar um valor inválido

        // Adiciona o item ao pedido e atualiza o total
        adicionarAoPedido(nome, preco);
    });
});

// Evento para finalizar o pedido
const botaoFinalizar = document.getElementById('finalizar-pedido');
botaoFinalizar.addEventListener('click', () => {
    if (pedido.length === 0) {
        alert("Seu pedido está vazio! Adicione produtos antes de finalizar.");
        return;
    }

    // Formata os itens do pedido
    const resumoPedido = pedido.map(item => `• ${item.nome} - R$ ${item.preco.toFixed(2)}`).join('\n');

    alert(`Pedido Finalizado com Sucesso!\n\nItens:\n${resumoPedido}\n\nTotal: R$ ${total.toFixed(2)}`);

    // Limpar o pedido após finalizar
    listaPedido.innerHTML = '';
    total = 0;
    pedido = [];
    totalElemento.textContent = `Total: R$ 0,00`;
});