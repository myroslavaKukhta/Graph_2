import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Graph from './components/Graph';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import styles from './App.module.css';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className={styles.App}>
                <Header />
                <Sidebar />
                <div className={styles.graphContainer}>
                    <Graph />
                </div>
            </div>
        </Provider>
    );
};

export default App;




















