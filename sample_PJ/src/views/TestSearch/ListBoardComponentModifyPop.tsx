import React, { FC, ChangeEvent, useState , useEffect } from 'react';
import { Theme, makeStyles, Card, Table, TableBody, TableCell, TableRow, TextField,
         Divider, Dialog, DialogActions, DialogContent, DialogTitle, Button, Chip} from '@material-ui/core';
import axios from 'axios'


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
    modifyPop: boolean,
    setModifyPop: React.Dispatch<React.SetStateAction<boolean>>,
    boardDetail: SampleList,
    setBoardDetail: React.Dispatch<React.SetStateAction<SampleList>>,
    setDetailPop: React.Dispatch<React.SetStateAction<boolean>>,
}

const ListBoardComponentModifyPop: FC<Props> = ({
    modifyPop,
    setModifyPop,
    boardDetail,
    setBoardDetail,
    setDetailPop
}) => {
    const classes = useStyles();

    const handleClose = () => {
        setModifyPop(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setBoardDetail({
            ...boardDetail,
            [e.target.name] : e.target.value
        });
        console.log('<<< boardDetail.contents',boardDetail.contents);
        console.log('<<< boardDetail.title',boardDetail.title);
        console.log('<<< boardDetail.No',boardDetail.no);
    };

    const updateAction = async () => {
        console.log('수정저장');
        // API-Axios
        axios.post('/api/noticeUpdate',{
            contents: boardDetail.contents,
            title: boardDetail.title,
            no: boardDetail.no
        })
            .then(function(response){
            console.log('<<< noticeUpdate >>>', response.data);
            setBoardDetail(response.data);
            }).catch(function(error){
            console.log('<<< noticeUpdate error >>>', error);
            });
        setModifyPop(false);
        setDetailPop(false);
    }

    return (
        <Card>
            <Dialog
            open={modifyPop}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="xl"
            >
            <Divider />
            <DialogContent>
                <div>
                    <Chip label="▶ 수정" color="primary"  size="small"  className={classes.chipStyle}/>
                    <Table size="small">
                    <TableBody>
                        <TableRow>
                        <TableCell align="center" className={classes.thStyle}>작성자</TableCell>
                        <TextField label="작성자" margin="dense" name ="writer" value={boardDetail.writer} disabled/>
                        <TableCell align="center" className={classes.thStyle}>날짜</TableCell>
                        <TextField label="날짜" margin="dense" name ="date" value={boardDetail.date} disabled/>
                        <TableCell align="center" className={classes.thStyle}>조회수</TableCell>
                        <TextField label="조회수" margin="dense" name ="read" value={boardDetail.read} disabled/>
                        <TableCell align="center" className={classes.thStyle}>id</TableCell>
                        <TextField label="id" margin="dense" name ="No" value={boardDetail.no} disabled/>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableCell align="center" className={classes.thStyle}>제목</TableCell>
                        <TextField label="제목" margin="dense" name ="title" defaultValue={boardDetail.title} multiline
                                   onChange={(e) => {handleChange(e);}} value={boardDetail.title}
                        />
                    </TableBody>
                    <TableBody>
                        <TableRow>
                        <TableCell align="center" className={classes.thStyle}>내용</TableCell>
                        <TextField label="내용" margin="dense" name ="contents" defaultValue={boardDetail.contents} multiline
                                    onChange={(e) => {handleChange(e);}} value={boardDetail.contents}
                        />
                        </TableRow>
                    </TableBody>
                    </Table>
                </div>
                <br/>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button color="primary" onClick={updateAction}>
                 저장
                </Button>
                <Button onClick={handleClose} color="primary">
                 닫기
                </Button>
            </DialogActions>
            </Dialog>
        </Card>
    );
};

export default ListBoardComponentModifyPop;