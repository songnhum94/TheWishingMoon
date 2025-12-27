const HowItWorks = () => {
    return (
        <section id="how-it-works" className="how-it-works glass-card infographic-container">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem', color: '#ffd700', textShadow: '0 0 10px rgba(255,215,0,0.5)' }}>
                HOW TO JOIN
            </h2>

            <div className="infographic-step">
                <div className="step-icon-wrapper">
                    <div className="step-icon">🔗</div>
                </div>
                <div className="step-content">
                    <h3 className="step-title">1. Connect Wallet</h3>
                    <p className="step-desc">เชื่อมต่อกระเป๋าของคุณเพื่อเริ่มต้น</p>
                </div>
            </div>

            <div className="connector-line"></div>

            <div className="infographic-step">
                <div className="step-icon-wrapper">
                    <div className="step-icon">✍️</div>
                </div>
                <div className="step-content">
                    <h3 className="step-title">2. Make a Wish</h3>
                    <p className="step-desc">เขียนคำอธิษฐาน (Fee: 10,000 FM coin)</p>
                </div>
            </div>

            <div className="connector-line"></div>

            <div className="infographic-step">
                <div className="step-icon-wrapper">
                    <div className="step-icon">🎁</div>
                </div>
                <div className="step-content">
                    <h3 className="step-title">3. Win Prizes</h3>
                    <p className="step-desc">ลุ้นรับ 1,000,000 FM coin</p>
                </div>
            </div>

            <style>{`
                .infographic-container {
                    padding: 2.5rem 1.5rem;
                    background: linear-gradient(135deg, rgba(20,20,20,0.6) 0%, rgba(50,50,50,0.4) 100%);
                    border: 1px solid rgba(255,215,0,0.3);
                }
                
                .infographic-step {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    position: relative;
                    z-index: 2;
                }

                .step-icon-wrapper {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(45deg, #ffd700, #b8860b);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 20px rgba(255, 217, 0, 0.86);
                    flex-shrink: 0;
                    border: 3px solid rgba(255,255,255,0.2);
                }

                .step-icon {
                    font-size: 1.8rem;
                }

                .step-content {
                    text-align: left;
                }

                .step-title {
                    font-size: 1.3rem;
                    color: #fff;
                    margin-bottom: 0.3rem;
                    font-weight: 700;
                }

                .step-desc {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.95rem;
                    margin: 0;
                }

                .connector-line {
                    width: 4px;
                    height: 40px;
                    background: rgba(255, 217, 0, 0.3);
                    margin-left: 28px; /* Center with the icon (60/2 - 4/2) */
                    margin-top: -5px;
                    margin-bottom: -5px;
                    position: relative;
                    z-index: 1;
                }
            `}</style>
        </section>
    );
};
export default HowItWorks;
