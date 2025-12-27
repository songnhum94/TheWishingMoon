const Footer = ({ isMuted, toggleMute, onExportData }) => {
    return (
        <footer className="footer">
            <p>&copy; 2025 Flash Moon Protocol. All rights reserved.</p>
            <p>นี่คือกิจกรรมเพื่อความบันเทิงในคอมมูนิตี้เท่านั้น</p>

            <div style={{ position: 'absolute', left: '20px', bottom: '20px', zIndex: 201 }}>
                <button
                    onClick={onExportData}
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.7)', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    📥 Export Data
                </button>
            </div>

            <button
                id="mute-btn"
                onClick={toggleMute}
                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', position: 'absolute', right: '20px', bottom: '20px', zIndex: 201 }}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>
        </footer>
    );
};
export default Footer;
