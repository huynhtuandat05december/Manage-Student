import { Box, Button, LinearProgress, makeStyles, TablePagination, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import  React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import StudentTable from '../components/StudentTable';
import { studentAction } from '../studentSlice';
import { Pagination } from '@material-ui/lab';
import StudentFilter from '../components/StudentFilter';
import { ListParams } from 'models';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage () {
  const match = useRouteMatch();
  const history = useHistory();

  const {list,loading,pagination,filter} =useAppSelector(state=>state.student)
  const {cityList}=useAppSelector(state=>state.city)
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(studentAction.fetchData(
      filter
    ));
  }, [dispatch,filter]);
  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentAction.setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  const handleSearchChange=(newFilter:ListParams)=>{
    dispatch(
      studentAction.setFilterWithDebounce(newFilter)
    )

  }
  const handleFilterChange=(newFilter:ListParams)=>{
    dispatch(
      studentAction.setFilter(newFilter)
    )
  }
  return (
    <Box className={classes.root}>
    {loading && <LinearProgress className={classes.loading} />}

    <Box className={classes.titleContainer}>
      <Typography variant="h4">Students</Typography>

      <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Link>
    </Box>
    <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>
    <StudentTable
      studentList={list}
    />
     <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
          
        />
        </Box>
      
      
    </Box>
  );
}
