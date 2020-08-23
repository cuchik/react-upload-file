import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const Footer = props => {
  const classes = useStyles();

  return (
    <div {...props} className={classes.root}>
      <Typography variant="body1">
        &copy; Luan Nguyen - Upload Photos. 2020
      </Typography>
    </div>
  );
};

export default Footer;
