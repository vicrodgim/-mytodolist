import "./Button.css";

export const Button = ({
  text,
  type = "button",
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`style-button`}
    >
      {children || text}
    </button>
  );
};
