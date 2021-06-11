  
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { MemoryHistory } from 'history';

import About from './About';
import Home from './Home';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'mrk'
});

interface HomeAppProps {
  history: MemoryHistory
}

const HomeApp = ({history}: HomeAppProps) => {
  return (
    <div>
       <StylesProvider generateClassName={generateClassName}>
           <Router history={history}>
              <Switch>
                  <Route exact path='/about' component={About} />
                  <Route exact path='/' component={Home} />
              </Switch>
           </Router>
       </StylesProvider>
    </div>
  );
};

export default HomeApp;