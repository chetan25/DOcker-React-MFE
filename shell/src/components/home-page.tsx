import React, {lazy, useEffect, useRef } from 'react';
import { mountHomeApp } from 'home/HomeApp';
import { useHistory } from 'react-router-dom';  

interface LocationProp {
    hash: string;
    key: string;
    pathname: string;
    search:string; 
}

const HomePage = () => {
    const ref = useRef(null);
    const history = useHistory();
    console.log('shell');

    useEffect(() => {
        if (ref.current) {
         
            console.log( history.location.pathname, ' history.location.pathname');
            const {onContainerNavigate} = mountHomeApp(ref.current!, {
                onNavigate: ({ pathname: newPathName }: LocationProp) => {
                    const { pathname } = history.location;
                    // to prevent from going into infinite loop of updating route form different locations, we put a check
                    if (pathname !== newPathName) {
                        history.push(newPathName);
                    }
                },
                initialPath: history.location.pathname
            });
    
            history.listen(onContainerNavigate);
        }
    }, []);

    return (
        <div>
            <h1>Hello From remote</h1>
            <div ref={ref} style={{'border': '2px solid red', height:'200px'}}></div>
        </div>
    );
};

export default HomePage;