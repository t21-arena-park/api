<p align="center">
  <img alt="Logo T21 Arena Park" src=".github/logo.png" width="200px" />
</p>

<p align="center">
Aplicação desenvolvida para o controle de uma escola de futebol para alunos com síndrome de Down.
</p>

<p align="center">
  <a href="#-ideia">Ideia</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-configuração-do-ambiente">Configuração do ambiente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>
</p>

## 💡 Ideia

O projeto consiste em uma plataforma para gerenciamento de uma escola de futebol para alunos com síndrome de Down. Com ele, é possível configurar organizações, gerenciar voluntários e atletas, além de realizar avaliações de desempenho dos alunos.

## 🔧 Configuração do ambiente

1. **Clone o repositório**:

```bash
git clone https://github.com/t21-arena-park/api.git
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Configuração do banco de dados com Docker**:

Se você ainda não tiver um container PostgreSQL rodando, utilize o Docker Compose para criar um:

```bash
docker-compose up -d
```

_ou_

```bash
docker run -d --name api-t21-arenapark-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=db_arenapark -p 5432:5432 bitnami/postgresql
```

Isso irá iniciar um container PostgreSQL configurado com as credenciais e o banco de dados necessários para o projeto.

4. **Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis**:

Para rodar o projeto localmente, é necessário criar um arquivo .env.local na raiz do projeto com as seguintes variáveis:

```bash
# Environment
NODE_ENV="dev"

# Auth
JWT_SECRET="t21-arena-park"

# Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/db_arenapark?schema=public"
```

Você também pode copiar e colar o que está dentro do arquivo `.env.example`, porém deve mudar o **db_name**.

5. **Rode as migrations já criadas**:

Para aplicar as migrations ao banco de dados, execute:

```bash
npx prisma migrate deploy
```

6. **Inicie o servidor de desenvolvimento**:

```bash
npm run dev
```

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node.js
- Fastify
- Prisma ORM
- PostgreSQL
- TypeScript
- Zod
- dotenv
