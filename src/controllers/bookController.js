import Book from '../models/bookModel';

export const createBook = async (req, res) => {
  const { bookName, description, author, genre, urlImg } = req.body;
  try {
    const newBook = new Book({
      user: req.user._id,
      bookName, description, author, genre, urlImg
    });
    await newBook.save();
    res.status(201).json({ message: 'Livro criado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o livro', error })
  }
}

export const getBooksByUser = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).populate('user', 'name email').select('-__v')
    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({ message: 'erro ao buscar livros', error })
  }
}
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    return res.status(200).json(books)
  } catch (error) {
    res.status(500).json({ message: 'erro ao buscar livros', error })
  }
}
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findOneAndDelete({
      _id: id,
      user: req.user._id // Verifica permissão na mesma query
    })
    if (!book) {
      return res.status(404).json({ message: 'livro nao encontrado' })
    }

    res.status(200).json({ message: 'livro deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'erro ao deletar o livro', error })
  }
}

export const updateBook = async (req, res) => {
  const { id } = req.params
  const { bookName, description, author, genre, urlImg } = req.body;

  try {
    const book = await Book.findOneAndUpdate({
      _id: id,
      user: req.user._id
    },
    {
      bookName,
      description,
      author,
      genre,
      urlImg
    },
    {
      new: true,
      runValidators: true
    }

    )
    if(!book){
      return res.status(404).json({
        message:'livro nao encontrado'
      })
    }
    res.status(200).json({message: 'livro atualizado com sucesso'})
  } catch (error) {
    res.status(500).json({message:'erro ao atualizar o livro'})
  }

}
