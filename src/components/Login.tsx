import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem('authToken', 'your-auth-token');
        navigate('/graphs')
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Авторизація</h2>
            <button onClick={handleLogin} className={styles.button}>
                Вхід
            </button>
        </div>
    );
};

export default Login;