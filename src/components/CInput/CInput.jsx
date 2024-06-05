import "./CInput.css";

export const CInput = ({ type, name, value, changeEmit }) => {
  return (
    <input
      className="input-design"
      type={type}
      name={name}
      value={value}
      onChange={(e) => changeEmit(e)}
    />
  );
};
