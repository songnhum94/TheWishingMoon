import React from 'react';

const Navbar = ({ countdown, totalWishes, walletAddress, onConnect, onDisconnect, winnerPicked, onShowWinner }) => {
    return (
        <nav className="navbar">
            <div className="logo">
                <a href="https://flashmoon.io/" target="_blank" rel="noopener noreferrer">
                    <img src="/Asset/flash-moon-logo.png" alt="Flash Moon Logo" />
                </a>
            </div>

            <div id="nav-stats" className="nav-stats-container">
                <div className="nav-stat-item">
                    <h4>เวลากิจกรรม</h4>
                    <div id="countdown-timer" className="stat-value-nav">{countdown}</div>
                </div>
                <div className="nav-stat-item">
                    <h4>คำอธิษฐานทั้งหมด</h4>
                    <div id="total-wishes" className="stat-value-nav">{totalWishes}</div>
                </div>
            </div>

            <div className="nav-wallet-ui">
                {!walletAddress ? (
                    <button id="nav-connect-wallet-btn" className="btn-glass-primary nav-btn" onClick={onConnect}>
                        🔗 Connect Wallet
                    </button>
                ) : (
                    <div
                        id="nav-wallet-address"
                        className="wallet-info-nav glass-card"
                        style={{ cursor: 'pointer' }}
                        title="คลิกเพื่อยกเลิกการเชื่อมต่อ"
                        onClick={onDisconnect}
                    >
                        {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes winnerBtnPulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
                    70% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
