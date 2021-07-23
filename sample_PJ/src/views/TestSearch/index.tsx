import React, { useState, useEffect } from 'react';
import { Theme, makeStyles, Button } from '@material-ui/core';
import { MenuTitleToolbar } from '../../components';
import {format} from 'date-fns';
import SampleToolbar from './SampleToolbar'
import SampleTable from './SampleTable'
//import xlsx from 'xlsx'
import SampleMemberDetails from './SampleMemberDetails';
import axios from 'axios';
import SampleListPop from './SampleListPop';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      padding: theme.spacing(3)
    },


    
    content: {
      marginTop: theme.spacing(2)
    }
  }));
 
  const TestSearch = () => {
    const classes = useStyles();

    const default_page = 0;
    const default_rowsPerPage = 10;
    const [data, setData] = useState([]);
    const [searchForm, setSearchForm] = useState({
      searchType: '',
      searchValue: '',
    });

    const [totalCount, setTotalCount] = useState(0);

  const [paging, setPaging] = useState({
    page: default_page,
    rowsPerPage: default_rowsPerPage
  });
  
  const [isExcelDown, setExcelDown] = useState(false);

  const[message,setMessage]=useState([]);
  const[text,settext]=useState([]);

  useEffect(()=>{
    fetch('/api/notice')
    .then((response)=>response.json())
    .then((message)=>{
      console.log('<<<1',message);
      setMessage(message);
    });
  },[])

  // useEffect(()=>{
  //   fetch('/api/noticeDetail')
  //   .then((response)=>response.json())
  //   .then((text)=>{
  //     console.log('<<<1',text);
  //     settext(text);
  //   });
  // },[])


  // useEffect(()=>{
  //   const response = axios.get(
  //     "/api/notice"
  //   );
  //   console.log('<<< axios >>> ',response);
  // })

  // console.log('<<<',message);

  useEffect(() => {
    const fetch = async () => {
      console.log("Hook 동작")

      // api호출 및 페이징 셋팅 , 최종건수 셋팅
      // api호출 방식은 login의 주석부분 참조
      setData([])
      setTotalCount(0)
    }
    fetch();
  }, [searchForm, paging]);

  const testText = () => {
    console.log("auto render")
  }

  const renderButton = () => {
    return (
      <Button variant="contained" color="primary" style={{marginLeft: 10, marginBottom: 10}} onClick={(event) => {testText(); }} >DINAMIC RENDER</Button>
    );
  }
  
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
  return (
    <div className={classes.root}>
      <MenuTitleToolbar title="화면이미지" />
      <SampleToolbar paging={paging} setPaging={setPaging} searchInfo={searchForm} onSearch={setSearchForm} />

      <div className={classes.content}>
       
        <SampleTable paging={paging} setPaging={setPaging} totalCount={totalCount} list={message}/>
        </div>
        <div className={classes.content}>
        <SampleMemberDetails updateClick={updateClick} setUpdateClick={setUpdateClick} memberInfo={memberInfo} setMemberInfo={setMemberInfo} />
      </div>     
      
    </div>
  );
};

export default TestSearch;