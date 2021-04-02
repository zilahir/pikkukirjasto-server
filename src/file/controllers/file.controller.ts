
import { Response } from 'express';

import Request from '../../types/Request'
import { uploadFile } from '../models/file.model'

export function uploadImage (request: Request, response: Response) {
  uploadFile(request).then((isSuccess: Boolean) => {
    response.status(200).send({
      isSuccess,
    })
  })
}