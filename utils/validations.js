const validatePassword = (password)=>{
    let cleanPassword = password.replace(/[]/)
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
const validateEmail = (email)=>{
    let error = ''
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/.test(email)){}
};