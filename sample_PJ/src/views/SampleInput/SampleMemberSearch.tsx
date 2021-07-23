import React, { FC,useState } from 'react';
import { Theme, makeStyles, CardContent } from '@material-ui/core';
import {
    Card,
    Grid,
    Button,
    TextField,
  } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  TextField : {
    marginRight: theme.spacing(1)
  },
}));

type Props = {
  onSearch: React.Dispatch<React.SetStateAction<SampleMemberSearchInfo>>
}

const SampleMemberSearch: FC<Props> = ({onSearch}) => {
  const classes = useStyles();

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const handlecardProductGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  const handlecardProductCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onKeyEnter = async (event: React.KeyboardEvent<HTMLInputElement>) =>{
    if(event.key ==="Enter"){
      onSearchClick();
    }

  }

  const onSearchClick = async () => {
    
    const memberSearch:SampleMemberSearchInfo = {} as any;

    memberSearch.userId = userId;
    memberSearch.userName = userName;

    onSearch(memberSearch);
  };


  return (
        <Card>
            <CardContent>
            <Grid
            container
            spacing={1}
            >
            <Grid item md={2} xs={6}> 
            <TextField className={classes.searchInput} placeholder="회원ID" variant="outlined" margin="dense"
              InputLabelProps={{shrink: true,}} fullWidth
              onChange={handlecardProductGroupName} value={userId} onKeyPress={onKeyEnter} ></TextField>
            </Grid>
            <Grid item md={2} xs={6}>
            <TextField className={classes.searchInput} placeholder="회원명" variant="outlined" margin="dense"
            InputLabelProps={{shrink: true,}} fullWidth
            onChange={handlecardProductCode} value={userName} onKeyPress={onKeyEnter} ></TextField>
            </Grid>
            <Grid item md={2} xs={6}>
            <Button variant="contained" color="primary" onClick={onSearchClick} style = {{marginTop: '8px' }}>SEARCH</Button>
            </Grid>
          </Grid>              
          </CardContent>
        </Card>

  );
};

export default SampleMemberSearch;
