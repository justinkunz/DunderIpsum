import React, { Component } from "react";
import "./style.css";

class AppTitle extends Component {
  render() {
    return (
      <div className="header__title">
        <div>Wuphf.io</div>
        <div className="header__title--sub">
          A Dunder Mifflin Lorem Ipsum Generator
        </div>
      </div>
    );
  }
}

export default AppTitle;
