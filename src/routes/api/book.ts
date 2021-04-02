import { Router } from "express";

import { insertNewBook, searchForIsbn } from '../../../books/controllers/books.controller'

const router: Router = Router()

router.post('/new', [
  insertNewBook,
])

router.get('/isbn/:isbn', [
  searchForIsbn,
])

export default router;