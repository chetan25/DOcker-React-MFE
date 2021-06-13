  
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { MemoryHistory } from 'history';
import { useHistory } from 'react-router-dom'; 

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
  const localHistory = useHistory();
  console.log(localHistory, 'localHistory');

  return (
    <div>
       <StylesProvider generateClassName={generateClassName}>
           <Router history={history}>
              <Switch>
                  <Route exact path='/home/about' component={About} />
                  <Route exact path='/home' component={Home} />
              </Switch>
           </Router>
       </StylesProvider>
    </div>
  );
};

export default HomeApp;