  
import React, {Suspense, lazy, useState}  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const HomePage = lazy(() => import('./components/home-page'));

import Shell from './Shell';
import Loader from './components/loader';

 // @ts-ignore
 const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'hst'
});

const App = () => {
    // const { ready } =  useDynamicScript({
    //   url: "http://localhost:3001/remoteEntry.js"
    // });
    // console.log(ready, 'ready');

    // if (!ready) {
    //   return null;
    // }

    return (
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
          <div>
              <Suspense fallback={<Loader />}>
                 <div>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        component={RouterLink}
                        to="/"
                      >
                        Container
                      </Typography>
                </div>
                <Switch>
                  <Route path='/' exact component={Shell}></Route>
                  <Route path='/home' component={HomePage} />
                </Switch>
              </Suspense> 
          </div>
        </StylesProvider>
      </BrowserRouter>
    );
};

export default App;