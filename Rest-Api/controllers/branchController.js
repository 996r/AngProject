// controllers/branchController.js

const Branch = require('../models/Branch');

const getBranches = async (req, res) => {
  try {
    // const branches = await Branch.find().populate('printer_serial_numbers');
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json(branch);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.status(500).send('Server Error');
  }
};

const createBranch = async (req, res) => {
  const { branch_name, city, address, branch_code, numberOfPeoples } = req.body;
  try {
    // Check for existing branch with the same branch code
    let branch = await Branch.findOne({ branch_code });
    if (branch) {
      return res.status(400).json({ message: 'Branch with this code already exists' });
    }

    const newBranch = new Branch({
      branch_name,
      city,
      address,
      branch_code,
      numberOfPrinters: 0,
      numberOfPeoples: numberOfPeoples || 0, // Set new field
      printer_serial_numbers: []
    });

    const savedBranch = await newBranch.save();
    res.status(201).json(savedBranch);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Branch name or code must be unique' });
    }
    res.status(500).send('Server Error');
  }
};

const updateBranch = async (req, res) => {
  const { branch_name, city, address, branch_code, numberOfPeoples } = req.body;
  const updatedData = { branch_name, city, address, branch_code, numberOfPeoples };
  try {
    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json(branch);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Branch not found' });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Branch name or code must be unique' });
    }
    res.status(500).send('Server Error');
  }
};

const deleteBranch = async (req, res) => {
  try {
    // Check if the branch has any printers associated
    const branch = await Branch.findById(req.params.id);
    if (branch && branch.numberOfPrinters > 0) {
      return res.status(400).json({ message: 'Cannot delete a branch with printers. Please reassign or delete printers first.' });
    }

    const deletedBranch = await Branch.findByIdAndDelete(req.params.id);
    if (!deletedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json({ message: 'Branch removed successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = { getBranches, getBranchById, createBranch, updateBranch, deleteBranch };
