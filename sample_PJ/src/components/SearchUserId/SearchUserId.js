import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from '../';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const SearchUserId = props => {
  const { className, customerId, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="User ID"
          value={customerId}
        />
        <Button
          color="primary"
          variant="contained"
        >
          Search 
        </Button>
      </div>
    </div>
  );
};

SearchUserId.propTypes = {
  className: PropTypes.string,
  customerId: PropTypes.string
};

export default SearchUserId;
