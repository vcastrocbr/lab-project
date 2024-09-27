import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import Messages from "./pages/Messages";
import Definitions from "./pages/Definitions";
import { LanguageProvider } from "./utils/LanguageContext"; 

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<InitialPage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/definitions" element={<Definitions />} />
        </Routes>
      </Router>
      </LanguageProvider>
  );
}

export default App;
