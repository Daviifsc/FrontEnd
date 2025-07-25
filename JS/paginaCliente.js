

document.addEventListener("DOMContentLoaded", () => {
  const btnInfo = document.getElementById("btn-info");
  const btnPedidos = document.getElementById("btn-pedidos");

  btnInfo.addEventListener("click", carregarFormularioEdicaoUsuario);
  btnPedidos.addEventListener("click", carregarPedidos);
});

function carregarFormularioEdicaoUsuario() {
  const conteudoSPA = document.getElementById("conteudo-spa");
  conteudoSPA.innerHTML = ""; // limpa o conteúdo

  fetch("../JS/dadosCliente.json")
    .then(res => res.json())
    .then(dados => {
      const cliente = dados[0];

      conteudoSPA.innerHTML = `<form action="" class="formulario" id="formCadastro">
        <legend>Cadastro de Clientes</legend>

        <label for="" class="label">Nome Completo:</label> <br>
        <input type="text" name="nome" class="input" id="nome" value="${cliente.nome}"> <br>

        <label for="" class="label">E-mail:</label> <br>
        <input type="email" name="email" class="input" id="email" value="${cliente.email}"> <br>

        <label for="" class="label">Telefone:</label> <br>
        <input type="tel" name="fone" class="input" id="telefone" value="${cliente.telefone}"> <br>

        <label for="" class="label">Senha:</label> <br>
        <input type="password" name="senha" class="input" id="senha" value="${cliente.senha}"> <br> 

        <label for="" class="label">Confirmar Senha:</label> <br>
        <input type="password" name="confirmaSenha" class="input" id="confirmaSenha" value="${cliente.confirmaSenha}" <br>

        <button type="submit" class="button" id="criarConta" onclick="event">Confirmar</button>
        <button class="button" type="button" id="cancelar">Cancelar</button>
      </form>`;
      
        //ENVIO DOS DADOS ATUALIZADOS PARA A API
        document.getElementById("formCadastro").addEventListener("submit", function (e) {
          e.preventDefault();

          const id =  1; // Busca o vendedor de id = 1

          const dadosAtualizados = {
            nome: document.getElementById("nome").value,
            cpf : document.getElementById("cpf").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            senha: document.getElementById("senha").value,
            confirmaSenha: document.getElementById("confirmaSenha").value
          };
                
          // SUBSTITUIR PELO ENDEREÇO DA API
          fetch(`../JS/dadosCliente.json${id}`, {
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

function carregarPedidos() {
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
  containerCards.id = "container-pedidos";
  containerCards.className = "container-pedidos";
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