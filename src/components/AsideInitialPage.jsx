import React, { useState } from "react";
import styles from "./AsideInitialPage.module.css";
import { Link } from "react-router-dom";
import Button1 from "./Button1";
import { useLanguage } from "../utils/LanguageContext";

const AsideInitialPage = () => {
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const { translate } = useLanguage();

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };
  return (
    <>
      {/* Toggle Button using custom Button1 component with additional styling */}
      <Button1
        text={isAsideVisible ? translate("hide") : translate("show")}
        onClick={toggleAside}
        className={styles.toggleButton}
      />

      {/* Aside Navigation Menu */}
      <aside
        className={`${styles.aside} ${!isAsideVisible ? styles.hidden : ""}`}
      >
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/messages" className={styles.link}>
                {translate("messages")}
              </Link>
            </li>
            <li>
              <Link to="/definitions" className={styles.link}>
                {translate("definitions")}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AsideInitialPage;
