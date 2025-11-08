# 📚 Biblioteca Virtual

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green)](https://www.mongodb.com/)

Uma API RESTful para gerenciamento de uma biblioteca virtual, desenvolvida com Node.js, Express e MongoDB. Permite aos usuários se registrarem, fazerem login e gerenciarem seus livros pessoais, com funcionalidades de autenticação JWT e controle de acesso baseado em roles (usuário e admin).

## ✨ Funcionalidades

- 🔐 **Autenticação de Usuários**: Registro, login e validação de credenciais.
- 👥 **Gerenciamento de Usuários**: CRUD completo para usuários (apenas admins podem listar/deletar).
- 📖 **Gerenciamento de Livros**: Usuários podem criar, listar, atualizar e deletar seus próprios livros.
- ✅ **Validação de Dados**: Validações robustas para senhas, emails e nomes.
- 🔒 **Hashing de Senhas**: Uso de bcrypt para segurança.
- 🎫 **Autenticação JWT**: Tokens para sessões seguras.
- 💾 **Sessões com MongoDB**: Armazenamento de sessões usando connect-mongo.
- 🎨 **Views EJS**: Páginas básicas para home, login e registro (**vazias, pois provavelmente serão implementadas com Reactjs no futuro**).
- 🛡️ **Middleware de Autenticação**: Proteção de rotas com verificação de token e roles.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework web para Node.js.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: ODM para MongoDB.
- **EJS**: Motor de templates para views.
- **JWT (jsonwebtoken)**: Para autenticação baseada em tokens.
- **bcrypt**: Para hashing de senhas.
- **connect-flash**: Para mensagens flash (embora não esteja sendo usado ativamente nas rotas atuais).
- **express-session**: Para gerenciamento de sessões.
- **connect-mongo**: Store de sessões no MongoDB.
- **dotenv**: Para variáveis de ambiente.
- **Nodemon**: Para desenvolvimento com recarregamento automático.

## 📁 Estrutura do Projeto

```
biblioteca-virtual/
├── .editorconfig          # Configurações de editor
├── .env                   # Variáveis de ambiente (não versionado)
├── .gitignore             # Arquivos ignorados pelo Git
├── app.js                 # Configuração principal da aplicação Express
├── server.js              # Ponto de entrada do servidor
├── package.json           # Dependências e scripts
├── README.md              # Este arquivo
├── public/                # Arquivos estáticos (CSS, JS, imagens)
├── src/
│   ├── config/
│   │   ├── database.js    # Conexão com MongoDB
│   │   └── sessionConfig.js # Configuração de sessões
│   ├── controllers/
│   │   ├── userController.js # Lógica para usuários
│   │   └── bookController.js # Lógica para livros
│   ├── middlewares/
│   │   └── auth.js        # Middlewares de autenticação e autorização
│   ├── models/
│   │   ├── userModel.js   # Schema do usuário
│   │   └── bookModel.js   # Schema do livro
│   ├── routes/
│   │   ├── index.js       # Roteador principal
│   │   ├── userRoute.js   # Rotas de usuários
│   │   └── bookRoute.js   # Rotas de livros (nota: não integrado ao index.js ainda)
│   ├── utils/
│   │   └── validations.js # Funções de validação
│   ├── css/               # Estilos CSS
│   └── js/                # Scripts JavaScript
└── views/                 # Templates EJS
    ├── home.ejs           # Página inicial
    ├── loginView.ejs      # Página de login (vazia)
    └── registerView.ejs   # Página de registro (vazia)
```

## 🚀 Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Ti4go-G/virtual-library.git
   cd virtual-library
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   DB_ACCESS=sua_URL # URL de conexão com MongoDB(**No momento, ainda é necessário que você crie um cluster próprio no mongoDB e insira sua URL de conexão aqui**)
   JWT_SECRET=sua_chave_secreta_jwt_aqui                  # Chave secreta para JWT
   JWT_EXPIRES_IN=1h                                       # Expiração do token JWT
   SESSION_SECRET=sua_chave_secreta_sessao_aqui            # Chave secreta para sessões
   PORT=3000                                               # Porta do servidor (opcional, padrão 3000)
   ```

4. **Inicie o MongoDB**:
   Certifique-se de que o MongoDB esteja rodando localmente ou configure a URL no `.env`.

5. **Execute o servidor**:
   ```bash
   npm run dev
   ```
   O servidor iniciará em `http://localhost:3000`.

## 📋 Uso

### 🔗 API Endpoints

#### 👥 Usuários

| Método | Endpoint          | Descrição                          | Autenticação | Admin |
|--------|-------------------|------------------------------------|--------------|-------|
| GET    | `/users/`         | Renderiza a página inicial         | Não          | Não   |
| POST   | `/users/login`    | Faz login do usuário               | Não          | Não   |
| POST   | `/users/register` | Registra um novo usuário           | Não          | Não   |
| GET    | `/users/all`      | Lista todos os usuários            | Sim          | Sim   |
| GET    | `/users/:id`      | Busca um usuário por ID            | Sim          | Não   |
| PUT    | `/users/update/:id`| Atualiza um usuário               | Sim          | Não   |
| DELETE | `/users/delete/:id`| Deleta um usuário                 | Sim          | Sim   |

#### 📚 Livros

| Método | Endpoint       | Descrição                          | Autenticação | Público |
|--------|----------------|------------------------------------|--------------|---------|
| GET    | `/books/all`   | Lista todos os livros              | Não          | Sim     |
| GET    | `/books/`      | Lista livros do usuário logado     | Sim          | Não     |
| GET    | `/books/:id`   | Busca um livro por ID              | Não          | Sim     |
| POST   | `/books/`      | Cria um novo livro                 | Sim          | Não     |
| PUT    | `/books/:id`   | Atualiza um livro                  | Sim          | Não     |
| DELETE | `/books/:id`   | Deleta um livro                    | Sim          | Não     |

> **Nota**: As rotas de livros não estão integradas ao roteador principal (`src/routes/index.js`). Para ativá-las, adicione `router.use('/books', bookRoute)` no `index.js` e importe `bookRoute`.

### 🔐 Autenticação
- Use o header `Authorization: Bearer <token>` para rotas protegidas.
- Tokens são gerados no login e expiram conforme `JWT_EXPIRES_IN`.

### 🖥️ Views
- `GET /users/` renderiza `views/home.ejs`.
- As páginas de login e registro estão definidas nos controladores mas as views estão vazias.

## ✅ Validações

- **🔑 Senha**: Mínimo 8 caracteres, pelo menos uma maiúscula, minúscula, número e caractere especial.
- 📧 **Email**: Deve ser um email válido.
- 👤 **Nome**: Entre 2 e 50 caracteres.
- 📖 **Livros**: Nome obrigatório (3-50 chars), descrição obrigatória (máx 2000 chars), etc.

## 🛠️ Desenvolvimento


- **Scripts**:
  - `npm run dev`: Inicia o servidor com nodemon.
  - `npm test`: (Não configurado).

## 🤝 Contribuição

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a ISC License. Veja o arquivo `package.json` para detalhes.

## 👨‍💻 Autor

Tiago G. - [GitHub](https://github.com/Ti4go-G)

## 🔗 Repositório

[https://github.com/Ti4go-G/virtual-library](https://github.com/Ti4go-G/virtual-library)
