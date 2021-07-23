import 'date-fns';
import React, { FC } from 'react';
import { Card, Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}));

type Props = {
  title: string
}

const MenuTitleToolbar: FC<Props> = ({title}) => {  
  const classes = useStyles();

  return (
      <Card className={classes.root} >
        <Grid item xs={12} sm={12}>
          <Box bgcolor="primary.main" color="primary.contrastText" p={2}>{title}</Box>
        </Grid>
      </Card>
  );
};

export default MenuTitleToolbar;
