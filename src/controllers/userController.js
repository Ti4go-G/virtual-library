import User from '../models/userModel.js';
import {validatePassword, validateEmail, validateName} from '../utils/validations.js'

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const passErrors = validatePassword(password);
    const emailError = validateEmail(email);
    const nameError = validateName(name);
    const errors = [];

    if(emailError) errors.push(emailError);
    if(nameError) errors.push(nameError);
    if(passErrors.length > 0) errors.push(...passErrors);
    if(errors.length > 0) {
        //return res.render('register', { errors, name, email });
        return res.status(400).json({ errors });
    }
    try {
        const newUser = new User({ name, email, password});
        await newUser.save();
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};
export const loginUser = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: 'Por favor, forneça email e senha'})
    }

    try {
        const user = await User.findOne({email}).select('+password');
        if(!user || !(await User.comparePassword(password))){
            return res.status(401).json({message: 'Email ou senha inválidos'})
        }

        res.status(200).json({message: "login realizado com sucesso"})
    } catch (error) {
        res.status(500).json({message: 'Ocorreu um erro ao buscar o usuário'})
    }
}
export const deleteUser = async(req,res)=>{
    const { id } = req.params;
     if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de usuário inválido.' });
        }
    try {
       const deletedUser = await User.findByIdAndDelete(id);
       if (!deletedUser) {
           return res.status(404).json({ message: 'Usuário não encontrado.' });
       }
       res.status(200).json({message: 'Usuário deletado com sucesso'});
    } catch (error) {
        res.status(500).json({message: 'Ocorreu um erro ao deletar o usuário'})
    }
}
export const updateUser = async(req,res)=>{
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true },
        {runValidators: true}
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso.', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário.' });
    }
}
export const getUsers = async(req,res)=>{
    try {
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Ocorreu um erro ao buscar os usuários'})
    }
}

export const getRegisterPage = (req, res) => {
    res.render('register', { errors: [], name: '', email: '' });
}
export const getHome = (req,res)=>{
    res.render('home')
}

