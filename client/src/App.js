import React from "react";
import { AppTitle, Settings, Ipsums, GitHubCorner } from "./Components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <GitHubCorner />
      <AppTitle />
      <Settings />
      <Ipsums />
    </div>
  );
}

export default App;
