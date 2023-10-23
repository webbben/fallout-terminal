import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import HackScreen from './components/hacking/HackScreen';
import About from './components/About';
import Menu from './components/Menu';
import Resume from './components/Resume';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HackScreen />
            },
            {
                path: "/main",
                element: <Main />,
                children: [
                    {
                        index: true,
                        element: <Menu />
                    },
                    {
                        path: "/main/about",
                        element: <About />
                    },
                    {
                        path: "/main/resume",
                        element: <Resume />
                    }
                ]
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
// note:  I removed strict mode - not sure if I'd want it back at some point though, but it was causing double rendering
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
