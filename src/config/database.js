import mongoose from 'mongoose';
import dotenv from'dotenv';
dotenv.config();

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB_ACESS);
        console.log('Conectado ao banco de dados com sucesso');
    } catch (error) {
        console.error('falha ao conectar com o banco de dados', error.message);
        process.exit(1);
    }
}
export default dbConnection;