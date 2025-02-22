import "./TaskCard.css";
import { useNavigate } from "react-router-dom";

export const TaskCard = ({ task, handleComplete, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="task-card-container">
      <div className="task-card task-title">
        {task.title}
        <span className="vl"></span>
      </div>
      <div className="task-card task-priority">
        {task.priority}
        <span className="vl"></span>
      </div>
      <div className="task-card task-date">
        {new Date(task.due_date).toLocaleDateString()}
        <span className="vl"></span>
      </div>
      <div className="task-card task-completed">
        {task.completed ? "✅" : "❌"}
        <span className="vl"></span>
      </div>
      <div className="task-card task-category">
        {task.category_id}
        <span className="vl"></span>
      </div>
      {/*Task Actions*/}
      <div className="task-card actions">
        <span className="vl"></span>
        <button onClick={() => handleComplete(task.id, task.completed)}>
          {task.completed ? "Incomplete" : "Complete"}
        </button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};
