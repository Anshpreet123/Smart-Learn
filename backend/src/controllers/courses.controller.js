const Course = require('../models/courses.model.js');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a course
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourseContent = async (req, res) => {
  try {
    // in this it will contain the course contents like what are the topics covered in the course
    // so i have to selectively get the course content
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseContent,
};
