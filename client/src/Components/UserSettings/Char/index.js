import React, { Component } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleChar } from "../../../actions";
import "./style.css";

class Char extends Component {
  render() {
    const { index, name, choosen } = this.props;
    return (
      <FormControlLabel
        className="characters__box__individual"
        color="blue"
        control={
          <Checkbox
            className="charcters__box__individual__icon"
            value={index}
          />
        }
        label={name}
        checked={choosen}
        onChange={() => this.props.toggleChar(name)}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleChar }, dispatch);
};
export default connect(null, mapDispatchToProps)(Char);
