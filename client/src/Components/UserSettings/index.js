import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Char from "./Char";
import { getCharacters, toggleAll, getIpsums } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./style.css";

class UserInputs extends Component {
  componentDidMount() {
    this.props.getCharacters();
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    const { choosen } = this.props.options;
    return (
      <div className="characters">
        <div className="characters__selectOpt">
          <Button
            className="characters__selectOpt__btn"
            variant="contained"
            color="secondary"
            onClick={this.props.toggleAll}
          >
            {this.props.toggleBtn.text}
          </Button>
        </div>
        <div className="characters__box">
          {this.props.characters.map((name, i) => (
            <Char name={name} index={i} key={i} choosen={choosen[name]} />
          ))}
        </div>

        <div className="characters__submit">
          <Button
            className="characters__submit__btn"
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInputs);
