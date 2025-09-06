export const validatePassword = (password)=>{
    const errors = [];
    if(password.length <8){
        errors.push('No mínimo 8 caracteres');
    }
    if(!/[A-Z]/.test(password)){
        errors.push('Pelo menos uma letra maiúscula');
    }
    if(!/[a-z]/.test(password)){
        errors.push('Pelo menos uma letra minúscula');
    }
    if(!/\d/.test(password)){
        errors.push('Pelo menos um número');
    }
    if(!/[@$!%*?&]/.test(password)){
        errors.push('Pelo menos um caractere especial');
    }
    return errors
}
export const validateEmail = (email)=>{
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/.test(email)){
        return 'Insira um e-mail válido'
    }
};
export const validateName = (name)=>{
    if(name.length <2 || name.length >50){
        return 'O nome deve ter entre 2 e 50 caracteres'
    }
}