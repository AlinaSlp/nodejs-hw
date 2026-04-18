import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// глобальні middleware
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// підключення валідації
app.use(authRoutes);

// підключаємо групу маршрутів нотаток
app.use(notesRoutes);

// Додаємо раути користувача
app.use(userRoutes);

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

// обробка помилок від celebrate (валідація)
app.use(errors());

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

await connectMongoDB();

// запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
