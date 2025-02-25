import "./TaskCard.css";
import { useNavigate } from "react-router-dom";

export const TaskCard = ({
  task,
  handleComplete,
  handleDelete,
  categories,
}) => {
  const category = categories.find(
    (category) => category.id === task.category_id
  );

  const categoryName = category ? category.name : "Uncategorized";

  return (
    <div className="task-card-container">
      <div className="task-card task-title custom-tooltip">
        {task.title}
        <span className="tooltip-text">
          {task.description ? task.description : "No description"}
        </span>
      </div>
      <div className="task-card task-priority">{task.priority}</div>
      <div className="task-card task-date">
        {new Date(task.due_date).toLocaleDateString()}
      </div>
      <div className="task-card task-completed">
        {task.completed ? "✅" : "❌"}
      </div>
      <div className="task-card task-category">{categoryName}</div>
      {/*Task Actions*/}
      <div className="task-card actions">
        <button onClick={() => handleComplete(task.id, task.completed)}>
          {task.completed ? "Incomplete" : "Complete"}
        </button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};
