import { Response } from "express";
import HttpStatusCodes from "http-status-codes";
import IsbnApi from 'node-isbn'

import Request from '../../src/types/Request'
import { IBooks, insert } from '../models/books.models'


export function insertNewBook (request: Request, response: Response) {
  const { isbn, title, author } = request.body
  const newBookPayload = {
    isbn,
    title,
    author,
  }
  insert(newBookPayload).then((result: IBooks) => {
    response.status(HttpStatusCodes.OK).send(result)
  })
}

export function searchForIsbn (request: Request, response: Response) {
  const { isbn } = request.params
  IsbnApi.resolve(isbn, function(err, book) {
    if (err) {
      response.status(HttpStatusCodes.NOT_FOUND).send({
        isSuccess: false,
      })
    } else {
        response.status(HttpStatusCodes.OK).send({
          isSuccess: true,
          ...book,
        })
    }
  })
}