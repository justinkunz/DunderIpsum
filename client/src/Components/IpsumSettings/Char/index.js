import React, { Component } from "react";
import { FormControlLabel, Checkbox, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleChar } from "../../../actions";
import style from "./style";

class Char extends Component {
  render() {
    const { index, name, choosen, classes } = this.props;
    return (
      <FormControlLabel
        control={
          <Checkbox
            classes={{
              root: classes.root,
              checked: classes.checked
            }}
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

const StyledChar = withStyles(style)(Char);

export default connect(null, mapDispatchToProps)(StyledChar);
