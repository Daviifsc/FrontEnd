// Metodo para navegação das paginas
function navega(destino) {
  let telas = document.getElementsByClassName('tela');
  Array.from(telas).forEach((element) => {
    element.classList.remove('show');
    element.classList.add('collapse');
  });
  document.getElementById(destino).classList.remove('collapse');
  document.getElementById(destino).classList.add('show');
}

// Carregando todas as publis
async function carregarDados() {
  try {
    // Fazendo a requisição para carregar o arquivo JSON
    const resposta = await axios.get('./JS/dados.json'); // Caminho para o arquivo JSON
    const dadosPublicacoes = resposta.data;

    // Referência para o elemento da lista
    const cardsPublicaoes = document.getElementById('publicacoes');

    // Limpando a div antes de adicionar os novos itens
    cardsPublicaoes.innerHTML = '';

    // Exibindo os cards na tela
    dadosPublicacoes.forEach((publi) => {
      // Todas as publicações
      const card = document.createElement('div');
      card.classList.add('col-12', 'col-md-6', 'col-lg-4');
      card.innerHTML = `
        <!-- Card1 -->
        <div class="card">
          <!-- Superior -->
          <div class="d-flex flex-row justify-content-between ">
            <div class="p-2">
              <img src="${publi.foto}" alt="Perfil" style="width: 24px; border-radius: 50%;" />
              <span class="username" style="font-size: small;">${publi.nome}</span>
            </div>
            <div class="p-2">
              <p>Tempo de Exposição: ${publi.lote.tempo}</p>
            </div>
          </div>
          <!-- Meio -->
          <div class="">
            <img src="${publi.lote.fotoProduto}" alt="" style="width: 100%; height: 150px;" />
          </div>
          <!-- Inferior -->
          <div class="d-flex flex-column mt-1">
            <div class="d-flex flex-row justify-content-around px-2 ">
              <div class="botao-rede-social"><i class="fa-solid fa-thumbs-up"></i></div>
              <div class="">
                <button class="botao-participar" type="button" onclick="carregarPubli(${publi.id})">
                  Participar
                </button>
              </div>
              <div class="botao-rede-social"><i class="fa-solid fa-share"></i></div>
            </div>
            <div class="px-3">
              <p>${publi.lote.descricao} </br>
                 ${publi.lote.postadoHa}
              </p>
            </div>
          </div>
        </div>
      `;
      cardsPublicaoes.appendChild(card);
    });
  } catch (erro) {
    console.error('Erro ao carregar os dados:', erro);
  }
}

// Carregando a publi
async function carregarPubli(dados) {
  try {
    navega('publicacao');

    const resposta = await axios.get('JS/dados.json');

    const dadosPublicacoes = resposta.data;

    const publiSelecionada = document.getElementById('publiSelecionada');

    publiSelecionada.innerHTML = '';

    dadosPublicacoes.forEach((publi) => {
      if (publi.id === dados) {
        // Exibindo a publicação selecionada
        const publiSele = document.createElement('div');
        publiSele.classList.add(
          'd-flex',
          'flex-column',
          'justify-content-center'
        );
        publiSele.innerHTML = ` 
          <!-- Superior -->
          <div class="my-3 ">
            <!-- Imagem -->
            <div class="">
              <!-- Carousel - Fotos -->
              <img src="${
                publi.lote.fotoProduto
              }" alt="" style="width: 100%; height: 250px;" > 
            </div>
          </div>
          <hr>
          <!-- Meio -->
          <div class="mb-2">
            <!-- Descrição do pedido -->
            <div class="">
              <h2>${publi.lote.titulo}</h2>
              <p>
                ${publi.lote.sobre}
              </p>
            </div>
          </div>
          <hr>
          <!-- Inferior -->
          <div class="">
            <div class="">
              <!-- Seleção de itens -->
              <div id="produtos" class="mb-2">
                <!-- Iterando sobre os produtos -->
                ${publi.lote.produto
              .map(
                (produto, index) => `
              <div class="d-flex flex-row item" data-preco="${produto.preco}" data-index="${index}" data-quantidade="${produto.quantidade}">
                <div>
                  <p>${produto.nomeAlimento} (un) <span style="font-weight: bold;">R$ ${produto.preco} | ${produto.quantidade} disponíveis</span></p>
                </div>
                <div class="d-flex align-items-center ms-2">
                  <div class="d-flex flex-row">
                    <button class="btn-menos math" data-index="${index}"><i class="fa-solid fa-minus"></i></button>
                    <span class="qtd mx-2" id="qtd-${index}" style="font-size: 1.1rem; font-weight: 700; margin: 1rem 0;">0</span>
                    <button class="btn-mais math" data-index="${index}"><i class="fa-solid fa-plus"></i></button>
                  </div>
                </div> 
              </div>`
              )
              .join('')}
              </div>            
              <!-- Botão de Adicionar ao Carrinho -->
              <div class="d-flex justify-content-end">
                <button class="carrinho"><i class="fa-solid fa-cart-shopping"></i> R$ ${calcularTotal(
                  publi.lote.produto
                )}</button>
              </div>
            </div>
          </div>
        `;
        publiSelecionada.appendChild(publiSele);
        carregarProdutos(publi.id);
      } else {
        console.log('Publicação não encontrada');
      }
    });
  } catch (erro) {
    console.error('Erro ao carregar a publicação:', erro);
  }
}

function carregarProdutos(idPubli) {
  const items = document.querySelectorAll('.item');
  const totalBtn = document.querySelector('.fa-cart-shopping').parentElement;

  let quantidades = Array.from(items).map(() => 0);

  items.forEach((item, index) => {
    const preco = parseFloat(item.dataset.preco);
    const qtdDisponivel = parseInt(item.dataset.quantidade);
    const spanQtd = item.querySelector(`#qtd-${index}`);
    const btnMais = item.querySelector('.btn-mais');
    const btnMenos = item.querySelector('.btn-menos');

    btnMais.addEventListener('click', () => {
      if(quantidades[index] < qtdDisponivel){
        quantidades[index]++;
        spanQtd.textContent = quantidades[index];
        atualizarTotal();
      }
      
    });

    btnMenos.addEventListener('click', () => {
      if (quantidades[index] > 0) {
        quantidades[index]--;
        spanQtd.textContent = quantidades[index];
        atualizarTotal();
      }
    });
  });

  function atualizarTotal() {
    let total = 0;
    quantidades.forEach((qtd, idx) => {
      const preco = parseFloat(items[idx].dataset.preco);
      total += preco * qtd;
    });
    totalBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> R$ ${total.toFixed(2)}`;
  }
}

// Função para calcular o valor total com base nos produtos
function calcularTotal(produtos) {
  let total = 0;
  produtos.forEach((produto) => {
    total += parseFloat(produto.preco) * 1; // Se estiver escolhendo 1 unidade de cada produto
  });
  return total.toFixed(2);
}

// Chama a função ao carregar a página
window.onload = carregarDados;

/*    DESATIVADO

Registra o serviceWorker da aplicação para cache de recursos offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

var pedidoInstalacao;
window.addEventListener('beforeinstallprompt', function (installPrompt) {
  if (installPrompt) {
    $('#installAppBt').show();
    pedidoInstalacao = installPrompt;
  }
});

// Inicia a instalação do app
function installApp() {
  pedidoInstalacao.prompt();
}
 */
