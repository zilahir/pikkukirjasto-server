import { Response, NextFunction } from 'express';
import HttpStatusCodes from "http-status-codes";
import { cleanIsbn } from '../../utils/cleanIsbn';
import { isNull } from 'lodash'

import Request from '../../types/Request'
import { getAll, newBorrow, returnBorrowStatus, setBookAsReturned } from '../models/borrow.model';

export function createNewBorrow (request: (Request & IsBorrowed), response: Response) {
  const { isbn } = request.body
  if (request.isBorrowed) {
    response.status(HttpStatusCodes.OK).send({
      isBorrowed: true,
    })
    return
  }
  newBorrow(isbn).then(result => {
    response.status(HttpStatusCodes.OK).send(result)
  })
}

export function getBorrowHistroy (request: Request, response: Response) {
  getAll().then(result => {
    response.status(HttpStatusCodes.OK).send(result)
  })
}

export function returnBook (request: (Request & IsBorrowed), response: Response) {
  const { isbn } = request.body
  if (!request.isBorrowed) {
    response.status(HttpStatusCodes.OK).send({
      isBorrowed: false,
    })
    return
  }
  setBookAsReturned(isbn).then(result => {
    response.status(HttpStatusCodes.OK).send(result)
  })
}

export function chechBorrowStatus (request: Request, response: Response) {
  const { isbn } = request.params
  returnBorrowStatus(cleanIsbn(isbn)).then(result => {
    const isBorrowed = Object.assign({}, { result, isBorrowed: !isNull(result) })
    response.status(HttpStatusCodes.OK).send(isBorrowed)
  })
}

type IsBorrowed = { isBorrowed: boolean }

export function isCurrentlyBorrowed (request: (Request & IsBorrowed), response: Response, next: NextFunction) {
  const { isbn } = request.body
  returnBorrowStatus(cleanIsbn(isbn)).then(result => {
    const isBorrowed = !isNull(result)
    request.isBorrowed = isBorrowed
    next()
  })
}