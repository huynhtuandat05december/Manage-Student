import { Box, Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { Student } from 'models';
import * as React from 'react';
import { capitalizeString, getMarkColor } from 'utils/common';
const useStyles = makeStyles((theme) => ({
    table: {},
    edit: {
      marginRight: theme.spacing(1),
    },
  }));
export interface StudentTableProps {
    studentList:Student[]
}

export default function StudentTable ({studentList}: StudentTableProps) {
  const classes = useStyles();
  const {cityList} =useAppSelector(state=>state.city)
  return (
    <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell width={310}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{ capitalizeString( student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor( student.mark)} fontWeight="bold">
                    { student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityList.find(item=>item.code===student.city)?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                  >
                    Edit
                  </Button>

                  <Button size="small" color="secondary" >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
