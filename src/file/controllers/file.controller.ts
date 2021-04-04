
import { Response } from 'express';
import HttpStatusCodes from "http-status-codes";

import Request from '../../types/Request'
import { uploadFile, getAll } from '../models/file.model'

export function uploadImage (request: Request, response: Response) {
  uploadFile(request).then((serverResponse: any) => {
    response.status(HttpStatusCodes.OK).send(serverResponse)
  })
}

export function getAllFiles (request: Request, response: Response) {
  getAll().then(result => {
    response.status(HttpStatusCodes.OK).send(result)
  })
}