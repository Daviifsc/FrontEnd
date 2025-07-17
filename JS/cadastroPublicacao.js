// Variável ofertas inicializada como let (pode ser reatribuída)
let ofertas = [
  { id: 1, titulo: "Produtos Orgânicos"},
  { id: 2, titulo: "Legumes Frescos"},
];

// Buscar ofertas da API e popular o select
function carregarOfertas() {
  fetch('http://localhost:8080/api/ofertas')
    .then(response => response.json())
    .then(data => {
      ofertas = data; // Atualiza a variável
      popularSelectOfertas(); // Popular o select com as novas ofertas
    })
    .catch(error => {
      console.error("Erro ao buscar ofertas:", error);
      // Mesmo com erro, popula com as ofertas "mock" iniciais
      popularSelectOfertas();
    });
}

// Função para popular o <select>
function popularSelectOfertas() {
  const select = document.getElementById("select-oferta");
  select.innerHTML = '<option disabled selected>Selecione uma oferta</option>'; // Limpa e adiciona padrão

  ofertas.forEach(oferta => {
    const option = document.createElement("option");
    option.value = oferta.id;
    option.textContent = `${oferta.titulo}`;
    select.appendChild(option);
  });
}

// Chamada da função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarOfertas);

//   Define as datas de exposição e pagamento
document.addEventListener("DOMContentLoaded", () => {
  const selectTempo = document.getElementById("select-tempo");
  const inputInicio = document.getElementById("data-inicio");
  const inputFinal = document.getElementById("data-final");

  const inputInicioPagamento = document.getElementById("data-inicio-pagamento");
  const inputFimPagamento = document.getElementById("data-fim-pagamento");

  const formatarData = (data) => data.toISOString().split("T")[0];

  selectTempo.addEventListener("change", () => {
    const dias = parseInt(selectTempo.value);
    const dataInicio = new Date(inputInicio.value || new Date());

    const dataFinal = new Date(dataInicio);
    dataFinal.setDate(dataFinal.getDate() + dias);
    inputFinal.value = formatarData(dataFinal);

    // Atualizar início do pagamento com a data final da exposição
    inputInicioPagamento.value = formatarData(dataFinal);

    // Limpar a data final do pagamento, para evitar dados incoerentes
    inputFimPagamento.value = "";
  });

  if (!inputInicio.value) {
    inputInicio.value = formatarData(new Date());
  }
});


// CEP de teste (simulando valor cadastrado pelo vendedor)
let cep = "88058001"; 

function preencherSelectComCep(valorCep) {
  const select = document.getElementById("select-local-retirada");
  select.innerHTML = ""; // limpa qualquer option anterior

  const option = document.createElement("option");
  option.value = valorCep;
  option.textContent = valorCep;
  select.appendChild(option);
}

// Ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  // Preenche com o valor de teste inicialmente
  preencherSelectComCep(cep);

  // Depois tenta buscar o CEP real da API
  fetch("http://localhost:8080/api/vendedores/cep") 
    .then(response => response.text()) 
    .then(data => {
      // data deve ser uma string com o cep
      cep = data;
      preencherSelectComCep(cep);
    })
    .catch(error => {
      console.warn("Falha ao buscar o CEP da API. Usando valor de teste.", error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('formPublicacao').addEventListener('submit', function (publicar) {
    publicar.preventDefault();

    // Captura os valores dos campos
    const ofertaId = document.getElementById('select-oferta').value;
    const tempoExposicao = document.getElementById('select-tempo-exposicao').value;
    const dataPostagem = document.getElementById('data-postagem').value;
    const dataFinalExposicao = document.getElementById('data-final').value;
    const inicioPagamento = document.getElementById('inicio-pagamento').value;
    const fimPagamento = document.getElementById('fim-pagamento').value;
    const cepRetirada = document.getElementById('select-cep-retirada').value;

    // Validação
    if (!ofertaId || !dataPostagem || !dataFinalExposicao || !inicioPagamento || !fimPagamento || !cepRetirada) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const dadosPublicacao = {
      ofertaId: ofertaId,
      tempoExposicao: tempoExposicao,
      dataPostagem: dataPostagem,
      dataFinalExposicao: dataFinalExposicao,
      inicioPagamento: inicioPagamento,
      fimPagamento: fimPagamento,
      cepRetirada: cepRetirada
    };

    fetch('http://localhost:8080/api/publicacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosPublicacao)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      alert('Publicação realizada com sucesso! ID: ' + data.id);
      console.log('Dados enviados:', dadosPublicacao);
    })
    .catch(error => {
      console.error('Erro ao publicar:', error);
      alert('Ocorreu um erro ao processar a publicação.');
    });
  });
});

