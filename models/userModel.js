import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        set: capitalize,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'A senha deve conter no minimo 8 caracteres, uma letra maiuscula, uma letra minuscula, um numero e um caractere especial']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/, 'Por favor insira um email valido']
    }
})

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    } catch (error) {
        next(error);
    }
})

userSchema.pre('save')

const User = mongoose.model("User", userSchema);

export default User;