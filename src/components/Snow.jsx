import { useEffect } from 'react';

const Snow = () => {
    useEffect(() => {
        const container = document.getElementById('snow-container');
        if (!container) return;

        const createSnowflake = () => {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            const size = Math.random() * 4 + 2;
            flake.style.width = `${size}px`;
            flake.style.height = `${size}px`;
            flake.style.left = `${Math.random() * 100}vw`;
            const fallDuration = Math.random() * 10 + 10;
            const swayDuration = Math.random() * 4 + 3;
            flake.style.opacity = Math.random() * 0.7 + 0.3;
            const delay = Math.random() * 10;
            flake.style.animation = `fall ${fallDuration}s linear ${delay}s infinite, sway ${swayDuration}s ease-in-out ${delay}s infinite`;
            container.appendChild(flake);
        };

        for (let i = 0; i < 50; i++) {
            createSnowflake();
        }

        return () => {
            if (container) container.innerHTML = '';
        };
    }, []);

    return <div id="snow-container"></div>;
};

export default Snow;
