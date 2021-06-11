import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import HomeApp from './app';

interface LocationProp {
    hash: string;
    key: string;
    pathname: string;
    search:string; 
}

interface MountOptions {
    onNavigate?:  () => void;
    defaultHistory?: any;
    initialPath?: string;
    onAuthChange?: (user: {email: string} | null) => void;
}

const mountHomeApp = (element: HTMLElement, options?: MountOptions) => {
    console.log('mountHomeApp');
    const history = options?.defaultHistory ? options.defaultHistory : createMemoryHistory({
        initialEntries: [options?.initialPath || '']
    });

    if (options) {
        history.listen(options.onNavigate);
    }
     /** Render to DOM **/
    ReactDOM.render(
        <HomeApp history={history}/>,
        element
    );

      // for container to update home app
    return {
        onContainerNavigate({pathname: newContainerPath}: LocationProp) {
            const { pathname } = history.location;
            if (pathname !== newContainerPath) {
                history.push(newContainerPath);
            }
        }
    }
}

// check for running in development mode, used for standalone
if (process.env.NODE_ENV === 'development') {
    const history = createBrowserHistory();
    const element = document.querySelector('#home-app') as HTMLElement;
    if (element) {
        mountHomeApp(element, {defaultHistory: history});
    }
}


// used by Container App to load the Micro FE
export { mountHomeApp };