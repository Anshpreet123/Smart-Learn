const mongoose = require('mongoose');
const Course = require('./../models/courses.model'); // Adjust path as needed
const User = require('./../models/users.model'); // Adjust path as needed
const Category = require('./../models/courses.model'); // Adjust path as needed

const dotenv = require('dotenv');
dotenv.config({
  path: './config/.env',
});
// Configuration
const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/smartLearn',
  numberOfCourses: 5,
};

// Sample data arrays
const courseTopics = [
  {
    title: 'Web Development Fundamentals',
    category: 'Web Development',
    description: 'Learn the basics of web development including HTML, CSS, and JavaScript',
  },
  {
    title: 'Advanced React Development',
    category: 'Frontend Development',
    description: 'Master React.js with advanced concepts and real-world projects',
  },
  {
    title: 'Node.js Backend Development',
    category: 'Backend Development',
    description: 'Build scalable backend applications with Node.js and Express',
  },
  {
    title: 'Python Programming Masterclass',
    category: 'Programming',
    description: 'Comprehensive Python programming from basics to advanced concepts',
  },
  {
    title: 'Machine Learning Basics',
    category: 'Data Science',
    description: 'Introduction to machine learning algorithms and implementations',
  },
];

const sampleVideos = [
  {
    title: 'Introduction to the Course',
    description: 'Overview of what you will learn',
    videoUrl: 'https://example.com/video1',
    duration: 15,
    thumbnail: 'https://example.com/thumbnail1.jpg',
  },
  {
    title: 'Setting Up Your Environment',
    description: 'Step-by-step environment setup guide',
    videoUrl: 'https://example.com/video2',
    duration: 20,
    thumbnail: 'https://example.com/thumbnail2.jpg',
  },
  {
    title: 'Core Concepts',
    description: 'Understanding the fundamental concepts',
    videoUrl: 'https://example.com/video3',
    duration: 25,
    thumbnail: 'https://example.com/thumbnail3.jpg',
  },
];

// Helper function to generate random lessons
const generateLessons = (weekNumber) => {
  const numberOfLessons = Math.floor(Math.random() * 3) + 2; // 2-4 lessons per week
  const lessons = [];

  for (let i = 0; i < numberOfLessons; i++) {
    lessons.push({
      title: `Lesson ${i + 1} of Week ${weekNumber}`,
      description: `Detailed description for Lesson ${i + 1}`,
      order: i + 1,
      videos: sampleVideos.map((video) => ({
        ...video,
        title: `${video.title} - Lesson ${i + 1}`,
        videoUrl: `${video.videoUrl}/${weekNumber}/${i + 1}`,
      })),
      resources: [
        {
          title: `Lesson ${i + 1} Notes`,
          fileUrl: `https://example.com/resources/week${weekNumber}/lesson${i + 1}.pdf`,
          type: 'pdf',
        },
        {
          title: `Additional Reading`,
          fileUrl: `https://example.com/resources/week${weekNumber}/reading${i + 1}.pdf`,
          type: 'pdf',
        },
      ],
      assignment: {
        description: `Complete the exercises for Lesson ${i + 1}`,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 1 week
        totalPoints: 100,
      },
    });
  }

  return lessons;
};

// Helper function to generate weekly content
const generateWeeks = (numberOfWeeks) => {
  const weeks = [];

  for (let i = 0; i < numberOfWeeks; i++) {
    weeks.push({
      weekNumber: i + 1,
      title: `Week ${i + 1}`,
      description: `Detailed description for Week ${i + 1}`,
      learningObjectives: [
        `Understand core concepts of Week ${i + 1}`,
        `Complete practical exercises`,
        `Build a mini-project`,
      ],
      lessons: generateLessons(i + 1),
    });
  }

  return weeks;
};

// Main seeder function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Create a sample instructor if none exists
    let instructor = await User.findOne({ role: 'instructor' });
    if (!instructor) {
      instructor = await User.create({
        name: 'John Doe',
        email: 'instructor@example.com',
        password: 'password123',
        role: 'instructor',
      });
    }

    // Create sample categories if none exist
    const categories = [];
    for (const topic of courseTopics) {
      let category = await Category.findOne({ name: topic.category });
      if (!category) {
        category = await Category.create({
          name: topic.category,
          description: `${topic.category} courses`,
        });
      }
      categories.push(category);
    }

    // Generate and insert courses
    const coursePromises = courseTopics.map((topic, index) => {
      const duration = Math.floor(Math.random() * 4) + 4; // 4-8 weeks
      return Course.create({
        title: topic.title,
        description: topic.description,
        duration: duration,
        minimumSkill: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
        price: Math.floor(Math.random() * 100) + 49.99, // Random price between 49.99 and 149.99
        instructor: instructor._id,
        category: categories[index % categories.length]._id,
        isPublished: true,
        weeklyContent: generateWeeks(duration),
        tags: [topic.category, 'programming', 'online course'],
        thumbnail: `https://example.com/thumbnails/${topic.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        enrollmentCount: Math.floor(Math.random() * 1000),
        averageRating: Math.random() * 2 + 3, // Random rating between 3 and 5
      });
    });

    const courses = await Promise.all(coursePromises);
    console.log(`Successfully seeded ${courses.length} courses`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Execute seeder
seedDatabase();
