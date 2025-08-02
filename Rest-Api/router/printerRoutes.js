// router/printerRoutes.js

const express = require('express');
const {
  getPrinters,
  getPrinterById,
  createPrinter,
  updatePrinter,
  deletePrinter
} = require('../controllers/printerController');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

// All printer routes are protected by the authMiddleware
router.get('/', authMiddleware, getPrinters);
router.get('/:id', authMiddleware, getPrinterById);
router.post('/', authMiddleware, createPrinter);
router.put('/:id', authMiddleware, updatePrinter);
router.delete('/:id', authMiddleware, deletePrinter);

module.exports = router;
