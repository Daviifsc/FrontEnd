let formularioVisivel = false;

function adicionarProduto() {
  const container = document.getElementById('produtoContainer');

  if (!formularioVisivel) {
    const formProduto = `
      <form class=formulario id="formProduto" style="margin-top: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 10px;">
        <legend>Produto da Oferta</legend>
        <label class="label" label="produtoNome">Nome:</label><br>
        <input class="input" type="text" id="produtoNome" placeholder="Batata"><br>

        <label class="label" label="categoria">Nome:</label><br>
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
        <input type="radio" id="kg" name="unidade" value="kg">     

        <label class="label" for="litro">Litro</label>
        <input type="radio" id="litro" name="unidade" value="litro">

        <label class="label" for="unidade">Unidade</label>
        <input type="radio" id="unidade" name="unidade" value="un">
        <br><br>

        <label class="label" for="medida"> Medida: </label> <br>
        <input type="number" id="medida" name="medida" step=0.1>

        <label class="label" label="produtoPreco">Preço:</label><br>
        <input class="input" type="number" id="produtoPreco"><br>

        <button class="button" onclick="salvarProduto()">Salvar Produto</button>
      </form>
    `;
    container.innerHTML = formProduto;
    formularioVisivel = true;
  }
}

function salvarProduto() {
  const nome = document.getElementById('produtoNome').value;
  const preco = document.getElementById('produtoPreco').value;

  alert(`Produto salvo: ${nome} - R$${preco}`);
}