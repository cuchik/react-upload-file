import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { URL } from 'helpers';
import { Main as MainLayout, RouteWithLayout } from './layouts';
import { Photos as PhotosView } from './containers';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from={URL.HOME()} to={URL.PHOTOS()} />
      <RouteWithLayout
        component={PhotosView}
        exact
        layout={MainLayout}
        path={URL.PHOTOS()}
      />
      <Redirect to={URL.PHOTOS()} />
    </Switch>
  );
};

export default Routes;
