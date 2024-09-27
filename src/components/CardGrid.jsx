// CardGrid.jsx
import React from "react";
import styles from "./CardGrid.module.css";

const CardGrid = ({ cards }) => {
    return (
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={`${styles.stripe} ${styles[card.state]}`}></div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      );
    };
    
    export default CardGrid;
