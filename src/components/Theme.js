import React, {useEffect} from 'react';
import { Switch } from '@material-ui/core';

export default function Theme({isDark, setIsDark}) {

    const themeHandler = () => {
        if(isDark) {   
            localStorage.setItem('Theme', 'dark');
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        } if(!isDark) {
            localStorage.setItem('Theme', 'light');
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
        setIsDark(!isDark);
    };

    const getTheme = localStorage.getItem('Theme');

    useEffect(() => {
        const getTheme = localStorage.getItem('Theme');
        if(getTheme === 'dark') return document.body.classList.add('dark-mode');
        if(getTheme === 'light') return document.body.classList.add('light-mode');
    }, [getTheme]);

    return(
        <div className="button-theme">
        <Switch checked={getTheme === 'dark' ? true : false} onClick={themeHandler} />
        </div>
    )
}