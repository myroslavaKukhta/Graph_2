import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Graph from './components/Graph';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from './App.module.css';
import Home from "./components/Home";
import Login from "./components/Login";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className={styles.App}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/graphs" element={
                            <>
                                <Header/>
                                <Sidebar/>
                                <div className={styles.graphContainer}>
                                    <Graph/>
                                </div>
                            </>
                        }/>
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
























