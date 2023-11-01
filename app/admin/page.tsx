// IndexPage.tsx
'use client';
import { useEffect } from 'react';
import anime from 'animejs';
import styles from '../styles/styles.module.css';

const IndexPage = () => {
    useEffect(() => {
        let current: any = null;

        const handleFocus = (value: number) => {
            if (current) current.pause();
            current = anime({
                targets: 'path',
                strokeDashoffset: {
                    value: value,
                    duration: 700,
                    easing: 'easeOutQuart',
                },
                strokeDasharray: {
                    value: '240 1386',
                    duration: 700,
                    easing: 'easeOutQuart',
                },
            });
        };

        document.querySelector('#email')?.addEventListener('focus', () => handleFocus(0));
        document.querySelector('#password')?.addEventListener('focus', () => handleFocus(-336));
        document.querySelector('#submit')?.addEventListener('focus', () => handleFocus(-730));
    }, []);

    return (
        <div className={`${styles.page} ${styles.bgImage}`}>
            <div className={`${styles.container} flex`}>
                <div className={`${styles.left} ${styles.bgWhite} relative w-1/2 border-r border-gray-300`}>
                    <div className={`${styles.login} text-5xl font-bold text-yellow-500 mt-8`}>Se connecter</div>
                    <div className={`${styles.eula} text-black text-sm mt-8 ml-4`}>L&apos;application qui fait du temps votre allié!</div>
                </div>
                <div className={`${styles.right} ${styles.bgBlue} shadow-xl text-white relative w-1/2`}>
                    <svg viewBox="0 0 320 300" className={`${styles.absolute} w-80`}>
                        <defs>
                            <linearGradient
                                id="linearGradient"
                                x1="13"
                                y1="193.49992"
                                x2="307"
                                y2="193.49992"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop style={{ stopColor: '#DAAB54FF' }} offset="0" id="stop876" />
                                <stop style={{ stopColor: '#044184' }} offset="1" id="stop878" />
                            </linearGradient>
                        </defs>
                        <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
                    </svg>
                    <div className={`${styles.form} ${styles.absolute} m-8`}>
                        <form method="post" action="#">
                            <label htmlFor="email" className={`${styles.textWhite} block text-sm mt-4`}>
                                Email
                            </label>
                            <input type="email" id="email" name="email" className={`${styles.bgTransparent} ${styles.borderB} ${styles.borderWhite} ${styles.textWhite} w-full`} />
                            <label htmlFor="password" className={`${styles.textWhite} block text-sm mt-4`}>
                                Mot de passe
                            </label>
                            <input type="password" id="password" name="password" className={`${styles.bgTransparent} ${styles.borderB} ${styles.borderWhite} ${styles.textWhite} w-full`} />
                            <input type="submit" id="submit" value="Submit" className={`${styles.textGray700} mt-8 ${styles.transition} ${styles.duration300} focus:${styles.textWhite} focus:${styles.outlineNone}`} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
