import React, { useState } from "react";
import Select from "react-select";
import styles from "./ReactSelect.module.css";
import Button1 from "./Button1";
import { roles } from "../utils/constants";
import { useLanguage } from "../utils/LanguageContext";

const ReactSelect = () => {
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { translate } = useLanguage();

  // Options for the select component
  const roleOptions = roles.map((role) => ({
    value: role,
    label: translate(role),
  }));

  // Handle adding user to the list
  const handleAddUser = () => {
    if (name && selectedRole) {
      setUsers([
        ...users,
        { id: Date.now(), username: name, role: selectedRole.value },
      ]);
      setName(""); // Reset name input
      setSelectedRole(null); // Reset role selection
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setSearchText(value.trim()); // Update search text state
  };

  const handleClearSearch = () => {
    setSearchText(""); // Clear search text state
  };

  // Filter users based on search text
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.controlPanel}>
        <h2>{translate("userManagement")}</h2>
        {/* Input for the user's name */}
        <input
          type="text"
          placeholder={translate("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        {/* Select for choosing a role */}
        <Select
          options={roleOptions}
          value={selectedRole}
          onChange={setSelectedRole}
          className={styles.select}
          placeholder={translate("selectRole")}
        />

        {/* Button to add user */}
        <Button1 text={translate("addUser")} onClick={handleAddUser} />

        {/* Input for filtering users */}
        <input
          type="text"
          placeholder={translate("searchUsers")}
          value={searchText}
          onChange={handleFilterChange}
          className={styles.searchInput}
        />
        <Button1 text={translate("clear")} onClick={handleClearSearch} />
      </div>

      {/* Display the list of users */}
      <div className={styles.userListContainer}>
        <ul className={styles.userList}>
          {filteredUsers.map((user) => (
            <li className={styles.user} key={user.id}>
              {user.username} - {translate(user.role)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReactSelect;
