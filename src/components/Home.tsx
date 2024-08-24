import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import graph1 from '../assets/graph1.png';
import graph2 from '../assets/graph2.jpg';
import graph3 from '../assets/graph3.jpg';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [graph1, graph2, graph3];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);

        return () => clearInterval(slideInterval);
    }, []);

    const handleLogin = () => {
        navigate('/graphs'); // Перенаправляє прямо на сторінку графів
    }

    return (
        <div className={styles.homeContainer}>
            <div className={styles.header}>
                <button onClick={() => navigate('/login')} className={styles.button}>Авторизація</button>
            </div>
            <h1>Вітаємо у Graph Builder</h1>
            <div className={styles.greetingSection}>
                <div className={styles.carousel}>
                    <img
                        src={slides[currentSlide]}
                        alt={`Graph ${currentSlide + 1}`}
                        className={styles.carouselImage}
                    />
                </div>
            </div>
            <button onClick={handleLogin} className={styles.button}>
                Вхід без авторизації
            </button>
            <div className={styles.infoSection}>
                <p>Дізнайтеся більше про наші можливості і графічні рішення!</p>
            </div>
            <footer className={styles.footer}>
                <h2>Контакти</h2>
                <p>Email: miroslavakukhta@gmail.com</p>
                <p>Телефон: +380 123 123 123</p>
            </footer>
        </div>
    );
};

export default Home;





