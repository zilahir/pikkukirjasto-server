import { Router } from "express";
import { createNewBorrow, getBorrowHistroy, returnBook, chechBorrowStatus, isCurrentlyBorrowed } from "../../borrow/controllers/borrow.controller";

const router: Router = Router()

router.post('/new', [
  isCurrentlyBorrowed,
  createNewBorrow
])

router.get('/all', [
  getBorrowHistroy
])

router.patch('/return', [
  isCurrentlyBorrowed,
  returnBook
])

router.get('/status/:isbn', [
  chechBorrowStatus
])

export default router