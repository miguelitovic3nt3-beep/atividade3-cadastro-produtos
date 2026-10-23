const API_URL = "http://127.0.0.1:5000/produtos";

async function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const total = document.getElementById("total");

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar os produtos.");
        }

        const produtos = await resposta.json();
        lista.textContent = "";
        total.textContent = "Total de produtos: " + produtos.length;

        if (produtos.length === 0) {
            lista.textContent = "Nenhum produto cadastrado.";
            return;
        }

        produtos.forEach(function(produto) {
            const card = document.createElement("div");
            card.className = "produto";

            const nome = document.createElement("h3");
            nome.textContent = produto.nome;

            const preco = document.createElement("p");
            preco.textContent = "Preço: R$ " + Number(produto.preco).toFixed(2);

            const quantidade = document.createElement("p");
            quantidade.textContent = "Quantidade: " + produto.quantidade;

            card.appendChild(nome);
            card.appendChild(preco);
            card.appendChild(quantidade);
            lista.appendChild(card);
        });
    } catch (erro) {
        lista.textContent = "Erro ao carregar os produtos. Confira se a API está ligada.";
        total.textContent = "";
        console.error(erro);
    }
}

async function cadastrarProduto(dados) {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(resultado.erro || "Erro no cadastro.");
    }

    return resultado;
}

document.getElementById("formProduto").addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const mensagem = document.getElementById("mensagem");
    const botao = document.getElementById("botaoCadastrar");

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        preco: Number(document.getElementById("preco").value),
        quantidade: Number(document.getElementById("quantidade").value)
    };

    mensagem.textContent = "";
    botao.disabled = true;
    botao.textContent = "Cadastrando...";

    try {
        const resultado = await cadastrarProduto(dados);
        mensagem.textContent = resultado.mensagem;
        mensagem.className = "sucesso";
        document.getElementById("formProduto").reset();
        await listarProdutos();
    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.className = "erro";
    } finally {
        botao.disabled = false;
        botao.textContent = "Cadastrar Produto";
    }
});

listarProdutos();
