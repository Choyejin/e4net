import React , {FC,ChangeEvent, useState} from 'react';
import clsx from 'clsx';

import {
    Theme,
    makeStyles,
    Card,
    CardHeader,
    CardActions,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,    
} from '@material-ui/core';

import { useToast } from '../../contexts/Toast';
import { useDialog } from '../../contexts/Dialog';

const useStyles = makeStyles((theme: Theme) => ({
    root: {


    },
    position: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        float: 'right',
    },
    thStyle: {
        backgroundColor: '#eeeeee',
        border: '1px solid #444444',
      },
      tdStyle: {
        border: '1px solid #444444',
      },
      chipStyle: {
        marginBottom: '5px',
        fontWeight: 'bold'
      }
    
}));

type Props = {
    className?: string,
    memberInfo: SampleMemberDetailInfo,
    setMemberInfo: React.Dispatch<React.SetStateAction<SampleMemberDetailInfo>>,
    updateClick: boolean,
    setUpdateClick: React.Dispatch<React.SetStateAction<boolean>>,
}


const SampleMemberDetails: FC<Props> = ({ className, updateClick, setUpdateClick, memberInfo, setMemberInfo}) => {
    const classes = useStyles();
    const { showToast } = useToast();

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setMemberInfo({
            ...memberInfo,
            [e.target.name] : e.target.value
        });
    };

    const [isValidForm, setIsValidForm] = React.useState(false);

    const checkFormValidation = () => {
        if((isEmpty(memberInfo.userName) || isEmpty(memberInfo.userId)) === false) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false)
        }
        setUpdateClick(updateClick)
    }
    
    const [isEmptyForm, setIsEmptyForm] = useState(true);

    const checkFormEmpty = () => {
        if((isEmpty(memberInfo.userRank) &&
            isEmpty(memberInfo.userName) &&
            isEmpty(memberInfo.userId) &&
            isEmpty(memberInfo.phone) &&
            isEmpty(memberInfo.address) &&
            isEmpty(memberInfo.useYn)
            ) === true) {
                setIsEmptyForm(true);
            } else { setIsEmptyForm(false) }
    }


    const { showDialog, hideDialog} = useDialog();

    const handleConfirmAddConfirm = async () => {  // 신규
        if(memberInfo.userRank === '') {
            showToast('유저등급이 선택되지 않았습니다.','error');
            hideDialog();
            return;
        
        }else if(memberInfo.useYn === null || memberInfo.useYn === ''){
            showToast('사용여부를 입력하세요.','error');
            hideDialog();
            return;
        }
        
        // api 호출 및 후처리 작성

        //데이터 초기화
        setMemberInfo({
            ...memberInfo,
            userRank:'',
            userId:'',
            userName:'',
            phone:'',
            address:'',
            useYn:'',
        });
        setUpdateClick(!updateClick);
        setIsValidForm(false);
        hideDialog();
    }

    const handleConfirmUpdConfirm = async () => { //수정
        if(memberInfo.userRank === '') {
            showToast('유저등급이 선택되지 않았습니다.','error');
            hideDialog();
            return;
        
        } else if(memberInfo.useYn === null || memberInfo.useYn === ''){
            showToast('사용여부를 입력하세요.','error');
            hideDialog();
            return;
        }
        
        // api 호출 및 후처리 작성

        setUpdateClick(!updateClick);
        setIsValidForm(false);
    }

    const initTextFields = () => {
        setMemberInfo({
            ...memberInfo,
            userId:'',
            userName:'',
            userRank:'',
            address:'',
            phone:'',
            useYn:'',
        });
        setIsEmptyForm(false);
        setUpdateClick(!updateClick);
    }



    const isEmpty = (input: string) => {
        return input === '';
    }

    const userRankDivision = [
        { value : '', label : '선택'},
        { value : '00', label : '브론즈'},
        { value : '01', label : '실버'},
        { value : '02', label : '골드' },
        { value : '03', label : 'VVIP'}
    ]

    return (

            <Card className={clsx(classes.root, className)}>
                <CardHeader title= "게시글정보"/>
                <Table>
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell align="right" className={classes.thStyle}>
                                게시글번호
                                </TableCell>
                            <TableCell className={classes.tdStyle}>
                                <TextField label="" margin="dense" name="userId" 
                                onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                value={memberInfo.userId}    variant="outlined"
                                />
                            </TableCell>
                            <TableCell align="right" className={classes.thStyle}>
                                제목
                            </TableCell>
                            <TableCell className={classes.tdStyle}>
                                <TextField label="" margin="dense" name="userId" 
                                onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                value={memberInfo.userId}    variant="outlined"
                                />                               </TableCell>
                                <TableCell align="right" className={classes.thStyle}>
                                    작성자 
                                </TableCell>
                                <TableCell className={classes.tdStyle}>
                                    <TextField label="" margin="dense" name ="userName"
                                    
                                    onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                    value={memberInfo.phone} variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell align="right" className={classes.thStyle}>
                                    내용
                                </TableCell>
                                <TableCell className={classes.tdStyle}>
                                <TextField label="" margin="dense" name ="phone" 
                                onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                     value={memberInfo.phone} variant="outlined"
                                    />
                                </TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell align="right" className={classes.thStyle}>
                                    작성일자
                                </TableCell>
                                <TableCell className={classes.tdStyle}>
                                    <TextField label="" margin="dense" name="address" 
                                    onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                    value={memberInfo.address}
                                    variant="outlined"
                                    />
                                </TableCell>                              
                            </TableRow>
                        </TableBody>
                    </Table>
                    <CardActions>
                        <Button //신규
                        color="primary"
                        variant="contained"
                        onClick={() => showDialog(
                            '회원정보',
                            '해당 정보로 저장하시겠습니까?',
                            handleConfirmAddConfirm)}
                        >ADD</Button>

                    <Button //수정
                    color="primary"
                    variant="contained"
                    onClick={() => showDialog(
                        '회원정보',
                        '해당 정보로 수정하시겠습니까?',
                        handleConfirmUpdConfirm)}
                        disabled={!isValidForm}
                    >EDIT</Button>
                    <Button //초기화
                    color="primary"
                    variant="contained"
                    onClick={initTextFields}

                    >RESET</Button>   
                </CardActions>
            </Card>
    );
};

export default SampleMemberDetails;