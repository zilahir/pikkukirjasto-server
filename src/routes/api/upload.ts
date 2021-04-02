import { Router } from "express";
import { uploadImage } from "../../file/controllers/file.controller";
const fileUpload = require('express-fileupload')

const router = Router()

router.post('/upload', [
  fileUpload(),
  uploadImage
])

export default router