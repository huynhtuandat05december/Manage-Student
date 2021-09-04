import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import  React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import StudentTable from '../components/StudentTable';
import { studentAction } from '../studentSlice';

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

  const {list,loading} =useAppSelector(state=>state.student)
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(studentAction.fetchData({
      _page:1,
      _limit:15
    }));
  }, [dispatch]);
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
    <StudentTable
      studentList={list}
    />
    </Box>
  );
}
