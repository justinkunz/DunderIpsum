import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updatePCount, toggleNSFW } from "../../../actions";
import {
  Input,
  FormHelperText,
  FormControl,
  withStyles,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import style from "./style";

const CustomSwitch = withStyles(style.switch)(Switch);

class FilterSettings extends Component {
  render() {
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updatePCount, toggleNSFW }, dispatch);
};

const StyledFilters = withStyles(style)(FilterSettings);

export default connect(mapStateToProps, mapDispatchToProps)(StyledFilters);
