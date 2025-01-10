import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  contributedAt: {
    type: Date,
    default: Date.now,
  },
});

const causeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    contributions: [contributionSchema],
  },
  {
    timestamps: true,
  }
);

const Causes = mongoose.model("Causes", causeSchema);

export default Causes;
