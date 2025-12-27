const FAQ = () => {
    return (
        <section id="faq" className="faq-section glass-card infographic-container">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem', color: '#ffd700', textShadow: '0 0 10px rgba(255,215,0,0.5)', letterSpacing: '2px' }}>
                F.A.Q
            </h2>

            <div className="faq-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                <div className="faq-card-premium">
                    <div className="faq-icon">❓</div>
                    <div className="faq-content">
                        <h4>ฉันจะซื้อ FM coin ได้ที่ไหน?</h4>
                        <p>คุณสามารถซื้อ FM coin ได้ที่ <a href="https://pancakeswap.finance/swap?chain=bsc" target="_blank" rel="noopener noreferrer" style={{ color: '#ffd700', textDecoration: 'underline' }}><br></br>FM Coin</a></p>
                    </div>
                </div>

                <div className="faq-card-premium">
                    <div className="faq-icon">❓</div>
                    <div className="faq-content">
                        <h4>ฉันส่งคำอธิษฐานได้กี่ครั้ง?</h4>
                        <p>จำกัดสิทธิ์ 1 Wallet สามารถส่งคำอธิษฐานได้เพียง 1 ครั้งเท่านั้น</p>
                    </div>
                </div>

                <div className="faq-card-premium">
                    <div className="faq-icon">❓</div>
                    <div className="faq-content">
                        <h4>จะประกาศผลผู้โชคดีเมื่อไหร่?</h4>
                        <p>ประกาศผลทันทีที่เวลากิจกรรมสิ้นสุดลงทางหน้าเว็บไซต์</p>
                    </div>
                </div>

            </div>

            <style>{`
                .faq-card-premium {
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 1.25rem;
                    display: flex;
                    gap: 1.25rem;
                    align-items: flex-start;
                    transition: all 0.3s ease;
                }

                .faq-card-premium:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 215, 0, 0.3);
                    transform: translateX(5px);
                }

                .faq-icon {
                    background: rgba(255, 255, 255, 0.1);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .faq-content h4 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.1rem;
                    color: #fff;
                    font-weight: 600;
                }

                .faq-content p {
                    margin: 0;
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.5;
                }
            `}</style>
        </section>
    );
};
export default FAQ;
