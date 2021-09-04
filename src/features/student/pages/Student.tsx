
import * as React from 'react';
import { Route,Switch, useRouteMatch } from 'react-router-dom';
import AddEdit from './AddEdit';
import ListPage from './ListPage';

export interface StudentProps {}

export default function Student(props: StudentProps) {
  const match=useRouteMatch()
  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage/>

      </Route>
      <Route path={`${match.path}/add`} >
        <AddEdit/>

      </Route>
      <Route path={`${match.path}/:studentId`} >
        <AddEdit/>

      </Route>
    </Switch>
  );
}
