const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const coursesController = require('../controllers/courses.controller');
const router = Router();

router.get('/', coursesController.getCourses);
router.post('/create', authMiddleware, coursesController.createCourse);

module.exports = router;
