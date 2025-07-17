
let formularioVisivel = false;
const container = document.getElementById('produtoContainer');

//      FUNÇÃO DE ENVIO DOS DADOS DA OFERTA AO BACK
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('formOferta').addEventListener('submit', function(salvarPublicação) {
      salvarPublicação.preventDefault();

      const titulo = document.getElementById('titulo').value;
      const descricao = document.getElementById('descricao').value;
      const telefone = document.getElementById('fone').value;
      const pix = document.getElementById('pix').value;
      const listaProdutos = document.getElementById('listaProdutos').value;

      // Validação para campos vazios
      if (!titulo || !descricao || !telefone || !pix || !listaProdutos) {
          alert('Por favor, preencha todos os campos.');
          return;
      }

      const dados = { titulo, descricao, telefone, pix, listaProdutos };

      fetch('http://localhost:8080/api/ofertas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          alert('Cadastro simulado com sucesso! ID: ' + data.id);
          console.log(dados)

      })
      .catch(error => {
          console.error('Erro:', error);
          alert('Ocorreu um erro ao processar o cadastro.');
      });
  });
});

function adicionarProduto() {
  

  if (!formularioVisivel) {
    const formProduto = `
      <form class=formulario id="formCadastroProduto" style="margin-top: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 10px;">
        <legend>Produto da Oferta</legend>
        <label class="label" label="produtoNome">Nome:</label><br>
        <input class="input" type="text" id="produtoNome" placeholder="Batata"><br>

        <label class="label" label="categoria">Categoria:</label><br>
        <select class="input" id="categoria">
          <option value="">Selecione uma categoria</option>
          <option value="Frutas">Frutas</option>
          <option value="Legumes">Legumes</option>
          <option value="Vegetais">Vegetais</option>
          <option value="Proteinas">Proteínas</option>
          <option value="Cereais">Cereais</option>
        </select><br>

        <label class="label" label="tipoMedida"> Tipo de Medida: </label> <br>

        <label class="label" for="kg">Kg</label>
        <input type="radio" id="kg" name="tipoMedida" value="kg" checked>  
        
        <label class="label" for="g">gramas</label>
        <input type="radio" id="g" name="tipoMedida" value="g">

        <label class="label" for="litro">litro</label>
        <input type="radio" id="litro" name="tipoMedida" value="litro">

        <label class="label" for="ml">ml</label>
        <input type="radio" id="ml" name="tipoMedida" value="ml">

        <label class="label" for="unidade">unidade</label>
        <input type="radio" id="unidade" name="tipoMedida" value="un">
        <br><br>

        <label class="label" for="medida"> Medida: </label> <br>
        <input class=input type="number" id="medida" name="medida" step=0.1 placeholder="10,0 kg"> <br>

        <label class="label" for="produtoPreco">Preço:</label> <br>
        <input class="input" type="number" id="produtoPreco" step="0.1" placeholder="R$"><br>

        <label class="label" for="qtd">Quantidade:</label> <br>
        <input class="input" type="number" id="qtd" placeholder="100"> <br>


        <button type="button" class="button" onclick="salvarProduto()">Adicionar</button>
        <button type="button" class="button" onclick="cancelar()">Cancelar</button>
      </form>
    `;
    container.innerHTML = formProduto; // Injeta o conteúdo do formulário a div "container" no html
    formularioVisivel = true; // Muda a visibilidade do formulário
  }
} 

//         FUNÇÃO PARA ADICIONAR PRODUTO AO FORM DE PUBLICAÇÃO
function salvarProduto(){
  document.getElementById("produtoContainer")

  const nome = document.getElementById("produtoNome").value;
  const categoria = document.getElementById("categoria").value;
  const tipoMedida = document.querySelector('input[name="tipoMedida"]:checked').value;
  const medida = document.getElementById("medida").value;
  const quantidade = document.getElementById("qtd").value;
  const preco = document.getElementById("produtoPreco").value;

  if (!nome || !categoria || !tipoMedida || !medida || !quantidade || !preco) {
    alert("Preencha todos os campos.");
    return;
  }

  const dados = `${nome} - ${quantidade} ${tipoMedida} ${medida} (${categoria}) - R$ ${parseFloat(preco).toFixed(2)}`;

  fetch('http://localhost:8080/api/produtos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          alert('Cadastro simulado com sucesso! ID: ' + data.id);
          console.log(dados)

      })
      .catch(error => {
          console.error('Erro:', error);
          alert('Ocorreu um erro ao processar o cadastro.');
      });

    const texto = `${nome} - ${medida} (${tipoMedida})  R$ ${parseFloat(preco).toFixed(2)}`;  

    const li = document.createElement("li");
    li.textContent = texto;
    document.getElementById("lista-produtos").appendChild(li);

    // Limpa o formulário
    document.getElementById("formCadastroProduto").reset();

    // Fecha o formulário após adicionar
    cancelar();
};



//        FUNÇÃO PARA CANCELAR A ADIÇÃO DE PRODUTO A OFERTA
function cancelar(){
  const form = document.getElementById("formCadastroProduto");
  if (form) {
    form.remove(); // Remove o próprio formulário do DOM
  }
  formularioVisivel = false;
}
