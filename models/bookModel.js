import mongoose from "mongoose";

const bookSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    bookName: {
        type: String,
        required: [true, 'o nome do livro é obrigatório'],
        minlength: 3,
        maxlength: 50,
        index: true
    },
    description: {
        type: String,
        required: [true, "uma descrição do livro é obrigatória"],
        maxlength: 2000
    },
    author: {
        type: String,
        default: 'N/A',
        required: false,
    },
    genre: {
        type: String,
        default: 'outros',
        lowercase: true,
        required: true
    },
    urlImg:{
        type: String,
        default: ''
    }

}, { timestamps: true })

bookSchema.index({ author: 1, genre: 1 });

const Book = mongoose.model('Book', bookSchema);

export default Book;