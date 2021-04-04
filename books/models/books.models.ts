import { Document, Model, model, Schema } from "mongoose";

export interface IBooks extends Document {
  isbn: string,
  title: string,
  author: string,
  cover: string,
}

export interface Book {
  isbn: string,
  title: string,
  author: string,
  cover: string,
}

const booksSchema: Schema = new Schema({
  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true
  }
})

const Book: Model<IBooks> = model("Book", booksSchema)

export const insert  = (book: Book) => {
  const newBook = new Book(book)
  return newBook.save()
}

export const allBooks = () => {
  return Book.find({})
}

export default Book;