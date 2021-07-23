import React, { FC } from 'react';
import { Theme, makeStyles, CardContent } from '@material-ui/core';
import {
    Card,
    Grid,
    Button,
  } from '@material-ui/core';

type Props = {
  popFlag:boolean,
  setPopFlag:React.Dispatch<React.SetStateAction<boolean>>,
}

const SamplePopToolBar: FC<Props> = ({popFlag,setPopFlag}) => {

  console.log(popFlag)
  const onClick = async () => {
    setPopFlag(true);
  };


  return (
        <Card>
            <CardContent>
            <Grid
            container
            spacing={1}
            >
            <Grid item md={2} xs={6}>
            <Button variant="contained" color="primary" onClick={onClick} style = {{marginTop: '8px' }}>Pop</Button>
            </Grid>
          </Grid>              
          </CardContent>
        </Card>
  );
};

export default SamplePopToolBar;
