import app from './app.js';
import dbConnection from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async ()=>{
    try {
        await dbConnection();
        app.listen(PORT, ()=>{
            console.log(`Servidor iniciado com sucesso`);
        })
    } catch (error) {
        console.error('Não foi possível iniciar o servidor', error);
    }
}
startServer();