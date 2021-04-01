import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Main from "./components/Main";
import Master from "./components/Master";
import Content from "./components/Content";
import { Observable, of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import api from "./api/api";
import systemVariableStore from "./store/odt/systemVariableStore";
import stateStore from "./store/odt/stateStore";
import statusStore from "./store/odt/statusStore";

const getItem$ = <T,>(url: string): Observable<T[]> => {
  return api.get<T[]>(url).pipe(
    take(1),
    catchError((err) => of(console.log(err)))
  ) as Observable<T[]>;
};

function App() {
  console.log("Inside app");
  useEffect(() => {
    const getInfo$ = getItem$("SystemVariable").subscribe((res) => {
      systemVariableStore.sendData(res);
      systemVariableStore.init();
    });
    return () => getInfo$.unsubscribe();
  }, []);

  useEffect(() => {
    const getInfo$ = getItem$("State").subscribe((res) => {
      stateStore.sendData(res);
      stateStore.init();
    });
    return () => getInfo$.unsubscribe();
  }, []);

  useEffect(() => {
    const getInfo$ = getItem$("Status").subscribe((res) => {
      statusStore.sendData(res);
      statusStore.init();
    });
    return () => getInfo$.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <ul style={{ display: "flex", listStyleType: "none" }}>
          <li style={{ marginRight: "10px" }}>
            <Link to="/">Home</Link>
          </li>
          <li style={{ marginRight: "10px" }}>
            {" "}
            <Link to="/main">Main</Link>
          </li>
          <li style={{ marginRight: "10px" }}>
            <Link to="/master">Master</Link>
          </li>
          <li style={{ marginRight: "10px" }}>
            <Link to="/content">Content</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/main" component={Main} exact />
        <Route path="/master" component={Master} exact />
        <Route path="/content" component={Content} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
