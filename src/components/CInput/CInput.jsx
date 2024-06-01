import "./CInput.css";


export const CInput = ({ type, name, className, onChange, value }) => {
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
