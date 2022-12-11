import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { connectDb } from './utils/database';
import path from 'path';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import usersRouter from './routes/usersRoute';
// import indexRouter from '../routes/index';
connectDb()
const app = express();


app.use(cors()).use(helmet())
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/user', usersRouter);
// app.use('/users', usersRouter);


export default app;
