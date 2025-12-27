import React from 'react';

const WinnerModal = ({ winner, onClose }) => {
    if (!winner) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            flexDirection: 'column',
            color: '#fff',
            animation: 'modalFadeIn 0.8s ease-out'
        }}>
            <div className="glass-card winner-card" style={{
                padding: '4rem',
                textAlign: 'center',
                border: '3px solid #ffd700',
                boxShadow: '0 0 100px rgba(255, 215, 0, 0.3)',
                maxWidth: '800px',
                width: '95%',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(20, 20, 20, 0.8)'
            }}>
                <h1 className="congrats-text" style={{
                    fontSize: '3.5rem',
                    color: '#ffd700',
                    marginBottom: '1.5rem',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
                    fontWeight: '900',
                    letterSpacing: '5px'
                }}>CONGRATULATIONS!</h1>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff', opacity: 0.9 }}>
                    ผู้โชคดีได้รับรางวัลใหญ่
                </h2>

                <div className="prize-container" style={{ marginBottom: '3rem', position: 'relative' }}>
                    <h2 className="prize-amount" style={{
                        fontSize: '5rem', // ขนาดใหญ่พิเศษ
                        fontWeight: '900',
                        margin: '0',
                        color: '#fff',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        1,000,000 FM coin
                    </h2>
                    {/* แสงออร่าด้านหลังตัวหนังสือ */}
                    <div className="golden-aura"></div>
                </div>

                <div style={{
                    fontSize: '1.4rem',
                    background: 'rgba(255,215,0,0.1)',
                    padding: '1.5rem',
                    borderRadius: '15px',
                    fontFamily: 'monospace',
                    color: '#ffd700',
                    border: '1px solid rgba(255,215,0,0.3)',
                    wordBreak: 'break-all',
                    boxShadow: 'inset 0 0 20px rgba(255,215,0,0.1)'
                }}>
                    {winner}
                </div>

                <p style={{ marginTop: '2.5rem', color: '#ccc', fontSize: '1.1rem' }}>
                    🎄 กรุณาติดต่อทีมงานเพื่อยืนยันสิทธิ์ภายใน 24 ชม. 🎄
                </p>

                <button
                    onClick={onClose}
                    style={{
                        marginTop: '2rem',
                        padding: '0.8rem 2.5rem',
                        background: 'linear-gradient(45deg, #ffd700, #ff8c00)',
                        border: 'none',
                        borderRadius: '50px',
                        color: '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    ปิดหน้าจอนี้
                </button>
            </div>

            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; scale: 0.8; }
                    to { opacity: 1; scale: 1; }
                }

                .prize-amount {
                    background: linear-gradient(to bottom, #fff 20%, #ffd700 50%, #b8860b 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
                    animation: prizePulse 2s infinite ease-in-out;
                }

                @keyframes prizePulse {
                    0%, 100% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.05); filter: brightness(1.3); }
                }

                .golden-aura {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 120%;
                    height: 150%;
                    background: radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0) 70%);
                    z-index: 1;
                    filter: blur(20px);
                    animation: auraRotate 4s infinite linear;
                }

                @keyframes auraRotate {
                    0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 0.5; }
                    50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); opacity: 0.5; }
                }

                .congrats-text {
                    animation: colorCycle 3s infinite alternate;
                }

                @keyframes colorCycle {
                    from { filter: hue-rotate(0deg); }
                    to { filter: hue-rotate(30deg); }
                }

                .winner-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(255,215,0,0.1), transparent);
                    transform: rotate(45deg);
                    animation: shineMove 3s infinite;
                }

                @keyframes shineMove {
                    0% { left: -100%; top: -100%; }
                    100% { left: 100%; top: 100%; }
                }

                @media (max-width: 768px) {
                    .winner-card {
                        padding: 2rem 1rem !important;
                    }
                    .congrats-text {
                        font-size: 2rem !important;
                        letter-spacing: 2px !important;
                    }
                    .prize-amount {
                        font-size: 2.5rem !important;
                    }
                    .golden-aura {
                        width: 150%;
                        height: 200%;
                    }
                }

                @media (max-width: 480px) {
                    .congrats-text {
                        font-size: 1.5rem !important;
                    }
                    .prize-amount {
                        font-size: 1.8rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default WinnerModal;
