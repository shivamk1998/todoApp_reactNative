import express from "express";
import { createTask, deleteTask, editTask, getAllCompletedTasks, getAllTasks, getAllTasksByCategory, getTodayTasks, toggleTaskStatus } from "../controllers/task.controller";
import { autenticationMiddleware } from "../middleware"


const taskRoutes= express.Router()

taskRoutes.use(autenticationMiddleware);
taskRoutes.route('/').get(getAllTasks)
taskRoutes.route('/today-tasks').get(getTodayTasks)
taskRoutes.route('/completed-tasks').get(getAllCompletedTasks)
taskRoutes.route('/tasks-by-categories/:id').get(getAllTasksByCategory)
taskRoutes.route('/create').post(createTask)
taskRoutes.route('/update/:id').put(toggleTaskStatus)
taskRoutes.route("/:id").delete(deleteTask)
taskRoutes.route("/edit/:id").put(editTask)


export default taskRoutes;