// --- 0. ข้อมูลสำคัญที่คุณต้องใส่ (ต้องเป็นข้อมูลจริงของโปรเจกต์คุณ) ---
// (ใช้ 0x... ปลอมไปก่อนสำหรับโหมดทดสอบ)
const WISH_TREE_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
const FMOON_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// (ABI ขั้นต่ำสำหรับโหมดทดสอบ - ไม่ได้ใช้จริง)
const FMOON_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function decimals() view returns (uint8)"
];
const WISH_TREE_ABI = [
    "function hangWish(string memory _wishMessage)",
    "function WISH_FEE() view returns (uint256)",
    "function totalWishes() view returns (uint256)",
    "function totalParticipants() view returns (uint256)" // ABI ยังมีได้ แต่เราไม่ใช้ใน UI
];

const WISH_FEE = 10;

// --- 1. เลือก Element จาก HTML ---
// (ส่วนคอลัมน์ขวา)
const sendWishBtn = document.getElementById('send-wish-btn');
const wishInput = document.getElementById('wish-input');
const wishView = document.getElementById('wish-view');
const walletAddressEl = document.getElementById('wallet-address');
const userBalanceEl = document.getElementById('user-balance');
const shareButtonsContainer = document.getElementById('share-buttons');
const shareLineBtn = document.getElementById('share-line-btn');
const shareFacebookBtn = document.getElementById('share-facebook-btn');
const shareXBtn = document.getElementById('share-x-btn');
const shareInstagramBtn = document.getElementById('share-instagram-btn');

// (ส่วน Navbar)
const countdownTimerEl = document.getElementById('countdown-timer');
const totalWishesEl = document.getElementById('total-wishes');
// [!! ลบแล้ว !!] const totalParticipantsEl = document.getElementById('total-participants');
const navConnectWalletBtn = document.getElementById('nav-connect-wallet-btn');
const navWalletAddressEl = document.getElementById('nav-wallet-address');

// (ส่วนคอลัมน์กลาง - ต้นไม้)
const heroTreeEl = document.querySelector('.hero-tree');
const toastContainer = document.getElementById('toast-container');
const snowContainer = document.getElementById('snow-container');
const successSound = document.getElementById('success-sound');

// --- ตัวแปรสำหรับ Web3 ---
let provider;
let signer;
let fmoonContract;
let wishTreeContract;
let userAddress;
let fmoonDecimals = 18;
let userFmoonBalance = 0;
let isMusicStarted = false;
let lastWishMessage = '';

// --- 2. ฟังก์ชันหลัก ---

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        showToast('กรุณาติดตั้ง MetaMask เพื่อเข้าร่วมกิจกรรม!', 'error');
        return;
    }

    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();

        fmoonContract = new ethers.Contract(FMOON_CONTRACT_ADDRESS, FMOON_ABI, signer);
        wishTreeContract = new ethers.Contract(WISH_TREE_CONTRACT_ADDRESS, WISH_TREE_ABI, signer);

        updateUIOnConnect();
        await getUserFmoonBalance_TestMode();

        if (navWalletAddressEl) {
            navWalletAddressEl.addEventListener('click', disconnectWallet);
        }

    } catch (error) {
        console.error("เชื่อมต่อ Wallet ล้มเหลว:", error);
        if (error.code === 4001) {
             showToast("คุณปฏิเสธการเชื่อมต่อ Wallet!", 'error');
        } else {
             showToast(`เชื่อมต่อ Wallet ล้มเหลว! (อาจเกิดจาก Contract Address ปลอม)`, 'error');
        }
    }
}

function updateUIOnConnect() {
    const shortAddress = `Wallet: ${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`;
    navConnectWalletBtn.style.display = 'none';
    navWalletAddressEl.style.display = 'block';
    navWalletAddressEl.textContent = shortAddress;
    wishView.style.display = 'block';
    walletAddressEl.textContent = shortAddress;
}

function disconnectWallet() {
    navConnectWalletBtn.style.display = 'block';
    navWalletAddressEl.style.display = 'none';
    wishView.style.display = 'none';
    userAddress = null;
    provider = null;
    signer = null;
    fmoonContract = null;
    wishTreeContract = null;

    if (navWalletAddressEl) {
        navWalletAddressEl.removeEventListener('click', disconnectWallet);
    }

    showToast("Wallet ถูกตัดการเชื่อมต่อ", "info");
}

// --- 3. ฟังก์ชันโหมดทดสอบ (Test Mode) ---

async function getUserFmoonBalance_TestMode() {
    if (!userAddress) return;
    try {
        const simulatedBalance = 100.00; // ตั้งค่าเงินจำลอง
        userFmoonBalance = simulatedBalance;
        userBalanceEl.textContent = `Balance: ${userFmoonBalance.toFixed(2)} $FMOON (Test)`;

        if (userFmoonBalance < WISH_FEE) {
            sendWishBtn.disabled = true;
            sendWishBtn.textContent = "😢 $FMOON ไม่เพียงพอ";
        } else {
            sendWishBtn.disabled = false;
            sendWishBtn.textContent = "🚀 แขวนคำอธิษฐาน! (Test)";
        }
    } catch (error) {
        console.error("Test Mode Error (Balance):", error);
        userBalanceEl.textContent = "Balance: Error";
        sendWishBtn.disabled = true;
        sendWishBtn.textContent = "Error";
    }
}

async function updateLiveStats_TestMode() {
    try {
        totalWishesEl.textContent = "123";
        // [!! ลบแล้ว !!] ไม่ต้องอัปเดตผู้เข้าร่วม
        // totalParticipantsEl.textContent = "45";
    } catch (error) {
        console.error("Test Mode Error (Stats):", error);
    }
}

async function sendWish_TestMode() {
    const wishMessage = wishInput.value.trim();
    if (wishMessage.length === 0) {
        showToast("กรุณาพิมพ์คำอธิษฐานของคุณ!", "error");
        return;
    }
    if (wishMessage.length > 140) {
        showToast("คำอธิษฐานต้องไม่เกิน 140 ตัวอักษร!", "error");
        return;
    }
    if (userFmoonBalance < WISH_FEE) {
        showToast("ยอด $FMOON ของคุณไม่เพียงพอ", "error");
        return;
    }

    sendWishBtn.disabled = true;
    sendWishBtn.textContent = "กำลังดำเนินการ...";
    shareButtonsContainer.style.display = 'none';

    setTimeout(() => {
        showToast("แขวนคำอธิษฐานสำเร็จ!");
        if (successSound) {
            successSound.play().catch(e => console.log("Sound play failed", e));
        }

        const top = Math.random() * 55 + 20; // Y: 20-75%
        const left = Math.random() * 30 + 35; // X: 35-65%
        createWishCardElement(wishMessage, top, left);

        wishInput.value = "";
        lastWishMessage = wishMessage;

        userFmoonBalance -= WISH_FEE;
        userBalanceEl.textContent = `Balance: ${userFmoonBalance.toFixed(2)} $FMOON (Test)`;
        if (userFmoonBalance < WISH_FEE) {
            sendWishBtn.disabled = true;
            sendWishBtn.textContent = "😢 $FMOON ไม่เพียงพอ";
        } else {
            sendWishBtn.disabled = false;
            sendWishBtn.textContent = "🚀 แขวนคำอธิษฐาน! (Test)";
        }

        updateShareLinks();
        shareButtonsContainer.style.display = 'grid'; // ใช้ grid

    }, 2000);
}

// --- 4. ฟังก์ชันนับถอยหลัง (Countdown) ---
function startCountdown() {
    // [!! แก้ไข !!] คำนวณวันหมดอายุ 30 วันจากปัจจุบัน
    const now = new Date();
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).getTime(); // เพิ่ม 30 วัน (เป็น ms)

    const interval = setInterval(() => {
        const currentNow = new Date().getTime(); // ใช้เวลาปัจจุบันจริงๆ ในแต่ละรอบ
        const distance = endDate - currentNow;

        if (distance < 0) {
            clearInterval(interval);
            countdownTimerEl.textContent = "กิจกรรมสิ้นสุดแล้ว!";
            // ทำให้ปุ่มส่งกดไม่ได้เมื่อหมดเวลา (ถ้ายังไม่ได้ทำ)
            if(sendWishBtn) sendWishBtn.disabled = true;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownTimerEl.textContent =
            `${days} วัน ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    }, 1000);
}

// --- 5. ฟังก์ชัน Helpers (ตัวช่วย) ---

function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 5000);
}

function createWishCardElement(message, top, left) {
    if (!heroTreeEl) return;
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';
    wishCard.tabIndex = 0;
    const colors = ['color-1', 'color-2', 'color-3', 'color-4'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    wishCard.classList.add(randomColor);
    const wishText = document.createElement('span');
    wishText.textContent = message;
    wishCard.appendChild(wishText);
    wishCard.style.top = `${top}%`;
    wishCard.style.left = `${left}%`;
    heroTreeEl.appendChild(wishCard);
}

function loadInitialWishes_TestMode() {
    const fakeWishes = [
        { message: "ขอให้ $FMOON ไปดวงจันทร์!", top: 25, left: 50 },
        { message: "Merry Christmas 2025!", top: 40, left: 40 },
        { message: "ขอให้ทุกคนโชคดี", top: 55, left: 60 },
        { message: "LFG!", top: 70, left: 45 }
    ];
    fakeWishes.forEach(wish => createWishCardElement(wish.message, wish.top, wish.left));
}

/**
 * [!! ใหม่ !!] สร้างหิมะ
 */
function createSnowflake() {
    if (!snowContainer) return;

    const flake = document.createElement('div');
    flake.className = 'snowflake';
    const size = Math.random() * 4 + 2;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.left = `${Math.random() * 100}vw`;
    const fallDuration = Math.random() * 10 + 10;
    const swayDuration = Math.random() * 4 + 3;
    flake.style.opacity = Math.random() * 0.7 + 0.3;
    const delay = Math.random() * 10;
    flake.style.animation = `fall ${fallDuration}s linear ${delay}s infinite, sway ${swayDuration}s ease-in-out ${delay}s infinite`;
    snowContainer.appendChild(flake);
}

/**
 * [!! ใหม่ !!] เริ่มสร้างหิมะ (สร้าง 50 เกล็ด)
 */
function startSnowing() {
    if (typeof createSnowflake === 'function') {
        for (let i = 0; i < 50; i++) {
            createSnowflake();
        }
    } else {
        console.error("createSnowflake function not found!");
    }
}


function updateShareLinks() {
    const textToShareBase = `ฉันเพิ่งแขวนคำอธิษฐาน "${lastWishMessage}" บน The Flash Moon Wish Tree! 🎄✨`;
    const eventUrl = window.location.href;
    const hashtags = "FlashMoon,FMOON,WishTree,Crypto";

    // LINE
    const lineText = `${textToShareBase}\nมาร่วมสนุกกัน! ${eventUrl}`;
    shareLineBtn.href = `https://line.me/R/msg/text/?${encodeURIComponent(lineText)}`;

    // Facebook
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}&quote=${encodeURIComponent(textToShareBase)}`;
    shareFacebookBtn.href = facebookUrl;

    // X (Twitter เดิม)
    const xText = `${textToShareBase} มาร่วมสนุกและลุ้นรับ $FMOON กัน!`;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(eventUrl)}&hashtags=${hashtags}`;
    shareXBtn.href = xUrl;

    // Instagram: ไม่มี URL สำหรับแชร์โดยตรง
    shareInstagramBtn.href = "#";
}


// --- 6. เชื่อมต่อ Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    loadInitialWishes_TestMode();
    updateLiveStats_TestMode();
    startSnowing();

    const music = document.getElementById('bg-music');
    const muteBtn = document.getElementById('mute-btn');

    if (music && muteBtn) {
        muteBtn.addEventListener('click', () => {
            music.muted = !music.muted;
            muteBtn.textContent = music.muted ? '🔇' : '🔊';
        });
    }

    navConnectWalletBtn.addEventListener('click', () => {
        if (music && !isMusicStarted) {
            music.volume = 0.15;
            music.play().catch(error => console.log("Music play failed:", error));
            isMusicStarted = true;
        }
        connectWallet();
    });

    sendWishBtn.addEventListener('click', sendWish_TestMode);

    // Event Listener สำหรับปุ่ม Instagram
    shareInstagramBtn.addEventListener('click', (event) => {
        event.preventDefault();
        showToast("การแชร์ไป Instagram โดยตรงยังไม่รองรับ กรุณาคัดลอกลิงก์หรือแคปหน้าจอเพื่อแชร์", "error");
    });

    // ปุ่มแชร์อื่นๆ ใช้ href ไม่ต้องมี listener เพิ่ม
    // listener สำหรับ disconnect ถูกย้ายไปเพิ่มในฟังก์ชัน connectWallet แล้ว
});

