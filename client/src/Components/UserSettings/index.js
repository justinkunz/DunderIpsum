import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import Char from "./Char";
import { getCharacters, toggleAll, getIpsums } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FilterSettings from "./FilterSettings";

import style from "./style";

class UserInputs extends Component {
  componentDidMount() {
    this.props.getCharacters();
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    const { classes, options } = this.props;
    const { choosen } = options;
    console.log(classes);
    return (
      <div className={classes.wrapper}>
        <Button
          className={classes.selectBtn}
          variant="contained"
          color="secondary"
          onClick={this.props.toggleAll}
        >
          {this.props.toggleBtn.text}
        </Button>

        <div className={classes.charBox}>
          {this.props.characters.map((name, i) => (
            <Char name={name} index={i} key={i} choosen={choosen[name]} />
          ))}
        </div>
        <FilterSettings />
        <div className={classes.submitWrapper}>
          <Button
            className={classes.submitBtn}
            variant="contained"
            color="primary"
            onClick={() => this.props.getIpsums(this.props.options)}
          >
            Give Me the Gabagool
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getCharacters, toggleAll, getIpsums }, dispatch);
};

const StyledUserInputs = withStyles(style)(UserInputs);
export default connect(mapStateToProps, mapDispatchToProps)(StyledUserInputs);
