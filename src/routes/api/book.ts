import { Router } from "express";

import { getAllFiles } from "../../file/controllers/file.controller";
import { getAllBooks, insertNewBook, searchForIsbn } from '../../../books/controllers/books.controller'

const router: Router = Router()

router.post('/new', [
  insertNewBook,
])

router.get('/isbn/:isbn', [
  searchForIsbn,
])

router.get('/files', [
  getAllFiles
])

router.get('/all', [
  getAllBooks,
])

export default router;