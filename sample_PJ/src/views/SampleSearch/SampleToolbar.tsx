import React, { FC, useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Button,
  TextField
} from '@material-ui/core';


type Props = {
  paging: Paging,
  setPaging: React.Dispatch<React.SetStateAction<Paging>>,
  searchInfo: SampleSearchInfo,
  onSearch: React.Dispatch<React.SetStateAction<SampleSearchInfo>>
}

const SampleToolbar: FC<Props> = ({paging, setPaging, searchInfo, onSearch}) => {  

  const default_page = 0;
  const default_rowsPerPage = 10;
  const [searchForm, setSearchForm] = useState({
    searchType: searchInfo.searchType,
    searchValue: searchInfo.searchValue,
    startDt: searchInfo.startDt
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value
    });
  };

  const onSearchClick = async () => {
    setPaging({
      ...paging,
      page: default_page,
      rowsPerPage : default_rowsPerPage
    })
    onSearch(searchForm);
  };

  return (
    <Card>
      <form
        autoComplete="off"
        noValidate
      >
        <CardContent>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                select
                fullWidth
                label="검색조건"
                margin="dense"
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                name="searchType"
                value={searchForm.searchType}
                onChange={handleChange}
              >
                <option value="00">전체</option>
                <option value="01">이름</option>
                <option value="02">전화번호</option>
                <option value="03">고객번호</option>
              </TextField>
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="검색값"
                placeholder="검색값"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                name="searchValue"
                value={searchForm.searchValue}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                required
                fullWidth
                type="date"
                label="가입일자"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                name="startDt"
                value={searchForm.startDt}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={onSearchClick}
                style = {{
                  marginTop: '8px'
                }}
              >
                Search 
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export default SampleToolbar;
