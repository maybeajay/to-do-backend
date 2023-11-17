import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return next(
        new ErrorHandler("Both title and description are required", 401)
      );
    await Task.create({
      title,
      description,
      user: req.user,
    }),
      res.status(201).json({
        success: true,
        message: "Task added succesfully",
      });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const uid = req.user._id;
    const tasks = await Task.find({ user: uid });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task Not Found", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Deleted Successfull",
    });
  } catch (error) {
    next(error);
  }
};
