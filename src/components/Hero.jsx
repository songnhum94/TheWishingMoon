const Hero = ({ winnerPicked, onShowWinner }) => {
    return (
        <header className="hero-text-container">
            <h1>The Wishing Moon</h1>
            {winnerPicked && (
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <button
                        className="btn-glass-primary"
                        style={{
                            background: 'linear-gradient(45deg, #ffd700, #ff8c00)',
                            color: '#000',
                            fontWeight: 'bold',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '1.2rem',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                            animation: 'heroWinnerBtnPulse 2s infinite',
                            width: 'auto',
                            minWidth: '200px'
                        }}
                        onClick={onShowWinner}
                    >
                        🏆 ดูผู้โชคดี
                    </button>
                    <style>{`
                        @keyframes heroWinnerBtnPulse {
                            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
                            70% { transform: scale(1.05); box-shadow: 0 0 30px 15px rgba(255, 215, 0, 0); }
                            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
                        }
                    `}</style>
                </div>
            )}
        </header>
    );
};
export default Hero;
