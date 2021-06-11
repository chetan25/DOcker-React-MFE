import React, { useEffect, useRef } from 'react';
import { mountHomeApp } from 'home/HomeApp';
import { useHistory } from 'react-router-dom';

interface LocationProp {
    hash: string;
    key: string;
    pathname: string;
    search:string; 
}

const HomeApp = () => {
    console.log('shell');
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        console.log(mountHomeApp);
        // if (ref.current) {
            
        //     const {onContainerNavigate} = mountHomeApp(ref.current!, {
        //         onNavigate: ({ pathname: newPathName }: LocationProp) => {
        //             const { pathname } = history.location;
        //             // to prevent from going into infinite loop of updating route form different locations, we put a check
        //             if (pathname !== newPathName) {
        //                 history.push(newPathName);
        //             }
        //         },
        //         initialPath: history.location.pathname
        //     });
    
        //     history.listen(onContainerNavigate);
        // }
    }, []);

    return (
        <div ref={ref}></div>
    );
};

export default HomeApp;