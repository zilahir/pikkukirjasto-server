import { Router } from "express";
import { createNewBorrow, getBorrowHistroy, returnBook, chechBorrowStatus } from "../../borrow/controllers/borrow.controller";

const router: Router = Router()

router.post('/new', [
  createNewBorrow
])

router.get('/all', [
  getBorrowHistroy
])

router.patch('/return', [
  returnBook
])

router.get('/status/:isbn', [
  chechBorrowStatus
])

export default router