const Course = require('../models/course.model');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, instructor: req.user.userId });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find().populate('instructor');
  res.json(courses);
};

exports.getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id).populate('content.linkedLesson');
  res.json(course);
};

exports.updateCourse = async (req, res) => {
  const oldCourse = await Course.findById(req.params.id);
  oldCourse.versions.push({
    title: oldCourse.title,
    description: oldCourse.description,
    syllabus: oldCourse.syllabus
  });
  Object.assign(oldCourse, req.body);
  await oldCourse.save();
  res.json(oldCourse);
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Course deleted' });
};

exports.approveContent = async (req, res) => {
  const { courseId, contentIndex } = req.params;
  const course = await Course.findById(courseId);
  if (course && course.content[contentIndex]) {
    course.content[contentIndex].approved = true;
    await course.save();
    res.json({ message: 'Content approved' });
  } else {
    res.status(404).json({ error: 'Content not found' });
  }
};
