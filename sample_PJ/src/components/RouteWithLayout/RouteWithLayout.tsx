import React from 'react';
import store from 'store';
import {
  Route,
  RouteComponentProps,
  Redirect,
  useLocation
} from 'react-router-dom';

type Props = {
  component: any;
  layout: any;
  // all others
  [x: string]: any;
};

const RouteWithLayout = (props: Props) => { 
  const { layout: Layout, component: Component, ...rest } = props;
  const { pathname } = useLocation();
  const isAuthed =
  !(window.sessionStorage.getItem('token') == null) ||
  pathname === '/login' ||
  pathname === '/login/done' ;   

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isAuthed ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      }
    />
  );
};

export default RouteWithLayout;
