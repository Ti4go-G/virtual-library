import express from 'express';
import path from 'path';
import flash from 'connect-flash';

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

export default app