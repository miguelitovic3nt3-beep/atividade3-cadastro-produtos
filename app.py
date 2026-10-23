from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def conectar():
    return sqlite3.connect("produtos.db")

def criar_tabela():
    conexao = conectar()
    conexao.execute("""
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            quantidade INTEGER NOT NULL
        )
    """)
    conexao.commit()
    conexao.close()

@app.route("/produtos", methods=["GET"])
def listar_produtos():
    conexao = conectar()
    conexao.row_factory = sqlite3.Row
    produtos = conexao.execute("SELECT * FROM produtos").fetchall()
    conexao.close()
    return jsonify([dict(produto) for produto in produtos])

@app.route("/produtos", methods=["POST"])
def cadastrar_produto():
    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "Dados não enviados"}), 400

    nome = str(dados.get("nome", "")).strip()

    try:
        preco = float(dados.get("preco", 0))
        quantidade = int(dados.get("quantidade", -1))
    except (ValueError, TypeError):
        return jsonify({"erro": "Preço ou quantidade inválidos"}), 400

    if not nome or preco <= 0 or quantidade < 0:
        return jsonify({"erro": "Preencha os dados corretamente"}), 400

    conexao = conectar()
    cursor = conexao.execute(
        "INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)",
        (nome, preco, quantidade)
    )
    conexao.commit()
    produto_id = cursor.lastrowid
    conexao.close()

    return jsonify({
        "id": produto_id,
        "nome": nome,
        "preco": preco,
        "quantidade": quantidade,
        "mensagem": "Produto cadastrado com sucesso!"
    }), 201

criar_tabela()

if __name__ == "__main__":
    app.run(debug=True)
