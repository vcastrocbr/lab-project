import React from "react";
import styles from "./Button1.module.css";

const Button1 = ({ text, onClick, className }) => {
  return (
    <button 
      className={`${styles.primaryButton} ${className}`} // Merge default and additional styles
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button1;
