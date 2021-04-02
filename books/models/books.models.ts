import { Document, Model, model, Schema } from "mongoose";

export interface IBooks extends Document {
  isbn: string,
  title: string,
  author: string,
}

export interface Book {
  isbn: string,
  title: string,
  author: string,
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
  }
})

const Book: Model<IBooks> = model("Book", booksSchema)

export const insert  = (book: Book) => {
  const newBook = new Book(book)
  return newBook.save()
}

export default Book;