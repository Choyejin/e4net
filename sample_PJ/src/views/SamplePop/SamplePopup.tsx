import React, { FC, useState } from 'react';
import { Theme, makeStyles , Card } from '@material-ui/core';
import { MenuTitleToolbar } from '../../components';
import {
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  FormGroup,
  FormControlLabel, 
  Checkbox
} from '@material-ui/core';

import stringUtils from '../../common/stringUtils.js';

const useStyles = makeStyles((theme: Theme) => ({
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
  popFlag: boolean,
  setPopFlag: React.Dispatch<React.SetStateAction<boolean>>,
}

const SamplePopup: FC<Props> = ({ popFlag, setPopFlag }) => {
  const classes = useStyles();
  const [detailData] = useState({
    userSeq : '00000001',
    userId :'red_road_circle',
    userName :'홍길동',
    firstJoinDate : '20210601',
    lastJoinDate : '20210630',
    totalWrite : '1200',
    totalComment: '25400',
    lastWrite : '20210629',
    lastComment : '20210629',
    userExistYn : 'Y'
  });

  const handlePopClose = () => {
    setPopFlag(false);
  };

  const displayProcessStatus = (processStatus:string) => {
    
    let displayStatus = '';
    if (processStatus === 'Y') displayStatus = '활동중';
    else if (processStatus === 'N') displayStatus = '탈퇴';
    else displayStatus = '확인중';

    return displayStatus;
  };

  return (
    <Card>
    <Dialog
      open={popFlag}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title"><MenuTitleToolbar title="회원정보 상세조회" /></DialogTitle>
      <Divider />
      <DialogContent>
        <div>
            <Chip label="▶ 회원정보" color="primary"  size="small"  className={classes.chipStyle}/>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell align="center" className={classes.thStyle}>회원번호</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{detailData.userSeq}</TableCell>
                  <TableCell align="center" className={classes.thStyle}>회원ID</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{detailData.userId}</TableCell>
                  <TableCell align="center" className={classes.thStyle}>회원등급</TableCell>
                  <TableCell align="center" className={classes.tdStyle} colSpan={3}>
                    <FormGroup row>
                      <FormControlLabel
                        control={<Checkbox size="small" checked={false} style = {{ padding: '0px' }}/>}
                        label="브론즈"
                        color="primary"
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" checked={false} style = {{ padding: '0px' }} />}
                        label="실버"
                        color="primary"
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" checked={true} style = {{ padding: '0px' }} />}
                        label="골드"
                        color="primary"
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" checked={false} style = {{ padding: '0px' }} />}
                        label="VVIP"
                        color="primary"
                      />
                    </FormGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" className={classes.thStyle}>한글성명</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{detailData.userName}</TableCell>
                  <TableCell align="center" className={classes.thStyle}>가입일자</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{stringUtils.dateFormatDefault(detailData.firstJoinDate)}</TableCell>
                  <TableCell align="center" className={classes.thStyle}>최근접속일자</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{stringUtils.dateFormatDefault(detailData.lastJoinDate)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </div>
        <br/>
        <div>
            <Chip label="▶ 활동정보" color="primary" size="small" className={classes.chipStyle} />
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell align="center" className={classes.thStyle}>총 작성글</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{stringUtils.moneyFormat(detailData.totalWrite)}개</TableCell>
                  <TableCell align="center" className={classes.thStyle}>총 댓글</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{stringUtils.moneyFormat(detailData.totalComment)}개</TableCell>
                  <TableCell align="center" className={classes.thStyle}>최근작성일자</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{stringUtils.dateFormatDefault(detailData.lastWrite)}</TableCell>
                  <TableCell align="center" className={classes.thStyle}>최근댓글일자</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{stringUtils.dateFormatDefault(detailData.lastComment)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </div>
        <br/>
        <div>
            <Chip label="▶ 활동정보" color="primary" size="small" className={classes.chipStyle} />
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell align="center" className={classes.thStyle}>회원탈퇴상태</TableCell>
                  <TableCell align="center" className={classes.tdStyle}>{displayProcessStatus(detailData.userExistYn)}</TableCell>
                  <TableCell align="center" className={classes.tdStyle}></TableCell>
                  <TableCell align="center" className={classes.tdStyle}></TableCell>
                  <TableCell align="center" className={classes.tdStyle}></TableCell>
                  <TableCell align="center" className={classes.tdStyle}></TableCell>
                  <TableCell align="center" className={classes.tdStyle}></TableCell>
                  <TableCell align="center" className={classes.tdStyle}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </div>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handlePopClose} color="primary">
           닫기
        </Button>
      </DialogActions>
    </Dialog>
    </Card>
  );
};

export default SamplePopup;
