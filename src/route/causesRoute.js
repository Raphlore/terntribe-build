import express from "express";
import Causes from "../models/causesModel.js";  

const router = express.Router();

// POST / create a cause
router.post("/causes", async (req, res) => {
  const { title, description, imageUrl } = req.body;

  if (!title || !description || !imageUrl) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newCause = new Causes({ title, description, imageUrl });
    const savedCause = await newCause.save();
    res.status(201).json(savedCause);
  } catch (error) {
    res.status(500).json({ message: "Failed to create cause", error });
  }
});

// GET all causes
router.get("/causes", async (req, res) => {
  try {
    const causes = await Causes.find();  
    res.status(200).json(causes);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve all causes", error });
  }
});

// GET a single cause by ID
router.get("/causes/:id", async (req, res) => {
  try {
    const cause = await Causes.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }
    res.status(200).json(cause);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cause", error });
  }
});

// PUT / Update causes by id
router.put("/causes/:id", async (req, res) => {
  const { title, description, imageUrl } = req.body;

  try {
    const updatedCause = await Causes.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedCause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    res.status(200).json(updatedCause);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cause", error });
  }
});

// DELETE /causes by id
router.delete("/causes/:id", async (req, res) => {
  try {
    const deletedCause = await Causes.findByIdAndDelete(req.params.id);
    if (!deletedCause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    res.status(200).json({ message: "Cause deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cause", error });
  }
});

// POST /causes/:id/contribute

router.post("/causes/contribute/:id", async (req, res) => {
  const { name, email, amount } = req.body;

  if (!name || !email || !amount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const cause = await Causes.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    const contribution = { name, email, amount };
    cause.contributions.push(contribution);

    await cause.save();

    res.status(201).json({ message: "Contribution added successfully", contribution });
  } catch (error) {
    res.status(500).json({ message: "Failed to add contribution", error });
  }
});

export default router;
