import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LogInPage";
import { AddTasksPage } from "./pages/AddTasksPage";
import { TaskDashboard } from "./pages/taskDashboard";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const Profile = () => <h2>Profile Page (Coming Soon)</h2>;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/add-tasks"
          element={isLoggedIn ? <AddTasksPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks"
          element={isLoggedIn ? <TaskDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
