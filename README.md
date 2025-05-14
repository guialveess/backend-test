# Backend Test - NestJS + DynamoDB
O projeto foi desenvolvido como parte de um desafio técnico para backend, com o objetivo de implementar uma API RESTful utilizando **Node.js (com NestJS)** e banco de dados **DynamoDB**, aplicando regras de negócio e estrutura escalável.
---
## 🚀 O que foi implementado
A API permite gerenciar os seguintes recursos:
### 1. **Usuários (Users)**
- Campos: `id`, `name`, `email`, `type` (`owner` ou `customer`)
- Funcionalidades:
  - Criar, buscar por ID, listar, atualizar e deletar
  - Apenas `type: "owner"` pode ser dono de estabelecimento
### 2. **Estabelecimentos (Establishments)**
- Campos: `id`, `name`, `ownerId`, `type` (`shopping` ou `local`)
- Funcionalidades:
  - CRUD completo
  - Verificação automática se o `ownerId` pertence a um usuário do tipo `owner`
### 3. **Regras de Estabelecimento (EstablishmentRules)**
- Campos: `id`, `establishmentId`, `picturesLimit`, `videoLimit`
- Funcionalidades:
  - Criar regras para controlar limites de produtos
  - Buscar por `establishmentId`, atualizar e deletar
### 4. **Produtos (Products)**
- Campos: `id`, `name`, `price`, `establishmentId`
- Funcionalidades:
  - CRUD completo
  - Validação se o estabelecimento existe antes de criar
> Todos os endpoints foram documentados no Swagger.
---
## 🔧 Tecnologias
- **Node.js** com **NestJS** (estrutura modular e escalável)
- **DynamoDB Local** via Docker
- **AWS SDK v3** para integração com Dynamo
- **UUID** para geração de IDs únicos
- **Swagger** para documentação automática da API
- **Dotenv** para gerenciamento de variáveis de ambiente
- **Vitest** para teste unitário (atualmente apenas para User)

---
## 📝 Regras de Negócio
- Um usuário **só pode criar um estabelecimento** se for do tipo `"owner"`
- Um produto **só pode ser criado** se o `establishmentId` for válido
- As regras por estabelecimento (`EstablishmentRules`) controlam limites futuros (base para extensibilidade)
---
## Como rodar o projeto localmente
### 1. Clonar o repositório
```bash
git clone https://github.com/guialveess/backend-test
cd backend-test
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar o DynamoDB local via Docker
```bash
docker run -d -p 8000:8000 --name dynamodb-local amazon/dynamodb-local
```

### 4. Criar as tabelas
```bash
npx ts-node src/database/create-users-table.ts
npx ts-node src/database/create-establishments-table.ts
npx ts-node src/database/create-establishment-rules-table.ts
npx ts-node src/database/create-products-table.ts
```

### 5. Rodar o servidor NestJS
```bash
npm run start:dev
```

A API estará disponível em:
- 📍 http://localhost:3000
- 📚 Swagger: http://localhost:3000/api

---
## Endpoints da API

### Usuários
- `POST /users` - Criar usuário
- `GET /users` - Listar todos usuários
- `GET /users/:id` - Buscar usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Estabelecimentos
- `POST /establishments` - Criar estabelecimento
- `GET /establishments` - Listar todos estabelecimentos
- `GET /establishments/:id` - Buscar estabelecimento por ID
- `PUT /establishments/:id` - Atualizar estabelecimento
- `DELETE /establishments/:id` - Deletar estabelecimento

### Regras de Estabelecimento
- `POST /establishment-rules` - Criar regras
- `GET /establishment-rules/:establishmentId` - Buscar regras por ID do estabelecimento
- `PUT /establishment-rules/:id` - Atualizar regras
- `DELETE /establishment-rules/:id` - Deletar regras

### Produtos
- `POST /products` - Criar produto
- `GET /products` - Listar todos produtos
- `GET /products/:id` - Buscar produto por ID
- `GET /products/establishment/:establishmentId` - Buscar produtos por estabelecimento
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

---
## 🧪 Testes
O projeto utiliza o **Vitest** para o teste unitário, com foco atual no módulo de usuários:

```bash
# Executar testes com interface visual
npx vitest --ui
# A UI será disponibilizada em: http://localhost:51204/__vitest__/
```

### Resultado dos testes
```
 DEV  v3.1.3 /home/guiaalves/Área de trabalho/www/backend-test
      UI started at http://localhost:51204/__vitest__/
 ✓ src/app.controller.spec.ts (1 test) 4ms
 ✓ src/user/user.service.spec.ts (5 tests) 12ms
 ✓ src/user/user.controller.spec.ts (1 test) 17ms
 Test Files  3 passed (3)
      Tests  7 passed (7)
   Start at  13:54:57
   Duration  989ms (transform 226ms, setup 241ms, collect 1.43s, tests 33ms, environment 1ms, prepare 476ms)
```

---
## Roadmap e Melhorias Futuras
- [ ] Implementar autenticação JWT
- [ ] Adicionar validações adicionais nos endpoints
- [ ] Implementar paginação nas listagens
- [ ] Criar mais testes unitários e de integração
- [ ] Adicionar CI/CD pipeline
- [ ] Implementar monitoramento e logging

---
## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido por [Guilherme Alves](https://github.com/guialveess) 👨‍💻