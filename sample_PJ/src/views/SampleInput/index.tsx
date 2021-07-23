import React, { useState , useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import { MenuTitleToolbar } from '../../components';

import SampleMemberSearch from './SampleMemberSearch';
import SampleMemberDetails from './SampleMemberDetails';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const SampleInput = () => {
  const classes = useStyles();
  
  const [memberSearch, setMemberSearch ] = useState({
    userId: '',
    userName: ''
  });

  const [updateClick, setUpdateClick] = useState(false);

  const [memberInfo, setMemberInfo] = useState({
    userRank : '',
    userId : '',
    userName : '',
    email : '',
    phone : '',
    address : '',
    useYn : ''
  })

  useEffect(() => {
    const fetch = async () => {
      console.log("Hook 동작")
      console.log(memberSearch)
    }
    fetch();
  },[memberSearch]);

  return (
    <div className={classes.root}>
      <MenuTitleToolbar title="회원관리" />
      <SampleMemberSearch onSearch={setMemberSearch}/>
      <SampleMemberDetails updateClick={updateClick} setUpdateClick={setUpdateClick} memberInfo={memberInfo} setMemberInfo={setMemberInfo} />
      <div className={classes.content}></div>  
    </div>
  );
};

export default SampleInput;