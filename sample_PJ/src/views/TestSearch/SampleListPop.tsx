import React, { FC, useState , useEffect } from 'react';
import { Theme, makeStyles, Card, Table, TableBody, TableCell, TableRow,
         Divider, Dialog, DialogActions, DialogContent, DialogTitle, Button, Chip} from '@material-ui/core';
//import { MenuTitleToolbar } from '../components';
//import ListBoardComponentModifyPop from './ListBoardComponentModifyPop';
import axios from 'axios'
import ListBoardComponentModifyPop from './ListBoardComponentModifyPop';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    },
    thStyle: {
      backgroundColor: '#eeeeee',
    },
    tdStyle: {
      border: '1px solid #eeeeee',
      minWidth: '120px',
    },
    chipStyle: {
      marginBottom: '5px',
      fontWeight: 'bold'
    }
  }));

  type Props = {
    detailPop: boolean,
    setDetailPop: React.Dispatch<React.SetStateAction<boolean>>,
    BoardDetail: SampleList,
    setBoardDetail:  React.Dispatch<React.SetStateAction<SampleList>>
}

const SampleListPop: FC<Props> = ({
    detailPop,
    setDetailPop,
    BoardDetail,
    setBoardDetail
}) => {
    const classes = useStyles();
    const [modifyPop, setModifyPop] = useState(false);
  
    const handleClose = () => {
        setDetailPop(false);
    };
  
    const handleModify = () => {
        setModifyPop(true);
    }

  return (
    <Card>
        <Dialog
        open={detailPop}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xl"
        >
        {/* <DialogTitle id="alert-dialog-title"><MenuTitleToolbar title="공지사항"/></DialogTitle> */}
        <Divider />
        <DialogContent>
            <div>
                <Chip label="▶ 공지사항" color="primary"  size="small"  className={classes.chipStyle}/>
                <Table size="small">
                <TableBody>
                <TableRow>
                    <TableCell align="center" className={classes.thStyle}  >작성자</TableCell>
                    <TableCell align="center" className={classes.tdStyle}>{BoardDetail.writer}</TableCell>
                    <TableCell align="center" className={classes.thStyle}>날짜</TableCell>
                    <TableCell align="center" className={classes.tdStyle}>{new Date(BoardDetail.date).getFullYear() + "-" + new Date(BoardDetail.date).getMonth() + "-"+ new Date(BoardDetail.date).getDate()}</TableCell>
                    <TableCell align="center" className={classes.thStyle}>조회수</TableCell>
                    <TableCell align="center" className={classes.tdStyle}>{BoardDetail.read}</TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    <TableCell align="center" className={classes.thStyle}>제목</TableCell>
                    <TableCell align="center" className={classes.tdStyle} colSpan={5}>{BoardDetail.title}</TableCell>
                </TableBody>
                <TableBody>
                    <TableRow>
                    <TableCell align="center" className={classes.thStyle} >내용</TableCell>
                    <TableCell align="center" className={classes.tdStyle} colSpan={5}>{BoardDetail.contents}</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>
            <br/>
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button onClick={handleModify} color="primary">
             수정
            </Button>
            <Button onClick={handleClose} color="primary">
             닫기
            </Button>
        </DialogActions>
        </Dialog>
        <ListBoardComponentModifyPop modifyPop={modifyPop} setModifyPop={setModifyPop} boardDetail={BoardDetail} setBoardDetail={setBoardDetail} setDetailPop={setDetailPop}/>
    </Card>
);
};

export default SampleListPop;