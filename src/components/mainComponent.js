import React, { useEffect, useState } from "react";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";

function MainComponent(props) {
  const { getUsers, userState, addUser, updateUser } = props;
const [editMode, setEditMode] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleAddUser = (user) => {
    if (editMode){
      updateUser(currentUser.id, user);
    }else{
      addUser(user);
    }
    clearEditMode();
  };
const handleEditUser = (user) => {
    setCurrentUser(user);
    setEditMode(true);
  };

  const clearEditMode = () => {
    setEditMode(false);
    setCurrentUser(null);
  };

  return (
    <div id="main-container-wrapper" style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div>
        <InputHandler
          onSubmit={handleAddUser}
          editMode={editMode}
          user={currentUser}
          clearEditMode={clearEditMode}
        />
        <SimpleTable dataSource={userState.users} onEdit={handleEditUser} />
      </div></div>
  );
}
export default MainComponent;
