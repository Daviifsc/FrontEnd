document.addEventListener("DOMContentLoaded", () => {
  const btnInfo = document.getElementById("btn-info");
  const btnOfertas = document.getElementById("btn-ofertas");
  const btnPublis = document.getElementById("btn-publis");

  btnInfo.addEventListener("click", carregarFormularioEdicaoUsuario);
  btnOfertas.addEventListener("click", carregarOfertas);
  btnPublis.addEventListener("click", carregarPublis);
});

function carregarFormularioEdicaoUsuario() {
  const conteudoSPA = document.getElementById("conteudo-spa");
  conteudoSPA.innerHTML = ""; // limpa o conteúdo

  fetch("../JS/dadosVendedor.json") //SUBSTITUA PELO ENDEREÇO DA API
    .then(res => res.json())
    .then(dados => {
      const vendedor = dados[0]; // pega o primeiro usuário do array

      conteudoSPA.innerHTML = `<form action="" id="formCadastroVendedor" class="formulario">
            <legend>Cadastro de Vendedor</legend>

            <label for="" class="label">Nome Completo:</label> 
            <input type="text" name="nome" class="input" id="nome" value="${vendedor.nome}"> <br>

            <label for="" class="label">CPF:</label> 
            <input type="number" name="cpf" class="input" id="cpf" value="${vendedor.cpf}"> <br>

            <label for="" class="label">E-mail:</label> 
            <input type="email" name="email" class="input" id="email" value="${vendedor.email}"> <br>

            <label for="" class="label">Telefone:</label>
            <input type="tel" name="telefone" class="input" id="telefone" value="${vendedor.telefone}"> <br>

            <label for="" class="label">CEP:</label>
            <input type="text" name="cep" class="input" id="cep" value="${vendedor.cep}"> <br>

            <label for="" class="label">Chave PIX:</label> 
            <input type="text" name="pix" class="input" id="pix" value="${vendedor.pix}"> <br>

            <label for="" class="label">Senha:</label> 
            <input type="password" name="senha" class="input" id="senha" value="${vendedor.senha}"> <br>

            <label for="" class="label">Confirmar Senha:</label> 
            <input type="password" name="confirmaSenha" class="input" id="confirmaSenha" value="${vendedor.confirmaSenha}" <br>

            <button class="button" type="submit" id="criarContaVendedor" onclick="event">Confirmar</button>
            <button class="button" type="button" id="cancelar">Cancelar</button>
        </form>`;
       
        //ENVIO DOS DADOS ATUALIZADOS PARA A API
        document.getElementById("formCadastroVendedor").addEventListener("submit", function (e) {
          e.preventDefault();

          const id =  1; // Busca o vendedor de id = 1

          const dadosAtualizados = {
            nome: document.getElementById("nome").value,
            cpf : document.getElementById("cpf").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            cep: document.getElementById("cep").value,
            pix: document.getElementById("pix").value,
            senha: document.getElementById("senha").value,
            confirmaSenha: document.getElementById("confirmaSenha").value
          };
                
          // SUBSTITUIR PELO ENDEREÇO DA API
          fetch(`../JS/dadosVEndedor.json${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAtualizados)
          })
          .then(response => {
            if (response.ok) {
              alert("Dados atualizados com sucesso!");
            } else {
              alert("Erro ao atualizar dados.");
            }
          });
        });
    })
    .catch(erro => console.error('Erro ao carregar JSON:', erro));
}

// Função que exibe os cards com as ofertas cadastradas

function carregarOfertas() {
  const conteudoSPA = document.getElementById("conteudo-spa");
  conteudoSPA.innerHTML = ""; // limpa o conteúdo

  // Botão Editar
  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.id = "botaoEditar";
  botaoEditar.classList.add("button", "mb-2");
  conteudoSPA.appendChild(botaoEditar);

  // Div que conterá os cards
  const containerCards = document.createElement("div");
  containerCards.id = "container-ofertas";
  containerCards.className = "container-ofertas";
  conteudoSPA.appendChild(containerCards);

  // Requisição para buscar as ofertas
  fetch("../JS/dadosOfertas.json") // ajuste a URL
    .then(res => res.json())
    .then(ofertas => {
      if (!Array.isArray(ofertas)) {
        throw new Error("Formato inválido de resposta da API");
      }

      if (ofertas.length === 0) {
        containerCards.innerHTML = "<p>Nenhuma oferta cadastrada.</p>";
        return;
      }

       // Criar um card por oferta
      ofertas.forEach(oferta => {
        const card = document.createElement("div");
        card.classList.add("card-oferta");

        card.innerHTML = `
          <h3>${oferta.titulo}</h3>
          <img src="${oferta.fotoProduto}" alt="Imagem da oferta" class="img-oferta">
        `;

        containerCards.appendChild(card);
      });
    })
    .catch(err => {
      containerCards.innerHTML = `<p>Erro ao carregar ofertas: ${err.message}</p>`;
    });
}

// Função que exibe os cards com as publicações cadastradas

function carregarPublis() {
  const conteudoSPA = document.getElementById("conteudo-spa");
  conteudoSPA.innerHTML = ""; // limpa o conteúdo

  // Botão Editar
  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.id = "botaoEditar";
  botaoEditar.classList.add("button", "mb-2");
  conteudoSPA.appendChild(botaoEditar);

  // Div que conterá os cards
  const containerCards = document.createElement("div");
  containerCards.id = "container-ofertas";
  containerCards.className = "container-ofertas";
  conteudoSPA.appendChild(containerCards);

  // Requisição para buscar as ofertas
  fetch("../JS/dadosOfertas.json") // ajuste a URL
    .then(res => res.json())
    .then(ofertas => {
      if (!Array.isArray(ofertas)) {
        throw new Error("Formato inválido de resposta da API");
      }

      if (ofertas.length === 0) {
        containerCards.innerHTML = "<p>Nenhuma oferta cadastrada.</p>";
        return;
      }

       // Criar um card por oferta
      ofertas.forEach(oferta => {
        const card = document.createElement("div");
        card.classList.add("card-oferta");

        card.innerHTML = `
          <h3>${oferta.titulo}</h3>
          <img src="${oferta.fotoProduto}" alt="Imagem da publicação" class="img-oferta">
        `;

        containerCards.appendChild(card);
      });
    })
    .catch(err => {
      containerCards.innerHTML = `<p>Erro ao carregar publicações: ${err.message}</p>`;
    });
}