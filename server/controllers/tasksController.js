const pool = require("../config/db");

const getTasks = async (req, res) => {
  const user_id = req.user_id;
  const { completed, category_id } = req.query;

  try {
    let query = "SELECT * FROM tasks WHERE user_id = ?";
    let values = [user_id];

    if (completed !== undefined) {
      query += " AND completed=?";
      values.push(completed === "true");
    }

    if (category_id) {
      query += " AND category_id=?";
      values.push(category_id);
    }

    const [tasks] = await pool.query(query, values);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user_id;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id=? AND user_id=?",
      [id, user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    return res.json({
      task: rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get task" });
  }
};

const addTask = async (req, res) => {
  const { title, description, completed, priority, due_date, category_id } =
    req.body;

  const user_id = req.user_id;

  if (!title || !user_id) {
    return res.status(400).json({ error: "Title and user_id are required" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, completed, priority, due_date, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        description || null,
        completed ?? false,
        priority ?? "medium",
        due_date || null,
        category_id || null,
        user_id,
      ]
    );

    const insertedId = result.insertId;
    const [newTask] = await pool.query("SELECT * FROM tasks WHERE id=?", [
      insertedId,
    ]);

    return res.status(201).json({
      message: "Task was created successfully",
      task: newTask[0],
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while adding a task",
      datils: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const user_id = req.user_id;

  if (completed === undefined) {
    return res.status(400).json({
      error: "Completed status is required",
    });
  }

  try {
    const [result] = await pool.query(
      "UPDATE tasks SET completed =? WHERE id =? AND user_id=?",
      [completed, id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Task not found or not updated",
      });
    }

    return res.status(200).json({
      message: "Task successfully updated",
      task: {
        id,
        completed,
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      error: "An error occurred while updating the task",
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user_id;
  try {
    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id=? AND user_id=?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }
    return res.status(200).json({
      message: "Successfully deleted the task",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      error: "An error occurred while deleting the task",
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
