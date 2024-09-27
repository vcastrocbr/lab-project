import React, { useState } from "react";
import styles from "./NewMessageModal.module.css";
import { useLanguage } from "../utils/LanguageContext";

const NewMessageModal = ({ isOpen, onClose, onSubmit }) => {
  const { translate } = useLanguage();
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ recipient, message });
    setRecipient("");
    setMessage("");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{translate("newMessageTitle")}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="recipient">{translate("toLabel")}:</label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">{translate("messageLabel")}:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">{translate("sendButtonText")}</button>
            <button type="button" onClick={onClose}>
              {translate("closeButtonText")}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMessageModal;
