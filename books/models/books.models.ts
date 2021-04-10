import { filter, reject } from "lodash";
import { Document, Model, model, NativeError, Schema } from "mongoose";
import { resolve } from "node-isbn";
import { cleanIsbn } from "../../src/utils/cleanIsbn";

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

export const modifyBook = (isbn: string, payload: Book) => {
  return new Promise((resolve, reject) => {
    Book.findOne({
      isbn
    }, function(err: NativeError, book: IBooks) {
      if (err) reject(err)
      
      Object.keys(payload).map((key: keyof Book) => {
        book[key] = payload[key]
      })
      book.save(function (err, updatedBook) {
        if (err) return reject(err)
        resolve(updatedBook)
    });
    })
  })
}

export default Book;
