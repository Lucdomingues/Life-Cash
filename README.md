# API LIFECASH

descrição

## Configurações iniciais

- `npm start` roda a api
- `npm run dev` roda a api em ambiente de desenvolvimento com `--watch` nativo do node para hot-reload

## Docker

No **Docker Compose** foi adicionado ao serviço de database, `healthcheck`, essa config permite verificar periodicamente se o serviço está saudável, no caso o DB:

```
healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-proot"]
      interval: 5s
      timeout: 5s
      retries: 5
```

No serviço da API adicionamos um `depends_on` com a condição de inicializar somente se `healthy` retornar "ok".

```
depends_on:
      - database:
          condition: service_healthy # espera o serviço de database estar funcionando de forma saúdavel
```
