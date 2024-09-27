// constants.jsx
// Translation files
import en from "./en.json";
import pt from "./pt.json";

// app roles
export const roles = ["VIEWER", "STANDARD", "TECHNICIAN", "MANAGER", "ADMIN"];

// Supported languages
export const languages = [
    { code: "EN", nameKey: "languageEnglish", translations: en },
    { code: "PT", nameKey: "languagePortuguese", translations: pt }
  ];