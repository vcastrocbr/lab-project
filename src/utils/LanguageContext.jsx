import React, { createContext, useContext, useState, useEffect } from "react";
import { languages } from "./constants";

// Default locale
const defaultLocale = "EN";

// Create a context
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    // Initialize locale from sessionStorage or default to 'EN'
    return sessionStorage.getItem("locale") || defaultLocale;
  });

  // Update localStorage whenever locale changes
  useEffect(() => {
    sessionStorage.setItem("locale", locale);
  }, [locale]);

  // Function to get the translated text
  const translate = (key) => {
    // Find the selected language's translations
    const selectedLanguage = languages.find((lang) => lang.code === locale);
    if (selectedLanguage) {
      // Access the translations dynamically using the language's JSON import
      const translation = selectedLanguage.translations[key];
      return translation || key; // Fallback to key if translation is missing
    }
    return key; // Fallback if the language is not found
  };

  // Context value to be passed to consumers
  const updateLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, updateLocale, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
