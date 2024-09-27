import React from "react";
import Calculator from "../components/Calculator";
import ReactSelect from "../components/ReactSelect";
import Button1 from "../components/Button1";
import styles from "./Definitions.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useLanguage } from "../utils/LanguageContext";

const Definitions = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Header at the top */}
      <Header />

      {/* Content Wrapper for Left and Right Areas */}
      <div className={styles.contentWrapper}>
        {/* Left Content Area */}
        <div className={styles.contentArea}>
          <ReactSelect />
        </div>

        {/* Right Calculator Area */}
        <div className={styles.calculatorArea}>
          <Calculator />
        </div>
      </div>

      {/* Centered Button */}
      <Button1
        text={translate("goBackButtonText")}
        onClick={() => navigate("/home")}
      />
    </div>
  );
};

export default Definitions;
