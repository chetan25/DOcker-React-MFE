  
import React, {Suspense, lazy, useState}  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const HomeApp = lazy(() => import('./components/home-app'));

import Shell from './Shell';
import Loader from './components/loader';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'hst'
});

const App = () => {
    return (
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
          <div>
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path='/' exact component={Shell} />
                  <Route path='/home' component={HomeApp} />
                </Switch>
              </Suspense> 
          </div>
        </StylesProvider>
      </BrowserRouter>
    );
};

export default App;