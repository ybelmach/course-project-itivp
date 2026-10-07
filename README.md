# Платформа для обмена учебными материалами

Курсовая работа по дисциплине «Интернет-технологии и веб-программирование. Часть 2» (БГУИР).
Требования к работе — в [REQUIREMENTS.md](REQUIREMENTS.md).

## Стек

| Слой | Технологии |
|---|---|
| Frontend | React, TypeScript, Vite, React Router, Context API, axios, CSS-модули |
| Backend | Node.js, Express, TypeScript, Sequelize, zod, multer |
| База данных | PostgreSQL |
| Хранение файлов | MinIO (S3-совместимое хранилище) |
| Аутентификация | JWT, bcrypt |
| Тесты | Jest, Supertest |
| Развёртывание | Docker, Docker Compose, nginx |

## Структура

```
backend/    REST API (src/config, controllers, middleware, models, routes, utils; tests)
frontend/   React SPA (src/api, components, context, pages) и конфигурация nginx
docker-compose.yml
```

## Запуск всего стека в Docker

```bash
cp .env.example .env      # задать JWT_SECRET: openssl rand -hex 32
docker compose up -d --build
```

Сайт откроется на http://localhost:8080 (порт задаётся переменной `WEB_PORT`).
nginx отдаёт собранный frontend и проксирует `/api` на backend.

На сервере дополнительно нужно сменить в `.env` пароли PostgreSQL и MinIO и указать в `CORS_ORIGIN` публичный адрес сайта.

## Разработка

```bash
docker compose up -d postgres minio

cd backend && cp .env.example .env && npm install && npm run dev    # http://localhost:3000
cd frontend && npm install && npm run dev                           # http://localhost:5173
```

Dev-сервер Vite проксирует `/api` на `localhost:3000`. Консоль MinIO — http://localhost:9001.

## Проверки

```bash
cd backend && npm test && npm run typecheck
cd frontend && npm run lint && npm run build
```
