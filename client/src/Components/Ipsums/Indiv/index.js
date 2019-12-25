import React, { Component } from "react";

class Indiv extends Component {
  render() {
    return (
      <div className="ipsums__msg">
        <div>{this.props.msg}</div>
      </div>
    );
  }
}

export default Indiv;
