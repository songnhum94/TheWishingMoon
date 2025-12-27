const Rewards = () => {
    return (
        <section id="rewards" className="rewards-section glass-card infographic-container">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem', color: '#ffd700', textShadow: '0 0 10px rgba(255,215,0,0.5)', textTransform: 'uppercase' }}>
                Exclusive Rewards
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Grand Prize Card */}
                <div className="reward-card-premium gold">
                    <div className="reward-icon">🏆</div>
                    <div className="reward-details">
                        <h3 className="reward-title">GRAND PRIZE</h3>
                        <p className="reward-amount">1,000,000 FM coin</p>
                        <p className="reward-desc">สุ่มผู้โชคดี 1 ท่านจากทุกคำอธิษฐาน</p>
                    </div>
                    <div className="shine-effect"></div>
                </div>

                {/* Participation Prize Card */}
                <div className="reward-card-premium silver">
                    <div className="reward-icon">🎁</div>
                    <div className="reward-details">
                        <h3 className="reward-title">GUARANTEED</h3>
                        <p className="reward-amount">20,000 FM coin</p>
                        <p className="reward-desc">Airdrop สำหรับทุกคนที่เข้าร่วมกิจกรรม</p>
                    </div>
                </div>

            </div>

            <style>{`
                .info-graphic-container { /* Reuse if defined globally, otherwise local style works too */ }

                .reward-card-premium {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .reward-card-premium:hover {
                    transform: translateY(-5px);
                }

                /* Gold Theme */
                .reward-card-premium.gold {
                    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
                    border: 1px solid rgba(255, 215, 0, 0.4);
                    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.15);
                }
                .reward-card-premium.gold .reward-title { color: #ffd700; }
                .reward-card-premium.gold .reward-amount { 
                    background: linear-gradient(to right, #ffd700, #fff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* Silver Theme */
                .reward-card-premium.silver {
                    background: linear-gradient(135deg, rgba(192, 192, 192, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
                    border: 1px solid rgba(192, 192, 192, 0.4);
                    box-shadow: 0 4px 20px rgba(192, 192, 192, 0.1);
                }
                .reward-card-premium.silver .reward-title { color: #c0c0c0; }
                .reward-card-premium.silver .reward-amount { color: #e0e0e0; }

                .reward-icon {
                    font-size: 3rem;
                    filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
                }

                .reward-details {
                    flex: 1;
                }

                .reward-title {
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    margin-bottom: 0.2rem;
                    font-weight: 700;
                    opacity: 0.9;
                }

                .reward-amount {
                    font-size: 1.6rem;
                    font-weight: 800;
                    margin-bottom: 0.3rem;
                    line-height: 1.2;
                }

                .reward-desc {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin: 0;
                }

                .shine-effect {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
                    transform: skewX(-20deg);
                    animation: shineCard 4s infinite;
                }

                @keyframes shineCard {
                    0% { left: -100%; }
                    20% { left: 200%; }
                    100% { left: 200%; }
                }

                @media (max-width: 480px) {
                    .reward-card-premium {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};
export default Rewards;
