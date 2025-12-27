import React from 'react';

const Rules = () => {
    return (
        <section className="glass-card rules-section infographic-container" style={{ marginTop: '1.5rem' }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                color: '#ffd700',
                textShadow: '0 0 10px rgba(255,215,0,0.5)',
                letterSpacing: '1px'
            }}>
                DETAILS & RULES
            </h2>

            <ul style={{
                listStyle: 'none',
                paddingLeft: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <li className="rule-item">
                    <span className="rule-icon">✅</span>
                    <span className="rule-text">
                        <strong>Connect Wallet:</strong> ผู้เข้าร่วมต้องเชื่อมต่อกระเป๋าเพื่อยืนยันตัวตน
                    </span>
                </li>
                <li className="rule-item">
                    <span className="rule-icon">💰</span>
                    <span className="rule-text">
                        <strong>Entry Fee:</strong> ค่าธรรมเนียมในการส่งคำอธิษฐาน <b>10,000 FM coin</b>
                    </span>
                </li>
                <li className="rule-item">
                    <span className="rule-icon">🔒</span>
                    <span className="rule-text">
                        <strong>Limit:</strong> จำกัด 1 Wallet สามารถส่งได้ <b>1 คำอธิษฐาน</b> เท่านั้น
                    </span>
                </li>
                <li className="rule-item">
                    <span className="rule-icon">🏆</span>
                    <span className="rule-text">
                        <strong>Grand Prize:</strong> สุ่มแจก <b>1,000,000 FM coin</b> ทันทีหลังจบกิจกรรม
                    </span>
                </li>
                <li className="rule-item">
                    <span className="rule-icon">🎁</span>
                    <span className="rule-text">
                        <strong>Guaranteed:</strong> รับ Airdrop <b>20,000 FM coin</b> เป็นรางวัลการเข้าร่วมทุกคน
                    </span>
                </li>
            </ul>

            <style>{`
                .rule-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: background 0.3s;
                }
                .rule-item:hover {
                    background: rgba(255, 215, 0, 0.1);
                    border-color: rgba(255, 215, 0, 0.3);
                }
                .rule-icon {
                    font-size: 1.2rem;
                }
                .rule-text {
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.5;
                }
                .rule-text strong {
                    color: #ffd700;
                    display: block;
                    margin-bottom: 2px;
                }
                .rule-text b {
                    color: #fff;
                    font-weight: 600;
                }
            `}</style>
        </section>
    );
};

export default Rules;
