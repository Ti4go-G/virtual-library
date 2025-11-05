import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
    try {
        // Verificar se o token existe
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Por favor, faça login para acessar' });
        }

        // Verificar se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verificar se o usuário ainda existe
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Adicionar usuário à requisição
        req.user = user;
        next();
    } catch (error) {
      console.error(error);
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};


export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Acesso negado. Permissões insuficientes.'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao verificar permissões' });
    }
};
