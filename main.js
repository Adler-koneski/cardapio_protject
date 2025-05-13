// Seleciona os elementos da interface
const botoesAdicionar = document.querySelectorAll('.adicionar');
const listaPedido = document.getElementById('lista-pedido');
const totalElemento = document.getElementById('total');
const botaoFinalizar = document.getElementById('finalizar-pedido');

// Estado do pedido
let total = 0;
let pedido = [];

// Função para atualizar a interface do total
function atualizarTotal() {
    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para adicionar item ao pedido
function adicionarAoPedido(nome, preco) {
    // Criar item na lista
    const item = document.createElement('li');
    item.textContent = `• ${nome} - R$ ${preco.toFixed(2)}`;
    listaPedido.appendChild(item);

    // Atualizar estado
    pedido.push({ nome, preco });
    total += preco;

    atualizarTotal();
}

// Vincula eventos aos botões de adicionar
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        const nome = botao.dataset.nome;
        const preco = parseFloat(botao.dataset.preco);

        if (!nome || isNaN(preco)) {
            console.warn('Dados inválidos no botão:', botao);
            return;
        }

        adicionarAoPedido(nome, preco);
    });
});

// Evento de finalizar pedido
botaoFinalizar.addEventListener('click', () => {
    if (pedido.length === 0) {
        alert("Seu pedido está vazio! Adicione produtos antes de finalizar.");
        return;
    }

    const resumo = pedido
        .map(item => `• ${item.nome} - R$ ${item.preco.toFixed(2)}`)
        .join('\n');

    alert(`Pedido Finalizado com Sucesso!\n\nItens:\n${resumo}\n\nTotal: R$ ${total.toFixed(2)}`);

    // Resetar pedido
    listaPedido.innerHTML = '';
    pedido = [];
    total = 0;
    atualizarTotal();
});
