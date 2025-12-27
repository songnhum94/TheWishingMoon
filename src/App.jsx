import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import './index.css';

// Components
import Snow from './components/Snow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Rewards from './components/Rewards';
import WishTree from './components/WishTree';
import WishForm from './components/WishForm';
import FAQ from './components/FAQ';
import Rules from './components/Rules';
import Footer from './components/Footer';
import SantaSleigh from './components/SantaSleigh';
import WinnerModal from './components/WinnerModal';
import Fireworks from './components/Fireworks';

// กิจกรรมจะสิ้นสุดเมื่อไหร่? (ปรับแต่งที่นี่)
// แบบที่ 1: กำหนดเป็นวันที่ (ตัวอย่าง: '2025-12-31T23:59:59')
// แบบที่ 2: กำหนดเป็นจำนวนวันจากปัจจุบัน (ตัวอย่าง: 5 วันข้างหน้า)

//const EVENT_END_DATE = new Date().getTime() + 20000; //แบบ 20 วินาที
const EVENT_END_DATE = new Date().getTime() + (5 * 24 * 60 * 60 * 1000);

// [NEW] วาง URL ที่ได้จาก Google Apps Script ที่นี่ครับ
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUHnyCT2cCAOoFbK71Z-TJhUf8WTmgsDIvUVuBHFuqMBdqT09BWAtOBQCZBDGmV9CPVw/exec";

function App() {
  // State
  const [countdown, setCountdown] = useState('00:00:00:00');
  const [totalWishes, setTotalWishes] = useState(123);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [wishes, setWishes] = useState([
    { message: "ขอให้ FM coin ไปดวงจันทร์!", top: 25, left: 50, color: 1 },
    { message: "Merry Christmas 2025!", top: 40, left: 40, color: 2 },
    { message: "ขอให้ทุกคนโชคดี", top: 55, left: 60, color: 3 },
    { message: "LFG!", top: 70, left: 45, color: 4 }
  ]);
  const [isSending, setIsSending] = useState(false);
  const [lastWish, setLastWish] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const successAudioRef = useRef(null);
  const celebrationAudioRef = useRef(null);

  const WISH_FEE = 10000;

  // Countdown Logic
  useEffect(() => {
    const calculateCountdown = () => {
      const currentNow = new Date().getTime();
      const distance = EVENT_END_DATE - currentNow;

      if (distance <= 0) {
        setCountdown("กิจกรรมสิ้นสุดแล้ว!");
        return true; // Finished
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days} วัน ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      return false;
    };

    const isAlreadyFinished = calculateCountdown();

    // ถ้าจบแล้ว ให้เช็คว่าเคยปิด modal ไปหรือยัง
    if (isAlreadyFinished) {
      const dismissed = localStorage.getItem('winner_modal_dismissed');
      if (dismissed) {
        // ถ้าเคยปิดแล้ว ไม่ต้องทำอะไรเพิ่ม (useEffect ตัวประกาศผู้ชนะจะทำงานเพื่อหา winner มาแสดงในปุ่มเฉยๆ)
      }
    }

    if (!isAlreadyFinished) {
      const interval = setInterval(() => {
        const finished = calculateCountdown();
        if (finished) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  // Winner Selection Logic (Triggers when timer ends - simulated or real)
  useEffect(() => {
    if (countdown === "กิจกรรมสิ้นสุดแล้ว!" && !winner && wishes.length > 0) {
      // Select random winner from participants (or wishes for demo)
      const randomIndex = Math.floor(Math.random() * wishes.length);
      const storedData = localStorage.getItem('flashmoon_participants');
      let potentialWinners = [];

      if (storedData) {
        try {
          potentialWinners = JSON.parse(storedData);
        } catch (e) { }
      }

      if (potentialWinners.length > 0) {
        const randomWinner = potentialWinners[Math.floor(Math.random() * potentialWinners.length)];
        setWinner(randomWinner.wallet);
        setShowWinnerModal(true); // บังคับเด้งขึ้นมาทันทีเมื่อจบกิจกรรม
      } else {
        setWinner("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
        setShowWinnerModal(true); // บังคับเด้งขึ้นมาทันทีแม้ไม่มีประวัติผู้เล่น
      }

      if (celebrationAudioRef.current) {
        celebrationAudioRef.current.play().catch(e => { });
      } else if (successAudioRef.current) {
        successAudioRef.current.play().catch(e => { });
      }
    }
  }, [countdown, winner, wishes]);

  // Audio Playback Controller: สั่งเล่นเสียงทันทีเมื่อมีการประกาศผู้ชนะ
  useEffect(() => {
    if (winner && celebrationAudioRef.current) {
      const playAudio = () => {
        celebrationAudioRef.current.play()
          .then(() => {
            console.log("Audio started automatically!");
          })
          .catch(error => {
            console.log("Autoplay blocked, waiting for interaction...");
            // ถ้ายังเล่นไม่ได้ ให้รอจังหวะ interaction แรก
            const finalUnlock = () => {
              celebrationAudioRef.current.play();
              window.removeEventListener('click', finalUnlock);
            };
            window.addEventListener('click', finalUnlock);
          });
      };
      playAudio();
    }
  }, [winner]);

  // Check if wallet already joined
  useEffect(() => {
    if (walletAddress) {
      const storedData = localStorage.getItem('flashmoon_participants');
      if (storedData) {
        const participants = JSON.parse(storedData);
        const alreadyJoined = participants.some(p => p.wallet === walletAddress);
        setHasJoined(alreadyJoined);
      } else {
        setHasJoined(false);
      }
    }
  }, [walletAddress]);

  // Global Audio Unlocker: ปลดล็อกเสียงทันทีที่มีการขยับเมาส์หรือกดปุ่ม
  useEffect(() => {
    const unlock = () => {
      if (audioRef.current) {
        // ลองโหลดเตรียมไว้
        audioRef.current.load();
      }
      if (celebrationAudioRef.current) {
        celebrationAudioRef.current.load();
      }
      window.removeEventListener('mousedown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('mousedown', unlock);
    window.addEventListener('touchstart', unlock);
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('mousedown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  // Audio Init
  useEffect(() => {
    audioRef.current = new Audio('/Asset/jingle-bells.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;

    successAudioRef.current = new Audio('/Asset/success-chime.mp3');
    celebrationAudioRef.current = new Audio('/Asset/celebration.mp3');
    celebrationAudioRef.current.volume = 0.6;
    celebrationAudioRef.current.loop = true; // ให้เสียงเล่นวนจนจบการฉลอง
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const playMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  // Wallet Logic
  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('กรุณาติดตั้ง MetaMask เพื่อเข้าร่วมกิจกรรม!');
      return;
    }

    playMusic();

    try {
      // Support both ethers v5 and v6 if possible, but v6 is default now
      let provider, signer, address;

      try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        address = await signer.getAddress();
      } catch (e) {
        // Fallback for v5 just in case
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        address = await signer.getAddress();
      }

      setWalletAddress(address);
      setBalance(100000.00);

    } catch (error) {
      console.error("Connection failed", error);
      alert("เชื่อมต่อ Wallet ล้มเหลว หรือถูกปฏิเสธ");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(0);
  };

  const handleSendWish = (message) => {
    if (balance < WISH_FEE) {
      alert('ยอด FM coin ของคุณไม่เพียงพอ');
      return;
    }

    setIsSending(true);

    // Simulate transaction
    setTimeout(() => {
      setIsSending(false);
      setBalance(prev => prev - WISH_FEE);
      setLastWish(message);

      if (successAudioRef.current) successAudioRef.current.play().catch(e => { });

      const newWish = {
        message,
        top: Math.random() * 55 + 20,
        left: Math.random() * 30 + 35,
        color: Math.floor(Math.random() * 4) + 1
      };
      setWishes(prev => [...prev, newWish]);
      setTotalWishes(prev => prev + 1);
      setHasJoined(true);

      // --- [NEW] ส่งข้อมูลไป Google Sheets ---
      const timestamp = new Date().toISOString();
      const participantData = {
        wallet: walletAddress,
        message: message,
        timestamp: timestamp
      };

      if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(participantData),
        }).catch(err => console.error("Sheets Error:", err));
      }

      // --- [BACKUP] บันทึกใน LocalStorage เผื่อเน็ตหลุด ---
      const existingData = localStorage.getItem('flashmoon_participants');
      let participants = [];
      if (existingData) {
        try {
          participants = JSON.parse(existingData);
        } catch (e) { }
      }
      participants.push(participantData);
      localStorage.setItem('flashmoon_participants', JSON.stringify(participants));
      // ----------------------------------

      alert('แขวนคำอธิษฐานสำเร็จ!');

    }, 2000);
  };

  const handleCloseWinnerModal = () => {
    setShowWinnerModal(false);
    // บันทึกไว้ว่าปิดแล้ว จะได้ไม่เด้งขึ้นมาเองอีก
    localStorage.setItem('winner_modal_dismissed', 'true');
    // หยุดเสียงฉลอง
    if (celebrationAudioRef.current) {
      celebrationAudioRef.current.pause();
      celebrationAudioRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <Snow />
      <SantaSleigh />
      {showWinnerModal && <Fireworks />}
      {showWinnerModal && <WinnerModal winner={winner} onClose={handleCloseWinnerModal} />}
      <Navbar
        countdown={countdown}
        totalWishes={totalWishes}
        walletAddress={walletAddress}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
      />

      <Hero
        winnerPicked={!!winner}
        onShowWinner={() => setShowWinnerModal(true)}
      />

      <main className="main-layout-container">
        <div className="left-column">
          <HowItWorks />
          <Rewards />

        </div>

        <div className="center-column">
          <WishTree wishes={wishes} />
        </div>

        <div className="right-column">
          {walletAddress ? (
            <WishForm
              walletAddress={walletAddress}
              fmoonBalance={balance}
              onSendWish={handleSendWish}
              isSending={isSending}
              lastWish={lastWish}
              wishFee={WISH_FEE}
              hasJoined={hasJoined}
            />
          ) : (
            <div className="glass-card action-box" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>กรุณาเชื่อมต่อ Wallet<br />เพื่อร่วมกิจกรรม</h3>
              <p className="mt-10">เพื่อส่งคำอธิษฐานและลุ้นรับรางวัล</p>
            </div>
          )}
          <Rules />
        </div>
      </main>

      <Footer
        isMuted={isMuted}
        toggleMute={toggleMute}
        onExportData={() => {
          const storedData = localStorage.getItem('flashmoon_participants');
          if (!storedData) {
            alert('ยังไม่มีข้อมูลผู้เข้าร่วม!');
            return;
          }
          try {
            const participants = JSON.parse(storedData);
            const csvContent = "data:text/csv;charset=utf-8," +
              "Wallet Address,Wish Message,Timestamp\n" +
              participants.map(p => `${p.wallet},"${p.message.replace(/"/g, '""')}",${p.timestamp}`).join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "flashmoon_participants.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (e) {
            console.error("Export error", e);
            alert("เกิดข้อผิดพลาดในการส่งออกข้อมูล");
          }
        }}
      />
    </>
  );
}

export default App;
