import React from "react";
import styles from "./Button2.module.css";

const Button2 = ({ chidren, onClick, buttonType }) => {
  return (
    <button 
      onClick={onClick}
      className={`${styles.primaryButton} ${buttonType==="secondary" ? styles.secondaryButton : ""}`} 
    >
      {chidren}
    </button>
  );
};

export default Button2;
