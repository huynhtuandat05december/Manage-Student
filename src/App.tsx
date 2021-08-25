import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import cityApi from 'api/cityApi';
import { Route, Router, Switch } from 'react-router';
import { NotFound, PrivateRoute } from 'components/Common';
import Admin from 'components/Layout/Admin';
import Login from 'features/auth/pages/LoginPage';

function App() {
  useEffect(() => {
    cityApi.getAll().then((res) => console.log(res));
  }, []);
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/admin" exact>
          <Admin />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
