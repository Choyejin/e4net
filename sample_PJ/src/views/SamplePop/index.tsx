import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import { MenuTitleToolbar } from '../../components';

import SamplePopToolBar from './SamplePopToolBar';
import SamplePopup from './SamplePopup';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const SamplePop = () => {
  const classes = useStyles();
  
  const [popFlag,setPopFlag] = React.useState(false)

  useEffect(() => {
    const fetch = async () => {
      console.log("Hook 동작")
    }
    
    //팝업플래그가 true일때만 작동
    if(popFlag){
      fetch();
    }
  },[popFlag]);

  return (
    <div className={classes.root}>
      <MenuTitleToolbar title="팝업" />
      <div className={classes.content}></div>
      <SamplePopToolBar popFlag={popFlag} setPopFlag={setPopFlag}></SamplePopToolBar>
      <SamplePopup popFlag={popFlag} setPopFlag={setPopFlag}/>
    </div>
  );
};

export default SamplePop;
