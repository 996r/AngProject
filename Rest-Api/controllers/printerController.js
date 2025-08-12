const Printer = require("../models/Printer");
const Branch = require("../models/Branch");
const { message } = require("statuses");
const { error } = require("console");
const { findByIdAndDelete } = require("../models/User");

const getPrinters = async (req, res) => {
  try {
    printers = await Printer.find().populate(
      "branch",
      "branch_name branch_code"
    );
    res.json(printers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getPrinterById = async (req, res) => {
  try {
    const printer = await Printer.findById(req.params.id).populate(
      "branch",
      "branch_name branch_code"
    );
    if (!printer) {
      return res.status(404).json({ message: "Printer not found" });
    }
    res.json(printer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Printer not found" });
    }
    res.status(500).send("Server Error");
  }
};

const createPrinter = async (req, res) => {
  const {
    model,
    serialNumber,
    address,
    ipAddress,
    macAddress,
    totalCounter,
    branch_code,
  } = req.body;

  try {
    const branch = await Branch.findOne({ branch_code });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    const newPrinter = new Printer({
      model,
      serialNumber,
      address,
      ipAddress,
      macAddress,
      totalCounter,
      branch: branch._id,
      branch_code,
    });

    const printer = await newPrinter.save();
    branch.numberOfPrinters = branch.numberOfPrinters + 1;
    branch.printer_serial_numbers.push(printer.serialNumber);
    await branch.save();

    res.status(201).json(printer);
  } catch (err) {
    console.error(err.message);
    if (err.code === 1000) {
      return res
        .status(400)
        .json({ message: "Serial number or branch code must be unique" });
    }
    res.status(500).send("Server Error");
  }
};

const updatePrinter = async (req, res) => {
  const {
    model,
    serialNumber,
    address,
    ipAddress,
    macAddress,
    totalCounter,
    branch_code,
  } = req.body;
  const updatedData = {
    model,
    serialNumber,
    address,
    ipAddress,
    macAddress,
    totalCounter,
    branch_code,
  };

  try {
    const originalPrinter = await Printer.findById(req.params.id);
    if (!originalPrinter) {
      return res.status(404).json({ message: "Printer not found" });
    }
    if (originalPrinter.branch_code !== branch_code) {
      const newBranch = await Branch.findOne({ branch_code });
      if (!newBranch) {
        return res.status(404).json({ message: "New Branch not found" });
      }
      const oldBranch = await Branch.findById(originalPrinter.branch);
      if (oldBranch) {
        oldBranch.numberOfPrinters =
          oldBranch.numberOfPrinters > 0 ? oldBranch.numberOfPrinters - 1 : 0;
        oldBranch.printer_serial_numbers =
          oldBranch.printer_serial_numbers.filter(
            (sn) => sn !== originalPrinter.serialNumber
          );
        await oldBranch.save();
      }
      newBranch.numberOfPrinters = newBranch.numberOfPrinters + 1;
      newBranch.printer_serial_numbers.push(originalPrinter.serialNumber);
      await newBranch.save();
      updatedData.branch = newBranch._id;
    }
    const printer = await Printer.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true, runValidators: true }
    ).populate("branch", "branch_name branch_code");
    if (!printer) {
      return res.status(404).json({ message: "Printer not found" });
    }
    res.json(printer);
  } catch (err) {
    console.err(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Printer not found" });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: "Serial number must be unique" });
    }
    res.status(500).send("Server Error");
  }
};

const deletePrinter = async (req, res) => {
  try {
    
    const printer = await Printer.findByIdAndDelete(req.params.id);

    if (!printer) {
      return res.status(404).json({ message: "Printer not found" });
    }

    
    const branch = await Branch.findById(printer.branch);

    if (branch) {
      branch.numberOfPrinters =
        branch.numberOfPrinters > 0 ? branch.numberOfPrinters - 1 : 0;
      branch.printer_serial_numbers = branch.printer_serial_numbers.filter(
        (sn) => sn !== printer.serialNumber
      );
      await branch.save();
    }
    res.json({ message: "Printer removed successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Printer not found" });
    }
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getPrinters,
  getPrinterById,
  createPrinter,
  updatePrinter,
  deletePrinter,
};
