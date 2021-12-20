import { Provider } from "react-redux";
import reducer from "./store/reducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import Signup from "./pages/Signup";
import TodoList from "./pages/TodoList";
import Login from "./pages/Login";
import React, { useState } from "react";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const App = () => {
  const [vista, setVista] = useState(
    localStorage.getItem("authToken") !== null ? "todolist" : "login"
  );

  return (
    <Provider store={createStoreWithMiddleware(reducer)}>
      {vista === "todolist" ? (
        <TodoList setVista={setVista} />
      ) : vista === "login" ? (
        <Login setVista={setVista} />
      ) : (
        <Signup setVista={setVista} />
      )}
    </Provider>
  );
};

export default App;
