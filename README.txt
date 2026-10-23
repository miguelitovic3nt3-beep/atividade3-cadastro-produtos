ATIVIDADE 3 - DWS
Sistema de Cadastro de Produtos

ARQUIVOS
- app.py: API Flask com rotas GET e POST.
- index.html: página do sistema.
- script.js: integração com a API usando fetch.
- style.css: estilos da página.
- requirements.txt: bibliotecas necessárias.

COMO EXECUTAR NO WINDOWS

1. Instale o Python, se ainda não estiver instalado.
2. Abra o terminal nesta pasta.
3. Instale as dependências:
   pip install -r requirements.txt

4. Inicie a API:
   python app.py

5. Deixe o terminal aberto.
6. Abra o index.html com a extensão Live Server do VS Code.

A API ficará disponível em:
http://127.0.0.1:5000/produtos

A página usa essa URL para consultar e cadastrar produtos.

OBSERVAÇÃO
O arquivo produtos.db é criado automaticamente na primeira execução.
Para publicar no GitHub, crie um repositório e siga os comandos do Git.
