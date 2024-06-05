import "./CInputs.css";

export const CInputs = ({ type, name, className, onChange, value }) => {
  return (
    <input
      type={type}
      name={name}
      className={className}
      onChange={(e) => onChange(e)}
      value={value}
    />
  );
};
