import React, { useState, useEffect } from "react";
import userStore from "../store/user/userStore";
import { TSyntheticEvent } from "../models/types";

const Content = () => {
  const [userState, setUserState] = useState<any>(userStore.initialState);
  useEffect(() => {
    userStore.subscribe(setUserState);
    userStore.init();
  }, []);

  const handleChange = ({ currentTarget }: TSyntheticEvent) => {
    const key = currentTarget.name;
    let value = currentTarget.value;
    const data = { ...userState, [key]: value };
    userStore.sendData(data);
  };
  return (
    <>
      <p>Inside Content</p>
      <p>{JSON.stringify(userState)}</p>
      <label>Name: </label>
      <input name="name" value={userState.name} onChange={handleChange} />
    </>
  );
};

export default Content;
