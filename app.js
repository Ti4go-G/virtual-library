import express from 'express';
import path from 'path';
import flash from 'connect-flash';
import routes from './routes/index.js'
import { fileURLToPath } from 'url';
import {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)

export default app