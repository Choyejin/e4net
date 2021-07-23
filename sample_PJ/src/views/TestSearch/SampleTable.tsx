import React, { FC, useState } from 'react';
//import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardContent,
  CardActions,
  Theme, 
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Link,
  Divider,
  CardHeader
} from '@material-ui/core';
import stringUtils from '../../common/stringUtils.js';
import axios from 'axios'
import List from 'material-ui/List/List';
import SampleListPop from './SampleListPop';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

type Props = { 
  paging: Paging,
  setPaging: React.Dispatch<React.SetStateAction<Paging>>,
  totalCount : number,
  list: SampleList[] 
}

const SampleTable: FC<Props> = ({ paging, setPaging, totalCount, list }) => {
  // const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
  //   setPaging({
  //     ...paging,
  //     page: page
  //   });
  // };

  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [writer, setWriter] = useState('');

  const [detailPop ,setDetailPop] = useState(false);
  const [BoardDetail, setBoardDetail] = useState({
    writer: '',
    title: '',
    contents: '',
    date: '',
    read: '',
    no: ''
  });
 
  const detailPopOpen = async(writer:string, title:string) => {
    setDetailPop(true);
    noticeDetail(writer, title);
    console.log('<<< pop open >>>', writer);
  }

  const noticeDetail = async (writer:string, title:string) => {
    // API-Axios
    axios.post('/api/noticeDetail',{
      writer: writer,
      title: title
    })
      .then(function(response){
        console.log('<<< noticeDetail >>>', response.data);
        setBoardDetail(response.data);
      }).catch(function(error){
        console.log('<<< noticeDetail error >>>', error);
      });
  }

  // const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPaging({
  //     ...paging,
  //     rowsPerPage: Number(event.target.value)
  //   });
  // };

  // const setTest = (value: string) => {
  //   console.log(value)
  // }

  //  if(list.length === 0){
    return (
      <Card>
          { 
            <CardHeader title="공지사항"/>
          }
          <Divider />
         <CardContent className={classes.content}>
            <Table>
              <TableHead>
                    <TableRow>
                      <TableCell align="center">No.</TableCell>
                      <TableCell align="center">제목</TableCell>
                      <TableCell align="center">작성자</TableCell>
                      <TableCell align="center">내용</TableCell>
                      <TableCell align="center">조회수</TableCell>
                      <TableCell align="center">작성일</TableCell>
                    </TableRow>
              </TableHead>
              <TableBody>
              {list.slice((rowsPerPage*page), rowsPerPage*(page+1)).map((list,index) => (
                          <TableRow 
                            hover 
                            key={list.writer + list.title + list.date}
                            onClick={() => { detailPopOpen(list.writer, list.title);}}
                          >
                          <TableCell align="center">{list.no}</TableCell>
                          <TableCell align="center">{list.title}</TableCell>
                          <TableCell align="center">{list.writer}</TableCell>
                          <TableCell align="center">{list.contents}</TableCell>
                          <TableCell align="center">{list.read}</TableCell>
                          <TableCell align="center">{new Date(list.date).getFullYear() + "-" + new Date(list.date).getMonth() + "-"+ new Date(list.date).getDate()}</TableCell>
                          </TableRow>
              ))}
              </TableBody>
            </Table>
          </CardContent>
          <SampleListPop detailPop={detailPop} setDetailPop={setDetailPop} BoardDetail={BoardDetail} setBoardDetail={setBoardDetail} />
      </Card>
    );
  };

export default SampleTable;