const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    weeks: {
      type: String,
      required: true,
    },

    minimumSkill: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Course', courseSchema);
