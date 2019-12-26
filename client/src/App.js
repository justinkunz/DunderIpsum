import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { AppTitle, Settings, Ipsums, GitHubCorner } from "./Components";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GitHubCorner />
        <AppTitle />
        <Settings />
        <Ipsums />
      </div>
    </Provider>
  );
}

export default App;
