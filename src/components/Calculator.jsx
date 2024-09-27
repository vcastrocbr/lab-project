import React, { useState } from "react";
import styles from "./Calculator.module.css";
import Button1 from "./Button1";
import { useLanguage } from "../utils/LanguageContext";

const Calculator = () => {
  const [calculatedValue, setCalculatedValue] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [isNextNumber, setIsNextNumber] = useState(false);
  const [lastCalculated, setLastCalculated] = useState("0");
  const [history, setHistory] = useState([]);
  const { translate } = useLanguage();

  // Function to handle number button clicks
  const handleNumberClick = (number) => {
    if (isNextNumber) {
      setCalculatedValue(number);
      setIsNextNumber(false);
    } else {
      setCalculatedValue(
        calculatedValue === "0" ? number : calculatedValue + number
      );
    }
  };

  // Function to handle operation button clicks
  const handleOperationSignClick = (operationSign) => {
    if (firstNumber === null) {
      setFirstNumber(parseFloat(calculatedValue));
    } else if (operation) {
      const result = calculate(
        firstNumber,
        parseFloat(calculatedValue),
        operation
      );
      setFirstNumber(result);
      setCalculatedValue(result.toString());
    }
    setOperation(operationSign);
    setIsNextNumber(true);
  };

  // Function to handle calculation on "=" click
  const handleCalculation = () => {
    if (firstNumber !== null && operation !== null) {
      const result = calculate(
        firstNumber,
        parseFloat(calculatedValue),
        operation
      );
      const historyEntry = `${firstNumber} ${operation} ${calculatedValue} = ${result}`;
      setCalculatedValue(result.toString());
      setFirstNumber(null);
      setOperation(null);
      setIsNextNumber(false);
      setLastCalculated(result.toString());
      setHistory([historyEntry, ...history]);
    }
  };

  // Function to perform the calculation
  const calculate = (firstNum, secondNum, operation) => {
    switch (operation) {
      case "+":
        return firstNum + secondNum;
      case "-":
        return firstNum - secondNum;
      case "*":
        return firstNum * secondNum;
      case "/":
        return secondNum !== 0 ? firstNum / secondNum : "Error";
      default:
        return secondNum;
    }
  };

  // Function to handle clear (C) button
  const handleClear = () => {
    if (calculatedValue !== "0") {
      setCalculatedValue("0");
      setFirstNumber(null);
      setOperation(null);
      setIsNextNumber(false);
    } else {
      setLastCalculated("0");
    }
  };

  // Function to handle erase button
  const handleErase = () => {
    if (calculatedValue.length > 1) {
      setCalculatedValue(calculatedValue.slice(0, -1));
    } else {
      setCalculatedValue("0");
    }
  };

  // Function to handle clear history button
  const handleClearHistory = () => {
    setHistory([]); // Clear the history
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculator}>
        <div className={styles.monitor}>{calculatedValue}</div>
        <div className={styles.lastResult}>{lastCalculated}</div>
        <div className={styles.gridContainer}>
          {[1, 2, 3].map((num) => (
            <div
              className={styles.gridItem}
              onClick={() => handleNumberClick(num.toString())}
              key={num}
            >
              {num}
            </div>
          ))}
          <div
            className={styles.gridItemSymbol}
            onClick={() => handleOperationSignClick("+")}
          >
            +
          </div>
          {[4, 5, 6].map((num) => (
            <div
              className={styles.gridItem}
              onClick={() => handleNumberClick(num.toString())}
              key={num}
            >
              {num}
            </div>
          ))}
          <div
            className={styles.gridItemSymbol}
            onClick={() => handleOperationSignClick("-")}
          >
            -
          </div>
          {[7, 8, 9].map((num) => (
            <div
              className={styles.gridItem}
              onClick={() => handleNumberClick(num.toString())}
              key={num}
            >
              {num}
            </div>
          ))}
          <div
            className={styles.gridItemSymbol}
            onClick={() => handleOperationSignClick("*")}
          >
            *
          </div>
          <div
            className={styles.gridItem}
            onClick={() => handleNumberClick("0")}
          >
            0
          </div>
          <div className={styles.gridItemSymbol} onClick={handleClear}>
            C
          </div>
          <div className={styles.gridItemSymbol} onClick={handleCalculation}>
            =
          </div>
          <div
            className={styles.gridItemSymbol}
            onClick={() => handleOperationSignClick("/")}
          >
            /
          </div>
          <div
            className={styles.gridItemSymbol}
            onClick={() => handleErase()}
          >
            ⌫
          </div>
        </div>
      </div>
      <div className={styles.historyContainer}>
        <div className={styles.history}>
          {history.map((entry, index) => (
            <div key={index} className={styles.historyEntry}>
              {entry}
            </div>
          ))}
        </div>
        <Button1 text={translate("clearButtonText")} onClick={handleClearHistory} />
      </div>
    </div>
  );
};

export default Calculator;
