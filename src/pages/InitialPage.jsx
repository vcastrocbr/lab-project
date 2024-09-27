import React from "react";
import styles from "./InitialPage.module.css";
import AsideInitialPage from "../components/AsideInitialPage";
import Header from "../components/Header";
import { useLanguage } from "../utils/LanguageContext";
import CardGrid from "../components/CardGrid";
import cardData from "../utils/cardData";

const InitialPage = () => {
  const { translate } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Header at the top */}
      <Header />
      {/* Content area containing the aside and main content */}
      <div className={styles.content}>
        <AsideInitialPage />
        <div className={styles.main}>
          <h1>{translate("inicialText")}</h1>
          <CardGrid cards={cardData} />
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
