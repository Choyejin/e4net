import React, { FC } from 'react';
import clsx from 'clsx';
import { Paper, Input, Theme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: '3px',
    display: 'flex',
    flexBasis: 420
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));

type Props = {
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  handleChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  handleKeyPress?: ((event: React.KeyboardEvent<HTMLInputElement>) => void);
}

const SearchInput : FC<Props> = ({ name, className, placeholder, value, handleChange, handleKeyPress }) => {
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, className)}
    >
      <Input
        name={name}
        className={classes.input}
        disableUnderline
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        onKeyPress={handleKeyPress}
      />
    </Paper>
  );
};

export default SearchInput;
