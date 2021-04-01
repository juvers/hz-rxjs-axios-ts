import React, { useState, useEffect } from "react";
import stateStore from "../store/odt/stateStore";

const Main = () => {
  const [stateState, setStateState] = useState<any>(stateStore.initialState);
  useEffect(() => {
    stateStore.subscribe(setStateState);
  }, []);
  return (
    <>
      <p>Inside Main</p>
      <p>{JSON.stringify(stateState?.State)}</p>
      <ul>
        {stateState?.State.map((x: any) => (
          <li key={x.State}>{x.State}</li>
        ))}
      </ul>
    </>
  );
};

export default Main;
