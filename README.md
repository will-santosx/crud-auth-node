# Quick Notes - CRUD API
Este projeto é uma API para o aplicativo web [Quick Notes](https://github.com/will-santosx/quick-notes), que inclui autenticação de usuário com JWT e um CRUD para anotações. A API foi desenvolvida utilizando Node.js, TypeScript, Express e Prisma.

## Funcionalidades

- Registro de usuário
- Login de usuário
- Criação, leitura, atualização e exclusão de anotações
- Autenticação e autorização usando JWT

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma
- SQLite
- bcryptjs
- jsonwebtoken
- dotenv

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/will-santosx/crud-auth-node.git
   cd crud-auth-node
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente:

    - Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
      
      ```sh
      DATABASE_URL="your_db_url"
      JWT_SECRET="your_secret_key"
      PORT=5000
      ```
4. Execute as migrações do Prisma para configurar o banco de dados:
    ```sh
    npx prisma migrate dev --name init
    npx prisma generate
    ```

## Uso

1. Inicie o servidor:
    ```sh
    npm run dev
    ```
2. A API estará disponível em http://localhost:5000.

## Endpoints

  ### Autenticação

  1. __POST /api/auth/register__ ; Registra um novo usuário.
  ```
  Request Body:
   
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
  
  2. __POST /api/auth/login__ ; Faz login de um usuário; Requer token JWT no header de Authorization.
   ```
  Request Body:
  	
  {
    "title": "Minha Anotação",
    "content": { "text": "Conteúdo da anotação" },
    "color": "blue | red | green | purple"
  }
  ```

### Anotações

  1. __GET /api/notes/__ ; Retorna todas as anotações do usuário autenticado ; Requer token JWT no header de Authorization.
  
  2. __PUT /api/notes/__ ; Atualiza uma anotação existente ;
  ```
  Request Body (um ou mais campos podem ser enviados):
  	
  {
    "title": "Novo Título",
    "content": { "text": "Novo conteúdo" },
    "color": "#00ff00"
  }
  ```
  
  3. __DELETE /api/notes/__ ; Deleta uma anotação existente ; Requer token JWT no header de Authorization.

## Segurança

  - Senhas são armazenadas de forma segura utilizando hash (bcrypt).
  - JWT é utilizado para autenticação e autorização.
  - Middleware de autenticação verifica a validade do token JWT antes de permitir acesso às rotas protegidas.

## Licença

Este projeto está licenciado sob a licença MIT.

   
