import React, { useRef } from "react";
import styles from "./LanguageSelector.module.css";
import { useLanguage } from "../utils/LanguageContext";
import { languages } from "../utils/constants";

const LanguageSelector = () => {
  const { locale, updateLocale, translate } = useLanguage();
  const selectRef = useRef(null);

  // Handle language selection
  const handleSelectLanguage = (event) => {
    const newLocale = event.target.value;
    updateLocale(newLocale);
  };

  // Function to handle opening the dropdown
  const handleOpenDropdown = () => {
    if (selectRef.current) {
      selectRef.current.focus(); // Focus the select element
    }
  };

  return (
    <div className={styles.languageSelectorWrapper}>
        <label htmlFor="language-selector" className={styles.languageLabel}>
          {translate("selectLanguageLabel")}
        </label>
      <div className={styles.languageContainer}>
        <span
          className={styles.selectedLanguageCode}
          onClick={handleOpenDropdown}
        >
          {locale}
        </span>
        <span className={styles.dropdownArrow} onClick={handleOpenDropdown}>
          ▼
        </span>
      </div>
      <select
        ref={selectRef}
        className={styles.languageSelector}
        onChange={handleSelectLanguage}
        value={locale}
        aria-label={translate("selectLanguageLabel")}
        onBlur={() => selectRef.current.blur()}
      >
        {/* Dropdown Options */}
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {translate(language.nameKey)}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LanguageSelector;
