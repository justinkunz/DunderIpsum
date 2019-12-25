import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Indiv from "./Indiv";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CheckIcon from "@material-ui/icons/Check";
import { updateClipboard } from "../../actions";
import "./style.css";

class Ipsums extends Component {
  render() {
    const { ipsums, copied } = this.props;
    if (ipsums.length === 0) return <Fragment />;
    return (
      <div className="ipsums">
        <CopyToClipboard
          text={ipsums.join("\n\n")}
          onCopy={this.props.updateClipboard}
        >
          <div className="ipsums__btn">
            {copied ? <CheckIcon /> : <Fragment />}
            {copied ? "Copied to Clipboard" : "Copy Text"}
          </div>
        </CopyToClipboard>

        <div className="ipsums__wrapper">
          {ipsums.map((ip, index) => (
            <Indiv msg={ip} key={index} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateClipboard }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Ipsums);
