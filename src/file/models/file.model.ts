
import { Document, Model, model, Schema } from "mongoose";
import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

import { IBooks } from "../../../books/models/books.models"

export interface IFile extends Document {
  book?: IBooks["_id"],
  url: string,
}

export interface File {
  url: string,
}

const fileSchema: Schema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book"
  },
  url: {
    type: String,
    requiired: true,
  }
})

const File: Model<IFile> = model("File", fileSchema)

const insertFile = (fileData: File) => {
  const file = new File(fileData)
  return file.save()
}

export const uploadFile = (req: any) => {
	return new Promise(resolve => {
		const s3 = new AWS.S3({
			accessKeyId: process.env.AWS_ACCESS,
			secretAccessKey: process.env.AWS_SECRET,
		})

		const params = {
			Bucket: process.env.AWS_BUCKET,
			Key: req.files.image.name,
			Body: req.files.image.data,
			ACL: 'public-read'
		}
		
		s3.upload(params, (err: any, data: any) => {
			if(err) {
				throw err;
			} else {
        insertFile({
          url: data.Location,
        })
			}
		})
		
		resolve(true)
	})
}

export default File
