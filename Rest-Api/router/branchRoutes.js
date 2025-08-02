

const express = require('express');
const {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch
} = require('../controllers/branchController');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getBranches);
router.get('/:id', authMiddleware, getBranchById);
router.post('/', authMiddleware, createBranch);
router.put('/:id', authMiddleware, updateBranch);
router.delete('/:id', authMiddleware, deleteBranch);

module.exports = router;
