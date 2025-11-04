import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
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
        select: false

    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/, 'Por favor insira um email valido']
    }
})



userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (!update) return next();
    if (!update.password) return next();
    try {
        const hashedPassword = await hashPassword(update.password);
        this.setUpdate({ ...update, password: hashedPassword });
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hashedPassword = await hashPassword(this.password);
        this.password = hashedPassword;
    } catch (error) {
        next(error);
    }
})
userSchema.methods.comparePassword = async function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;