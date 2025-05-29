document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const fone = document.getElementById('fone').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    // Validação para campos vazios
    if (!nome || !email || !fone || !senha || !confirmaSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha !== confirmaSenha) {
        alert('As senhas não conferem!');
        return;
    }

    const dados = { nome, email, fone, senha };

    fetch('https://jsonplaceholder.typicode.com/posts', {
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
