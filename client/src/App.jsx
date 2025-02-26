import { RegisterPage } from "./pages/RegisterPage";
import { NavBar } from "./components/NavBar/NavBar";
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [localStorage.getItem("token")]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/register"
          element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/tasks" />
            )
          }
        />
        <Route
          path="/add-tasks"
          element={isLoggedIn ? <AddTasksPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks"
          element={isLoggedIn ? <TaskDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
