import { Response } from 'express';
import HttpStatusCodes from "http-status-codes";

import Request from '../../types/Request'
import { getAll, newBorrow, setBookAsReturned } from '../models/borrow.model';

export function createNewBorrow (request: Request, response: Response) {
  const { isbn } = request.body
  newBorrow(isbn).then(result => {
    response.status(HttpStatusCodes.OK).send(result)
  })
}

export function getBorrowHistroy (request: Request, response: Response) {
  getAll().then(result => {
    response.status(HttpStatusCodes.OK).send(result)
  })
}

export function returnBook (request: Request, response: Response) {
  const { isbn } = request.body
  setBookAsReturned(isbn).then(result => {
    response.status(HttpStatusCodes.OK).send(result)
  })
}