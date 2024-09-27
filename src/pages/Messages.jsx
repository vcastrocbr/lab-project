import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import messageStyles from "./Messages.module.css"; // Import Messages styles
import paginationStyles from "../components/Pagination.module.css"; // Import Pagination styles
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useLanguage } from "../utils/LanguageContext";
import NewMessageModal from "../components/NewMessageModal";
import { receivedMessages } from "../utils/MessagesData";

const initialSentMessages = [
  {
    id: 1,
    recipient: "Alice",
    message: "Yes, I'll be there! Looking forward to it.",
  },
  {
    id: 2,
    recipient: "Bob",
    message: "Thanks for the reminder. I'll be there.",
  },
  {
    id: 3,
    recipient: "Charlie",
    message: "Sure, I can review it this afternoon.",
  },
  {
    id: 4,
    recipient: "David",
    message: "It was great, thanks! How about yours?",
  },
  {
    id: 5,
    recipient: "Eva",
    message: "Got it. Thanks for sending those over.",
  },
  { id: 6, recipient: "Frank", message: "Absolutely, let's do that." },
  {
    id: 7,
    recipient: "Grace",
    message: "Yes, I have it. I'll send it to you shortly.",
  },
  { id: 8, recipient: "Hank", message: "No problem, happy to help!" },
  { id: 9, recipient: "Ivy", message: "I am, give me a couple of minutes." },
  { id: 10, recipient: "Jack", message: "Not sure yet, might go hiking." },
  { id: 11, recipient: "Kathy", message: "Thanks, I'll check it now." },
  {
    id: 12,
    recipient: "Leo",
    message: "Of course, happy to help. Let's talk.",
  },
  { id: 13, recipient: "Mona", message: "I'll send it over in a few minutes." },
  { id: 14, recipient: "Nathan", message: "Hey! Long time no see!" },
  {
    id: 15,
    recipient: "Olivia",
    message: "Yes, quite shocking. Let's discuss.",
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const messagesPerPage = 5; // Maximum number of messages per page
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [sentMessages, setSentMessages] = useState(initialSentMessages);

  // Handle page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Helper function to get paginated messages
  const paginateMessages = (messages) => {
    const startIndex = currentPage * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    return messages.slice(startIndex, endIndex);
  };

  // Paginated messages for the current page
  const paginatedReceivedMessages = paginateMessages(receivedMessages);
  const paginatedSentMessages = paginateMessages(sentMessages);

  // Handle new message
  const handleNewMessage = () => {
    setIsNewMessageModalOpen(true);
  };

  // Handle modal close
  const handleCloseNewMessageModal = () => {
    setIsNewMessageModalOpen(false);
  };

  // Handle form submission
  const handleSubmitMessage = (message) => {
    console.log("New message submitted:", message);
    // Generate a new id for the message
    const newMessageId = sentMessages.length + 1;
    // Add new message to the sentMessages state
    setSentMessages([
      ...sentMessages,
      {
        id: newMessageId,
        recipient: message.recipient,
        message: message.message,
      },
    ]);
    // Close the modal
    handleCloseNewMessageModal();
  };

  return (
    <div className={messageStyles.container}>
      <Header />

      <div className={messageStyles.contentWrapper}>
        <div className={messageStyles.newMessageSection}>
          <Button1
            text={translate("newMessageButtonText")}
            onClick={handleNewMessage}
          />
        </div>
        <div className={messageStyles.messageSection}>
          <h1 className={messageStyles.sectionHeader}>
            {translate("receivedMessagesHeader")}
          </h1>
          {paginatedReceivedMessages.map((message) => (
            <div key={message.id} className={messageStyles.message}>
              <p className={messageStyles.messageLabel}>
                {translate("fromLabel")}: {message.sender}
              </p>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
        <div className={messageStyles.messageSection}>
          <h1 className={messageStyles.sectionHeader}>
            {translate("sentMessagesHeader")}
          </h1>
          {paginatedSentMessages.map((message) => (
            <div key={message.id} className={messageStyles.message}>
              <p className={messageStyles.messageLabel}>
                {translate("toLabel")}: {message.recipient}
              </p>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* React Paginate Component */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(
          Math.max(receivedMessages.length, sentMessages.length) /
            messagesPerPage
        )}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={paginationStyles.pagination}
        activeClassName={paginationStyles.active}
        previousClassName={`${paginationStyles.pageButton} ${
          currentPage === 0 ? paginationStyles.disabled : ""
        }`} // Disable previous if on first page
        nextClassName={`${paginationStyles.pageButton} ${
          currentPage ===
          Math.ceil(
            Math.max(receivedMessages.length, sentMessages.length) /
              messagesPerPage
          ) -
            1
            ? paginationStyles.disabled
            : ""
        }`} // Disable next if on last page
        pageClassName={paginationStyles.pageButton}
      />
      <Button2
        buttonType="secondary"
        chidren={translate("goBackButtonText")}
        onClick={() => navigate("/home")}
      />
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={handleCloseNewMessageModal}
        onSubmit={handleSubmitMessage}
      />
    </div>
  );
};

export default Messages;
