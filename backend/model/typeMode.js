const mongoose = require("mongoose");

const typingTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    wpm: {
      type: Number,
      required: true,
      min: [0, "WPM cannot be negative"],
    },
    difficulty: {
      type: String,
      required: true,
    },
    accuracy: {
      type: Number, // percentage
      min: [0, "Accuracy cannot be less than 0%"],
      max: [100, "Accuracy cannot be more than 100%"],
      default: 100,
    },
    testDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("TypingTest", typingTestSchema);
