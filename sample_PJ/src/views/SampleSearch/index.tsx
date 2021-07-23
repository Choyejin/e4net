import React, { useState, useEffect } from 'react';
import { Theme, makeStyles, Button } from '@material-ui/core';
import { MenuTitleToolbar } from '../../components';
import {format} from 'date-fns';
import SampleToolbar from './SampleToolbar'
import SampleTable from './SampleTable'
import xlsx from 'xlsx'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const SampleSearch = () => {
  const startDate = new Date();
  const classes = useStyles();
  const default_page = 0;
  const default_rowsPerPage = 10;
  const [data, setData] = useState([]);
  const [searchForm, setSearchForm] = useState({
    searchType: '',
    searchValue: '',
    startDt: format(startDate, 'yyyy-MM-dd')
  });

  const [totalCount, setTotalCount] = useState(0);

  const [paging, setPaging] = useState({
    page: default_page,
    rowsPerPage: default_rowsPerPage
  });

  const [isExcelDown, setExcelDown] = useState(false);

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

  const excelClick = () => {
    // setExcelDown(true);
    const xlsxData = [
      { test1:1, test2:2, test3:3 , test4:4},
      { test1:5, test2:6, test3:7 , test4:8},
      { test1:9, test2:10, test3:11 , test4:12},
      { test1:13, test2:14, test3:15 , test4:16}
    ]
    const ws = xlsx.utils.json_to_sheet(xlsxData)
    console.log(ws)
    const wb = xlsx.utils.book_new();
    console.log(wb)
    xlsx.utils.book_append_sheet(wb,ws,"sheet name")
    xlsx.writeFile(wb,"sample_file_name.xlsx")
  }

  const testText = () => {
    console.log("auto render")
  }

  const renderButton = () => {
    return (
      <Button variant="contained" color="primary" style={{marginLeft: 10, marginBottom: 10}} onClick={(event) => {testText(); }} >DINAMIC RENDER</Button>
    );
  }

  return (
    <div className={classes.root}>
      <MenuTitleToolbar title="회원검색" />
      <SampleToolbar paging={paging} setPaging={setPaging} searchInfo={searchForm} onSearch={setSearchForm} />
      <div className={classes.content}>
        <Button variant="contained" color="primary" style={{marginLeft: 'auto', marginBottom: 10}} onClick={(event) => {excelClick(); }} >Excel</Button>
        {renderButton()}
        <SampleTable paging={paging} setPaging={setPaging} totalCount={totalCount} list={data}/>
      </div>
    </div>
  );
};

export default SampleSearch;
