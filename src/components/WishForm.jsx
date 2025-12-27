import React, { useState } from 'react';

const WishForm = ({ walletAddress, fmoonBalance, onSendWish, isSending, lastWish, wishFee, hasJoined }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!message.trim()) return;
        onSendWish(message.trim());
        setMessage('');
    };

    if (!walletAddress) return null;

    if (hasJoined) {
        return (
            <section id="wish-view" className="glass-card action-box" style={{ display: 'block', textAlign: 'center' }}>
                <h3>ขอบคุณที่ร่วมกิจกรรม!</h3>
                <p style={{ margin: '1rem 0' }}>คุณได้ส่งคำอธิษฐานแล้ว 🎄</p>
                <div className="wallet-info" style={{ justifyContent: 'center' }}>
                    <span>Wallet: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#ffd700', marginTop: '1rem' }}>แชร์ความสุขนี้ให้เพื่อนๆ กันเถอะ!</p>

                <div className="share-buttons-container" id="share-buttons" style={{ display: 'grid', marginTop: '1.5rem' }}>
                    {/* เราจะใช้ Logic เดียวกันกับด้านล่างเพื่อให้รักษารูปแบบปุ่มให้เหมือนกัน */}
                    {(() => {
                        const eventUrl = window.location.href;
                        const textToShareBase = `🎄 I just made a wish on the Flash Moon Wish Tree! ✨\nWin 1,000,000 FM coin & exclusive rewards! 🎁\n\nMake your wish here:`;

                        const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(textToShareBase + " " + eventUrl)}`;
                        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}&quote=${encodeURIComponent(textToShareBase + " " + eventUrl)}`;
                        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(textToShareBase + " " + eventUrl)}`;

                        const handleTikTok = (e) => {
                            e.preventDefault();
                            const tiktokText = `${textToShareBase} ${eventUrl}`;
                            navigator.clipboard.writeText(tiktokText).then(() => {
                                alert("คัดลอกข้อความแล้ว! นำไปโพสต์ใน TikTok ได้เลย 🎵");
                                window.open('https://www.tiktok.com/', '_blank');
                            });
                        };

                        return (
                            <>
                                <a href={lineUrl} className="share-btn line" target="_blank" rel="noopener noreferrer">LINE</a>
                                <a href={facebookUrl} className="share-btn facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
                                <a href="#" onClick={handleTikTok} className="share-btn tiktok" style={{ backgroundColor: '#000000' }}>TikTok</a>
                                <a href={telegramUrl} className="share-btn telegram" target="_blank" rel="noopener noreferrer">Telegram</a>
                            </>
                        );
                    })()}
                </div>
            </section>
        );
    }

    return (
        <section id="wish-view" className="glass-card action-box" style={{ display: 'block' }}>
            <h3>แขวนคำอธิษฐานของคุณ</h3>
            <div className="wallet-info">
                <span>Wallet: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</span>
                <span id="user-balance">Balance: {fmoonBalance.toFixed(2)} FM coin</span>
            </div>

            <textarea
                id="wish-input"
                className="glass-input"
                rows="3"
                maxLength="140"
                placeholder="เขียนคำอธิษฐานของคุณที่นี่... (ไม่เกิน 140 ตัวอักษร)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSending}
            ></textarea>

            <div className="fee-info">ค่าธรรมเนียมการส่ง: <strong>{wishFee} FM coin</strong></div>

            <button
                id="send-wish-btn"
                className="btn-glass-primary"
                onClick={handleSubmit}
                disabled={isSending || fmoonBalance < wishFee || message.trim().length === 0}
            >
                {isSending ? 'กำลังดำเนินการ...' : (fmoonBalance < wishFee ? '😢 FM coin ไม่เพียงพอ' : '🚀 แขวนคำอธิษฐาน!')}
            </button>

            {/* Share Buttons */}
            {lastWish && (
                <div className="share-buttons-container" id="share-buttons" style={{ display: 'grid', marginTop: '1.5rem' }}>
                    <p style={{ marginBottom: '0.75rem', color: 'var(--color-secondary-text)', fontSize: '0.9rem', width: '100%' }}>แชร์คำอธิษฐานของคุณ:</p>

                    {/* Logic to generate links */}
                    {(() => {
                        const eventUrl = window.location.href;
                        // Shortened/More impactful message for better sharing preview
                        const textToShareBase = `🎄 I just made a wish on the Flash Moon Wish Tree! ✨\nWin 1,000,000 FM coin & exclusive rewards! 🎁\n\nMake your wish here:`;
                        const hashtags = "FlashMoon,FMOON,WishTree,Crypto";

                        const lineText = `${textToShareBase} ${eventUrl}`;
                        const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(lineText)}`;

                        const facebookText = `${textToShareBase} ${eventUrl}`;
                        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}&quote=${encodeURIComponent(facebookText)}`;


                        const tiktokText = `🎄 I just made a wish on the Flash Moon Wish Tree! ✨\nWin 1,000,000 FM coin & exclusive rewards! 🎁\n\nMake your wish here: ${eventUrl}`;

                        const handleTikTokShare = (e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(tiktokText).then(() => {
                                alert("คัดลอกข้อความแล้ว! นำไปโพสต์ใน TikTok ได้เลย 🎵");
                                window.open('https://www.tiktok.com/', '_blank');
                            }).catch(err => {
                                console.error('Failed to copy: ', err);
                                window.open('https://www.tiktok.com/', '_blank');
                            });
                        };

                        const telegramText = `${textToShareBase} ${eventUrl}`;
                        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(telegramText)}`;

                        return (
                            <>
                                <a href={lineUrl} className="share-btn line" target="_blank" rel="noopener noreferrer">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}><path d="M21.9 10.2c0-4.6-4.6-8.4-10.4-8.4S1.1 5.6 1.1 10.2c0 4.1 3.7 7.6 8.7 8.3.3.1.8.2.9.6l.2 1.6s.2 1 .5.7c.3-.3 2.7-2.6 3.6-3.2.5-.3 1.4-.2 2.1-.2 4.4 0 9.1-3.6 9.1-8.3h-4.3zm-13 3c-.2.2-.4.1-.4-.2v-3.7c0-.3.2-.4.4-.4h4.4c.3 0 .4.2.4.4v.9c0 .3-.2.4-.4.4h-2.9v1h2.9c.3 0 .4.2.4.4v.9c0 .3-.2.4-.4.4H8.9zm7.1 0c-.2.2-.4.1-.4-.2v-3.7c0-.2.2-.3.4-.3h.9c.2 0 .4.1.4.3v3.9h-.9l-.4-.2zm3.1-.2v-3.7c0-.3.2-.4.4-.4h.9c.3 0 .4.2.4.4v2.7l1.7-2.4c.2-.2.3-.3.6-.3h.8c.2 0 .4.2.3.4l-2 2.6 2.1 2.9c.2.2.1.5-.2.5h-1c-.3 0-.5-.1-.7-.4l-1.5-2.2v2.2c0 .3-.2.4-.4.4h-.9c-.2 0-.4-.2-.4-.4z" /></svg>
                                    LINE
                                </a>
                                <a href={facebookUrl} className="share-btn facebook" target="_blank" rel="noopener noreferrer">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}><path d="M9.9 22v-8h-2.7v-3h2.7v-2.3c0-2.6 1.6-4.1 4-4.1 1.1 0 2.3.2 2.3.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6v2h3l-.5 3h-2.5v8H9.9z" /></svg>
                                    Facebook
                                </a>
                                <a href="#" onClick={handleTikTokShare} className="share-btn tiktok" style={{ backgroundColor: '#000000' }}>
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}><path d="M12.5 0v3.7c.5-.1 1-.1 1.5-.1 2.9 0 5.4 1.8 6.4 4.3V4.9c0-2.7-2.2-4.9-4.9-4.9h-3zm-3.6 24c4.4 0 8-3.6 8-8v-3.4c-1 .8-2.3 1.2-3.6 1.2-3.3 0-6-2.7-6-6s2.7-6 6-6c.5 0 1 .1 1.4.2V0c-6.1.9-10.7 6.1-10.7 12.4 0 6.6 5.3 12 11.9 12h.9v-3.7c-3.1.2-5.7-2.1-5.9-5.3z" /><path d="M19.6 5.8c-1.2 0-2.4.3-3.4.9V12c0 2.4-1.6 4.6-4 5.3v3.8c4.2-.9 7.4-4.6 7.4-9V5.8z" /></svg>
                                    TikTok
                                </a>
                                <a href={telegramUrl} className="share-btn telegram" target="_blank" rel="noopener noreferrer">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S16.6 0 12 0zm5.6 8.4l-2.1 9.8c-.2.8-.6 1-1.3.6l-3.5-2.6-1.7 1.6c-.2.2-.3.4-.6.4l.2-3.6 6.6-6c.3-.3-.1-.4-.4-.2l-8.2 5.1-3.5-1.1c-.8-.2-.8-.8.2-1.2l13.5-5.2c.6-.2 1.2.2 1 1z" /></svg>
                                    Telegram
                                </a>
                            </>
                        );
                    })()}
                </div>
            )}
        </section>
    );
};
export default WishForm;
