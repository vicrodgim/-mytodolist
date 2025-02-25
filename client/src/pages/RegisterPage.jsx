import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthLayout } from "../components/AuthForm/AuthLayout";
import { FormInput } from "../components/AuthForm/FormInput";
import { Button } from "../elements/Button";
import "./RegisterPage.css";

export const RegisterPage = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const register = async (event) => {
    event.preventDefault();
    const { email, password, username } = registrationData;
    if (!email || !password || !username) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("api/users/register", registrationData);
      setSuccessMessage("Registration was successful");
      setRegistrationData({ username: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={register}>
        <h2 className="title-register">Signup</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}
        <FormInput
          id="email"
          label="Email"
          name="email"
          value={registrationData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          inputClassName="loginsignup-input"
        />
        <FormInput
          id="username"
          label="Username"
          name="username"
          value={registrationData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          inputClassName="loginsignup-input"
        />
        <FormInput
          id="password"
          label="Password"
          value={registrationData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
          inputClassName="loginsignup-input"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </Button>
        <div className="signup-footer">
          <span className="question">Already have an account?</span>
          <Link to="/login" className="link-sl">
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
