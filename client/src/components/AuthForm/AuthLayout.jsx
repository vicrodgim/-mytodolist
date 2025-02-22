import "./AuthLayout.css";

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-page-background">
      <div className="signup-login-form">{children}</div>
    </div>
  );
};
