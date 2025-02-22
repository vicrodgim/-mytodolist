import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../elements/Button";
import "./AddTaskPage.css";

export const AddTasksPage = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    completed: false,
    priority: "medium",
    due_date: "",
    user_id: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.title) {
      setErrorMessage("Title is required");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/tasks", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/tasks");
    } catch (error) {
      setErrorMessage("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="add-task-page">
        <div className="add-task-form-container">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="add-task-title">ADD NEW TASK</h2>
            <div className="form-content">
              <div className="column-left">
                <input
                  type="text"
                  id="task-title"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  required
                  placeholder="Task Title"
                />
                <textarea
                  type="text"
                  id="task-description"
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  placeholder="Task Description"
                />
                <div className="button-group">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Adding Task..." : "ADD"}
                  </Button>
                  <Button type="button" onClick={() => navigate("/tasks")}>
                    CANCEL
                  </Button>
                </div>
              </div>
              <div className="column-right">
                <select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={taskData.due_date}
                  onChange={handleChange}
                />
                <select
                  name="category_id"
                  value={taskData.category_id}
                  onChange={handleChange}
                  id="categories"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/*Action  Buttons*/}
          </form>
        </div>
      </div>
    </div>
  );
};
