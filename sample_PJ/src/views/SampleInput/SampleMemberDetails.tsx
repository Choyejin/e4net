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
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    },
    position: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        float: 'right',
    },
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

    const handleConfirmAddConfirm = async () => {  // ??????
        if(memberInfo.userRank === '') {
            showToast('??????????????? ???????????? ???????????????.','error');
            hideDialog();
            return;
        
        }else if(memberInfo.useYn === null || memberInfo.useYn === ''){
            showToast('??????????????? ???????????????.','error');
            hideDialog();
            return;
        }
        
        // api ?????? ??? ????????? ??????

        //????????? ?????????
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

    const handleConfirmUpdConfirm = async () => { //??????
        if(memberInfo.userRank === '') {
            showToast('??????????????? ???????????? ???????????????.','error');
            hideDialog();
            return;
        
        } else if(memberInfo.useYn === null || memberInfo.useYn === ''){
            showToast('??????????????? ???????????????.','error');
            hideDialog();
            return;
        }
        
        // api ?????? ??? ????????? ??????

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
        { value : '', label : '??????'},
        { value : '00', label : '?????????'},
        { value : '01', label : '??????'},
        { value : '02', label : '??????' },
        { value : '03', label : 'VVIP'}
    ]

    return (

            <Card className={clsx(classes.root, className)}>
                <CardHeader title="<????????????>"/>
                <Table>
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell>
                                ????????????
                            </TableCell>
                            <TableCell>
                            <TextField label="????????????" margin="dense" name ="userRank" 
                            onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                value={memberInfo.userRank} variant="outlined"
                                select
                                SelectProps={{ native: true}}
                                InputLabelProps={{
                                    shrink: true,
                                  }}>
                            {userRankDivision.map(option => (
                                <option key={option.value}
                                value={option.value}
                                >
                                {option.label}    
                                </option>
                            ))}        
                            </TextField>
                            </TableCell>
                            <TableCell>
                                ???????????????
                            </TableCell>
                            <TableCell>
                                <TextField label="???????????????" margin="dense" name="userId" 
                                onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                value={memberInfo.userId}    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                ????????? 
                            </TableCell>
                            <TableCell>
                                <TextField label="?????????" margin="dense" name ="userName"
                                
                                onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                required value={memberInfo.userName} variant="outlined"
                                helperText={isEmpty(memberInfo.userName) ? 'Required' : ''}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>
                                ????????????
                            </TableCell>
                            <TableCell>
                            <TextField label="????????????" margin="dense" name ="phone" 
                            onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                 value={memberInfo.phone} variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                ??????
                            </TableCell>
                            <TableCell>
                                <TextField label="??????" margin="dense" name="address" 
                                onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}
                                value={memberInfo.address}
                                helperText={isEmpty(memberInfo.address) ? 'Required' : ''}
                                variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                ????????????
                            </TableCell>
                            <TableCell>
                            <RadioGroup name ="useYn" value={memberInfo.useYn}
                            onChange={(e) => {handleChange(e); checkFormValidation(); checkFormEmpty();}}>
                            <FormControlLabel value="Y" control={<Radio />} label="Y" defaultChecked/>
                            <FormControlLabel value="N" control={<Radio />} label="N" />
                            </RadioGroup>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <CardActions>
                    <Button //??????
                    color="primary"
                    variant="contained"
                    onClick={() => showDialog(
                        '????????????',
                        '?????? ????????? ?????????????????????????',
                        handleConfirmAddConfirm)}
                    >ADD</Button>

                    <Button //??????
                    color="primary"
                    variant="contained"
                    onClick={() => showDialog(
                        '????????????',
                        '?????? ????????? ?????????????????????????',
                        handleConfirmUpdConfirm)}
                        disabled={!isValidForm}
                    >EDIT</Button>
                    <Button //?????????
                    color="primary"
                    variant="contained"
                    onClick={initTextFields}

                    >RESET</Button>   
                </CardActions>
            </Card>
    );
};

export default SampleMemberDetails;