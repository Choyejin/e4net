import React, { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Theme, makeStyles } from '@material-ui/core';
import {
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Link
} from '@material-ui/core';
import stringUtils from '../../common/stringUtils.js';


const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  content: {
    padding: 0
  },
  dialogContent: {
    minWidth: '400px',
  },
  icon: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  isFinalContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
  },
}));

type Props = { 
  paging: Paging,
  setPaging: React.Dispatch<React.SetStateAction<Paging>>,
  totalCount : number,
  list: SampleListInfo[] 
}

const SampleTable: FC<Props> = ({ paging, setPaging, totalCount, list }) => {
  const classes = useStyles();
  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPaging({
      ...paging,
      page: page
    });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaging({
      ...paging,
      rowsPerPage: Number(event.target.value)
    });
  };

  const setTest = (value: string) => {
    console.log(value)
  }

  if(list.length === 0){
    return (
      <Card>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>조회된 내용이 없습니다.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">test1</TableCell>
                  <TableCell align="center">test2</TableCell>
                  <TableCell align="center">test3</TableCell>
                  <TableCell align="center">test4</TableCell>
                  <TableCell align="center">test5</TableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody>
                {list.slice(0, list.length).map((item, index) => (
                  <TableRow
                    hover
                    key={item.test1}
                  >
                    <TableCell align="center">{(index+1)+(paging.page* paging.rowsPerPage)}</TableCell>
                    <TableCell align="center">{item.test2}
                  </TableRow>
                ))}
              </TableBody> */}
              <TableBody>
                <TableRow 
                    hover
                    key='1'
                    >
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">{stringUtils.dateFormat('20210630','yyyy-MM-dd')}</TableCell>
                  <TableCell align="center">{stringUtils.hpFormat('01012341234')}</TableCell>
                  <TableCell align="center">
                    <Link component="button" variant="body1" onClick={() => { setTest('1')}}>
                      test
                    </Link>
                  </TableCell>
                  <TableCell align="center">Y</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow 
                    hover
                    key='2'
                    >
                  <TableCell align="center">2</TableCell>
                  <TableCell align="center">{stringUtils.dateFormat('20210701','yyyy-MM-dd')}</TableCell>
                  <TableCell align="center">{stringUtils.hpFormat('01012341234')}</TableCell>
                  <TableCell align="center">
                    <Link component="button" variant="body1" onClick={() => { setTest('2')}}>
                      test
                    </Link>
                  </TableCell>
                  <TableCell align="center">N</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={totalCount}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={paging.page}
          rowsPerPage={paging.rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

export default SampleTable;
