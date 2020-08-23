import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Footer } from './components';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  content: {
    padding: '30px 50px',
    overflow: 'auto',
  },
}));

const Main = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};
Main.defaultProps = {
  children: <></>,
};

export default Main;
