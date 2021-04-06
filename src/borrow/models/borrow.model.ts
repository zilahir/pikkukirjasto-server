import { bool } from "aws-sdk/clients/signer";
import { Document, Model, model, Schema } from "mongoose";

export interface IBorrow extends Document {
  isbn: string,
  createdAt: string | Date,
  isBorrowed: Boolean
}

export interface Borrow {
  isbn: string,
  createdAt: string | Date,
  isBorrowed: Boolean
}

export const newBorrow = (isbn: string) => {
  const borrow = {
    isbn,
    isBorrowed: true,
    createdAt: new Date()
  }
  const newBorrow = new Borrow(borrow)
  return newBorrow.save()
}

export const getAll = () => {
  return Borrow.find({})
}

export const setBookAsReturned = (isbn: string) => {
  return new Promise((resolve, reject) => {
    Borrow.findOne({
      isBorrowed: true,
      isbn,
    }, function(err: any, borrow: IBorrow) {
      if (err) reject(err)
      borrow.isBorrowed = false
      borrow.save().then(() => {
        resolve({
          isSuccess: true,
        })
      })
    })
  })
}

export const returnBorrowStatus = (isbn: string) => {
  return Borrow.findOne({
    isbn,
    isBorrowed: true,
  })
}


const borrowSchema: Schema = new Schema({
  isbn: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  isBorrowed: {
    type: Boolean,
    required: true,
  },
})

const Borrow: Model<IBorrow> = model('Borrow', borrowSchema)

export default Borrow