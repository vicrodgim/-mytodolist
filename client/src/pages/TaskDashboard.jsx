import axios from "axios";
import { useEffect, useState } from "react";
import { TaskCard } from "../components/TaskList.jsx/TaskCard";
import { SortBar } from "../components/Sorting/SortBar";
import "./TaskDashBoard.css";

export const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("deadline");
  const token = localStorage.getItem("token");

  const noTasks = tasks.length === 0;

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const sortTasks = (tasks, option) => {
    switch (option) {
      case "priority":
        return [...tasks].sort((a, b) => {
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      case "alphabetical":
        return [...tasks].sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        });
      case "deadline":
      default:
        return [...tasks].sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );
    }
  };

  const handleSortChange = (newSortOption) => {
    if (newSortOption !== sortOption) {
      setSortOption(newSortOption);
    }
  };

  const handleComplete = async (taskId, completed) => {
    try {
      await axios.put(
        `/api/tasks/${taskId}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting the task:", error);
    }
  };

  return (
    <div className="task-list-page">
      <h2 id="task-dashboard-title">MY TASKS</h2>
      <div className="sort-bar-wrapper"></div>
      {noTasks ? (
        <p id="no-tasks-message">Lucky you, there are no tasks!</p>
      ) : (
        <div className="task-list-container">
          {/*Header*/}
          <div className="task-card-container header">
            <div className="task-card task-title">TASK</div>
            <div className="task-card task-priority">PRIORITY</div>
            <div className="task-card task-due-date">DEADLINE</div>
            <div className="task-card task-completed">COMPLETED</div>
            <div className="task-card task-category">CATEGORY</div>
            <div className="task-card actions">
              <SortBar
                sortOption={sortOption}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
          {sortTasks(tasks, sortOption).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              categories={categories}
            />
          ))}
        </div>
      )}
    </div>
  );
};
