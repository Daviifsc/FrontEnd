/*document.addEventListener('DOMContentLoaded', () => {
    const btnCadastroVendedor = document.getElementById('cadastroVendedor');
    const formUsuario = document.getElementById('formUsuario');
    const formVendedor = document.getElementById('formVendedor');

    btnCadastroVendedor.addEventListener('click', (e) => {
        e.preventDefault();

        // Mostra o formulário de vendedor
        formVendedor.style.display = 'block';

        // Preenche o conteúdo do formulário de vendedor
        formVendedor.innerHTML = `
        <form action="" class="formulario">
        <legend>Cadastro de Vendedor</legend>

        <label for="" class="label">Foto Frontal:</label> <br>
        <input type="image" name="fotoVendedor" class="input" id=""> <br>

        <label for="" class="label">Foto RG:</label> <br>
        <input type="image" name="rg" class="input" id="rg"> <br>

        <label for="" class="label">Endereço:</label> <br>
        <input type="text" name="endereco" class="input" id=""> <br>

        <label for="" class="label">Região Atuação:</label> <br>
        <input type="text" name="regiao" class="input" id="regiao"> <br>

        <label for="" class="label">Chave PIX:</label> <br>
        <input type="text" name="pix" class="input" id="pix"> <br>

        <button class="button" type="submit">Confirmar</button>
        <button class="button" type="submit" id="cancelar">Cancelar</button>
    </form>
        `;

        // Adiciona botão para voltar ao formulário de usuário
        const btnCancelar = document.getElementById('cancelar');
        btnCancelar.addEventListener('click', (e) => {
            e.preventDefault();
            formVendedor.style.display = 'none';
        });
    });
}); */
