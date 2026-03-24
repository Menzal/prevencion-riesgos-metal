import { Request, Response } from 'express';
import CourseModel from '../models/CourseModel';

class CursosController {
    // Create a new course
    static async createCourse(req: Request, res: Response) {
        try {
            const courseData = req.body;
            const newCourse = await CourseModel.create(courseData);
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ message: 'Error creating course', error });
        }
    }

    // Get all courses
    static async getAllCourses(req: Request, res: Response) {
        try {
            const courses = await CourseModel.find();
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses', error });
        }
    }

    // Get a course by ID
    static async getCourseById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const course = await CourseModel.findById(id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching course', error });
        }
    }

    // Update a course
    static async updateCourse(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const courseData = req.body;
            const updatedCourse = await CourseModel.findByIdAndUpdate(id, courseData, { new: true });
            if (!updatedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(updatedCourse);
        } catch (error) {
            res.status(500).json({ message: 'Error updating course', error });
        }
    }

    // Delete a course
    static async deleteCourse(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedCourse = await CourseModel.findByIdAndDelete(id);
            if (!deletedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting course', error });
        }
    }

    // Enroll a user in a course
    static async enrollUserInCourse(req: Request, res: Response) {
        try {
            const { courseId, userId } = req.body;
            const course = await CourseModel.findByIdAndUpdate(courseId, { $addToSet: { enrolledUsers: userId } }, { new: true });
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ message: 'Error enrolling user in course', error });
        }
    }
}

export default CursosController;