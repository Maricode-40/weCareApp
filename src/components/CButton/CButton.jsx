import "./CButton.css";

export const CButton = ({ title, clickFunction }) => {
  return (  
  <div className="buttonDesign" onClick={clickFunction}>
    {title}
    </div>
  )
};
