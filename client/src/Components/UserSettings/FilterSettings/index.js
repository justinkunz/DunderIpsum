import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updatePCount, toggleNSFW } from "../../../actions";
import {
  Input,
  FormHelperText,
  FormControl,
  withStyles,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import style from "./style";

const CustomSwitch = withStyles(style.switch)(Switch);

class FilterSettings extends Component {
  render() {
    console.log(this.props);
    const { classes, options } = this.props;
    return (
      <Fragment>
        <FormControlLabel
          control={
            <FormControl>
              <Input
                value={options.limit}
                className={classes.paraCount}
                onChange={e => this.props.updatePCount(e.target.value)}
                classes={{ input: classes.paraCount__input }}
              />
              <FormHelperText className={classes.paraCount__label}>
                Paragraph Count
              </FormHelperText>
            </FormControl>
          }
        />
        <FormControl>
          <FormControlLabel
            control={
              <CustomSwitch
                value={options.nsfw}
                onChange={this.props.toggleNSFW}
              />
            }
            label="Inlcude NSFW Quotes"
          />
        </FormControl>
      </Fragment>
    );
  }
}

const StyledFilters = withStyles(style)(FilterSettings);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updatePCount, toggleNSFW }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(StyledFilters);
