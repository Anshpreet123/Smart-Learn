const mongoose = require('mongoose');

// Schema for individual videos
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number, // duration in minutes
    required: true,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
});

// Schema for individual lessons within a week
const lessonSchema = new mongoose.Schema({
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
  order: {
    type: Number,
    required: true,
  },
  videos: [videoSchema],
  resources: [
    {
      title: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['pdf', 'doc', 'link', 'other'],
        default: 'other',
      },
    },
  ],
  assignment: {
    description: String,
    dueDate: Date,
    totalPoints: Number,
  },
});

// Schema for course weeks
const weekSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
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
  learningObjectives: [
    {
      type: String,
      required: true,
    },
  ],
  lessons: [lessonSchema],
});

// Main course schema
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
    thumbnail: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number, // Total course duration in weeks
      required: true,
    },
    minimumSkill: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    prerequisites: [
      {
        type: String,
        trim: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    weeklyContent: [weekSchema],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    enrollmentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual populate for reviews
courseSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'course',
  justOne: false,
});

// Middleware to update average rating when reviews change
courseSchema.statics.calculateAverageRating = async function (courseId) {
  const stats = await this.model('Review').aggregate([
    {
      $match: { course: courseId },
    },
    {
      $group: {
        _id: '$course',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  await this.findByIdAndUpdate(courseId, {
    averageRating: stats[0]?.averageRating || 0,
  });
};

module.exports = mongoose.model('Course', courseSchema);
