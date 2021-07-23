import React from 'react';
import {
  Switch,
  Redirect,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import Login from './views/Login';
import Logout from './views/Logout';
import NotFound from './views/NotFound';
import SampleSearch from './views/SampleSearch';
import SampleInput from './views/SampleInput';
import SamplePop from './views/SamplePop';
import TestSearch from './views/TestSearch';

const Routes: React.FC<RouteComponentProps> = props => {
  return (
    <Switch>
      <Redirect exact from="/" to="/sample-search" />
      
      <RouteWithLayout
        component={SampleSearch}
        layout={MainLayout}
        path="/sample-search"
      />
      
      <RouteWithLayout
        component={SampleInput}
        layout={MainLayout}
        path="/sample-input"
      />
      
      <RouteWithLayout
        component={SamplePop}
        layout={MainLayout}
        path="/sample-pop"
      />

      <RouteWithLayout
        component={Login}
        layout={MinimalLayout}
        path="/login"
      />

      <RouteWithLayout
        component={Logout}
        layout={MinimalLayout}
        path="/logout"
      /> 

      <RouteWithLayout
        component={NotFound}
        layout={MinimalLayout}
        path="/not-found"
      />
    
      <RouteWithLayout
        component={TestSearch}
        layout={MinimalLayout}
        path="/testsearch"
      />



      <Redirect to="/not-found" />
    </Switch>
  );
};

export default withRouter(Routes);
