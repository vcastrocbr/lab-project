import React from "react";
import Button1 from "./Button1";
import LanguageSelector from "./LanguageSelector";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { useLanguage } from "../utils/LanguageContext";

 // Define the page name for which the "Go Back" button should not be shown
 const homePageName = "home";

const Header = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translate } = useLanguage();

  const pageName = location.pathname.split("/").pop(); // Get the last part of the URL as the page name
  const capitalizedPageName =
    pageName.charAt(0).toUpperCase() + pageName.slice(1);
 
  // Determine if the "Go Back" button should be displayed
  const showGoBackButton = pageName !== homePageName;

  return (
    <header className={styles.header}>
      {/* Home Button */}
      {showGoBackButton && (
        <Button1
          text={translate("goBackButtonText")}
          onClick={() => navigate("/home")}
          className={styles.goBackButton}
        />
      )}
      {/* Titles */}
      <div className={styles.titles}>
        <h1>{translate("appTitle")}</h1>
        <h2>{capitalizedPageName}</h2>
      </div>
      {/* Language Selector */}
      <div className={styles.languageSelection}>
      <LanguageSelector/>
      </div>
    </header>
  );
});

export default Header;
