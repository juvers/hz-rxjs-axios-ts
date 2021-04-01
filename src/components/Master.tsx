import React, { useState, useEffect } from "react";
import systemVariableStore from "../store/odt/systemVariableStore";
import statusStore from "../store/odt/statusStore";
import userStore from "../store/user/userStore";

const Master = () => {
  const [masterState, setMasterState] = useState(
    systemVariableStore.initialState
  );
  const [statusState, setStatusState] = useState(statusStore.initialState);
  const [user, setUser] = useState(userStore.initialState);
  useEffect(() => {
    systemVariableStore.subscribe(setMasterState);
    statusStore.subscribe(setStatusState);
    userStore.subscribe(setUser);
    userStore.init();
  }, [masterState, statusState]);
  return (
    <>
      <p>{JSON.stringify(user)}</p>
      {statusState ? (
        <p>You can see this cos status is true</p>
      ) : (
        <p>Status is false</p>
      )}
      <p>Inside Master</p>
      <p>{JSON.stringify(masterState)}</p>
    </>
  );
};

export default Master;
