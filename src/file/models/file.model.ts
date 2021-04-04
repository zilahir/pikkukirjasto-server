
import { Document, Model, model, Schema } from "mongoose";
import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

export interface IFile extends Document {
  isbn: string,
  url: string,
  createdAt: string | Date,
}

export interface File {
  url: string,
  isbn: string,
  createdAt: string | Date,
}

const fileSchema: Schema = new Schema({
  isbn: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
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
			Key: `${req.files.image.name}`,
			Body: req.files.image.data,
			ACL: 'public-read'
		}
		
		s3.upload(params, (err: any, data: any) => {
			if(err) {
				throw err;
			} else {
        const isbn = req.files.image.name.split('__')[0]
        insertFile({
          url: data.Location,
          isbn,
          createdAt: new Date(),
        }).then(() => {
          resolve({
            url: data.Location,
          })
        })
			}
		})
	
	})
}

export const getAll = () => {
  return File.find({})
}

export default File
