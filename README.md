# API LIFECASH

API REST para gerenciamento de receitas e despesas de usuários, com controle de histórico de operações e soft delete para preservação de dados.

## Sumário

- [Objetivo do Projeto](#objetivo-do-projeto)
- [Modelo de Dados](#modelo-de-dados)
  - [Tabela: people](#tabela-people)
  - [Tabela: transactions](#tabela-transactions)
  - [Tabela: logs](#tabela-logs)
  - [Finalidade dos logs](#finalidade-dos-logs)
- [Rotas da API](#rotas-da-api)
  - [People](#people)
  - [Transactions](#transactions)
- [Decisões Técnicas Importantes](#decisões-técnicas-importantes)
  - [Soft Delete apenas em People](#soft-delete-apenas-em-people)
  - [Logs como mecanismo de auditoria](#logs-como-mecanismo-de-auditoria)
  - [MySQL2 com Pool de Conexões](#mysql2-com-pool-de-conexões)
- [Como Inicializar o Projeto](#como-inicializar-o-projeto)
  - [Rodando com Docker (Recomendado)](#rodando-com-docker-recomendado)
  - [Rodando sem Docker](#rodando-sem-docker)
- [Scripts](#scripts)
- [Conclusão](#conclusão)

## Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de:

- Explorar o uso do **mysql2**
- Trabalhar com queries **SQL manuais**
- Aplicar **arquitetura em camadas** (Controller → Service → DB)
- Implementar middlewares personalizados
- Criar um sistema de logs para auditoria
- Aplicar soft delete para manter histórico de usuários desativados
- Trabalhar com **Docker + MySQL + Healthcheck**
- Centralizar tratamento de erros

O foco principal foi reforçar fundamentos sólidos de backend e organização arquitetural.

## Modelo de Dados

O banco utilizado é o `api_data`.

#### **Tabela**: `people`
```
CREATE TABLE people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    deleted_at DATETIME NULL
) ENGINE=InnoDB;
```
**Regras importantes:**

- `email` é único.
- `deleted_at` controla o soft delete.
- `NULL` → usuário ativo
- `DATETIME` preenchido → usuário desativado

#### **Tabela**: `transactions`
```
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(300),
    price DECIMAL(10,2) NOT NULL,
    type ENUM('despesa', 'renda') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    person_id INT NOT NULL,
    CONSTRAINT fk_transaction_person_id 
        FOREIGN KEY (person_id) REFERENCES people(id)
) ENGINE=InnoDB;
```
**Regras importantes:**

- `type` pode ser:
  - despesa
  - renda
- Cada transação pertence a uma pessoa `(person_id)`
- `created_at` é gerado automaticamente pelo banco

#### **Tabela**: `logs`
```
CREATE TABLE logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    entity VARCHAR(50) NOT NULL,
    person_id INT NOT NULL,
    CONSTRAINT fk_logs_person_id 
        FOREIGN KEY (person_id) REFERENCES people(id)
) ENGINE=InnoDB;
```
#### Finalidade dos logs

A tabela logs registra todas as operações realizadas nas entidades:

- people
- transactions

**Exemplos de eventos**:

- `CREATED_PEOPLE`
- `UPDATED_PEOPLE`
- `DELETED_PEOPLE`
- `ACTIVED_PEOPLE`
- `CREATED_TRANSACTION`
- `DELETED_TRANSACTION`

Isso permite:

- **Rastreabilidade**
- **Auditoria**
- **Histórico de ações no sistema**

## Rotas da API
### PEOPLE
- **Criar pessoa**
`POST /people`

  - Body:
```
{
  "first_name": "Lucas",
  "last_name": "Domingues",
  "email": "lucas@email.com",
  "phone": "11999999999"
}
```

  - Validações:
     - Email único
     - Todos os campos obrigatórios

- **Listar pessoas ativas**
`GET /people`

Retorna apenas registros onde:

`deleted_at IS NULL`

 - **Buscar pessoa por ID**
`GET /people/:id`

Retorna apenas se `deleted_at IS NULL`.

 - **Atualizar pessoa**
`PUT /people/:id`

Body parcial permitido:
```
{
  "first_name": "Lucas Atualizado"
}
```
 - **Desativar pessoa (Soft Delete)**
`PATCH /people/:id/disable`

Atualiza:

`deleted_at = CURRENT_TIMESTAMP`

Não remove o registro fisicamente.

  - **Reativar pessoa**
`PATCH /people/:id/active`

Atualiza:

`deleted_at = NULL`

  - **Buscar logs da pessoa**
`GET /people/:id/logs`

Retorna registros da tabela logs filtrando por:

`person_id = :id AND entity = 'people'`

### TRANSACTIONS
  - **Criar transação**
`POST /transactions`

     - Body:
```
{
  "name": "Salário",
  "description": "Salário mensal",
  "price": 5000.00,
  "type": "renda",
  "person_id": 1
}
```
`type` deve ser:

"despesa" ou "renda"

Após criar:

Um log é automaticamente registrado.

  - **Listar transações**
`GET /transactions`

      - Retorna todas as transações cadastradas.

  - **Deletar transação**
`DELETE /transactions/:id`

      - Remove fisicamente do banco.
      - Registra log automaticamente.

## Decisões Técnicas Importantes
### Soft Delete apenas em People

Foi aplicado soft delete apenas na tabela people porque:
- O histórico de usuários precisa ser preservado
- Os logs dependem da existência do `person_id`
- Permite rastrear operações de usuários desativados

### Logs como mecanismo de auditoria

O sistema de logs foi pensado para:
- Registrar ações críticas
- Manter histórico mesmo após exclusões
- Facilitar rastreabilidade futura

### MySQL2 com Pool de Conexões

Foi utilizado:

- mysql2

Com:

- Pool de conexões
- Limite de 10 conexões simultâneas
- Queries SQL manuais (sem ORM)

**Objetivo**: reforçar domínio de SQL puro e controle total das queries.

## Como Inicializar o Projeto

### Rodando com Docker **(Recomendado)**

 1. Criar arquivo `.env`
 2. Executar:

```docker compose up -d```

A API estará disponível em:

`http://localhost:3000`

- Reset completo do ambiente
```npm run reset-compose```

**!Esse comando**:

- Remove containers
- Remove imagens
- Remove volumes

Reinicializa o banco usando o dump `lifecash.sql`

### Rodando sem Docker

1. Instalar dependências:

```npm install```

2. Criar banco `api_data` manualmente

3. Executar:

```npm run dev```

## Scripts

`"start": "node src/server.js"`

Executa a aplicação normalmente.

`"dev": "node --watch src/server.js"`

Executa com **hot reload** nativo do Node.

`"reset-compose": "docker compose down && docker system prune -af && docker compose up -d"`

Reseta completamente o ambiente Docker.

## Conclusão

Este projeto não foi desenvolvido apenas como um CRUD simples, mas como um exercício de:

- Organização arquitetural
- Estruturação de camadas
- Tratamento centralizado de erros
- Validação com **Zod**
- Uso de **MySQL2** com **SQL** manual
- Auditoria com logs
- Soft delete estratégico
- Containerização com **Docker**
