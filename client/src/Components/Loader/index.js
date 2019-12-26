import React from "react";
import { CircularProgress, withStyles } from "@material-ui/core";
import style from "./style";

function Loader(props) {
  const { classes } = props;
  return <CircularProgress className={classes.loader} />;
}

export default withStyles(style)(Loader);
