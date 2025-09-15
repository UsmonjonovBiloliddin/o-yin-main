import React, { useState, useEffect } from "react";

// Barcha savollar uchun bir xil ball
const UNIFORM_POINTS = 20;
// "Super Savol" uchun 1,5 baravar ko'proq ball
const POWER_POINTS = Math.round(UNIFORM_POINTS * 2);

// O'zbek tilidagi savollar va topshiriqlar

const allQuestions = [
  // ========== TOPOLOGIYA (1–6) ==========
  {
    id: 1,
    type: "quiz",
    question: "Topologiya 3D modelingda nimani anglatadi?",
    options: [
      "Obyektning tashqi ko‘rinishining umumiy rangini",
      "Poligon, qirra va vertexlarning joylashuvi va tartibini",
      "Faqat tekstura koordinatalarini",
      "Faqat render sifatini"
    ],
    answer: "Poligon, qirra va vertexlarning joylashuvi va tartibini",
    points: UNIFORM_POINTS,
  },
  {
    id: 2,
    type: "quiz",
    question: "TurboSmooth berilganda obyekt shaklini qanday saqlash mumkin?",
    options: [
      "Pivotni markazlashtirish orqali",
      "Qo‘shimcha Edge Loop qo‘shish orqali",
      "Material Editor’da sozlash orqali",
      "Nur manbaini qo‘shish orqali"
    ],
    answer: "Qo‘shimcha Edge Loop qo‘shish orqali",
    points: UNIFORM_POINTS,
  },
  {
    id: 3,
    type: "quiz",
    question: "Conceptual modeling va Professional modeling o‘rtasidagi asosiy farq nima?",
    options: [
      "Conceptual tezkor g‘oya uchun, Professional esa aniq va detalli model uchun",
      "Conceptual faqat animatsiyada, Professional faqat renderda ishlatiladi",
      "Professional modeling faqat spline asosida quriladi",
      "Conceptual modeling faqat avtomatik vositalar bilan yaratiladi"
    ],
    answer: "Conceptual tezkor g‘oya uchun, Professional esa aniq va detalli model uchun",
    points: UNIFORM_POINTS,
  },
  {
    id: 4,
    type: "quiz",
    question: "Qaysi atama qirrani hosil qiluvchi yoki tortiluvchi burchakni bildiradi?",
    options: [
      "Hard edge / Soft edge",
      "Chamfer angle",
      "Bevel height",
      "Field of View"
    ],
    answer: "Hard edge / Soft edge",
    points: UNIFORM_POINTS,
  },
  {
    id: 5,
    type: "quiz",
    question: "Sphere va Box elementlarini modelingda qo‘shishdan maqsad nima?",
    options: [
      "Faqat materiallarni sinash uchun",
      "Asosiy shakllardan murakkab modellar qurish uchun",
      "Yoritish sozlamalarini tekshirish uchun",
      "Render vaqtini kamaytirish uchun"
    ],
    answer: "Asosiy shakllardan murakkab modellar qurish uchun",
    points: UNIFORM_POINTS,
  },
  {
    id: 6,
    type: "quiz",
    question: "Topologiya tahlilida Rapid Tools vositasi qaysi vazifa uchun ishlatiladi?",
    options: [
      "Obyektni pivotini sozlash uchun",
      "Mesh yuzalarini tez tahrirlash va qo‘shimcha qirra qo‘shish uchun",
      "Renderni tezlashtirish uchun",
      "Fonly blueprint joylashtirish uchun"
    ],
    answer: "Mesh yuzalarini tez tahrirlash va qo‘shimcha qirra qo‘shish uchun",
    points: UNIFORM_POINTS,
  },

  // ========== MURAKKAB MODELING va RIBBON (7–12) ==========
  {
    id: 7,
    type: "quiz",
    question: "3D naqsh yasashda qanday yechimlar qo‘llaniladi?",
    options: [
      "Displacement Map va Array modifier",
      "Nur manbalari va kamera sozlamalari",
      "Faqat Material Editor",
      "Faqat Boolean operatsiyasi"
    ],
    answer: "Displacement Map va Array modifier",
    points: UNIFORM_POINTS,
  },
  {
    id: 8,
    type: "quiz",
    question: "Shriftlardan 3D modelingda qanday foydalaniladi?",
    options: [
      "Text spline orqali 3D ob’ektga aylantirish",
      "Faqat render uchun yozuv qo‘shish",
      "Fonly Blueprint joylashtirish",
      "Pivotni sozlash uchun"
    ],
    answer: "Text spline orqali 3D ob’ektga aylantirish",
    points: UNIFORM_POINTS,
  },
  {
    id: 9,
    type: "quiz",
    question: "Ribbon panelining Modeling bo‘limi asosan nima uchun xizmat qiladi?",
    options: [
      "Material sozlamalari uchun",
      "Obyektlarni deformatsiya, kesish, birlashtirish uchun",
      "Kamera va yoritish sozlamalari uchun",
      "Faqat render formatini o‘zgartirish uchun"
    ],
    answer: "Obyektlarni deformatsiya, kesish, birlashtirish uchun",
    points: UNIFORM_POINTS,
  },
  {
    id: 10,
    type: "quiz",
    question: "Ribbon’dagi Freeform bo‘limi asosan qaysi amallarni bajaradi?",
    options: [
      "Interaktiv modeling va deformatsiya vositalarini",
      "Material ranglarini sozlashni",
      "Render sozlamalarini",
      "Nur manbai turini tanlashni"
    ],
    answer: "Interaktiv modeling va deformatsiya vositalarini",
    points: UNIFORM_POINTS,
  },
  {
    id: 11,
    type: "quiz",
    question: "Ribbon’dagi Object Paint bo‘limining asosiy vazifasi nima?",
    options: [
      "Tekstura bo‘yash uchun",
      "Sahnaga obyektlarni bo‘yab joylashtirish uchun",
      "Pivotlarni sozlash uchun",
      "Kamera sozlash uchun"
    ],
    answer: "Sahnaga obyektlarni bo‘yab joylashtirish uchun",
    points: UNIFORM_POINTS,
  },
  {
    id: 12,
    type: "quiz",
    question: "Blueprintdan foydalanishda asosiy qadam nima?",
    options: [
      "Blueprintni sahnaga joylashtirib, modelingni unga asoslash",
      "Material sifatini oshirish",
      "Render vaqtini qisqartirish",
      "Fonly modifierlarni qo‘llash"
    ],
    answer: "Blueprintni sahnaga joylashtirib, modelingni unga asoslash",
    points: UNIFORM_POINTS,
  },

  // ========== DWG va INTERIOR (13–16) ==========
  {
    id: 13,
    type: "quiz",
    question: "DWG fayldan uy modelingda asosiy qadam nima?",
    options: [
      "2D chizmalarni import qilib 3D devorlarga aylantirish",
      "Faqat render sozlash",
      "Faqat Pivotni sozlash",
      "Faqat kamera qo‘yish"
    ],
    answer: "2D chizmalarni import qilib 3D devorlarga aylantirish",
    points: UNIFORM_POINTS,
  },
  {
    id: 14,
    type: "quiz",
    question: "Magnitlarning 3D modelingdagi 2.5D turi nimani anglatadi?",
    options: [
      "Faqat 2D obyektlarni joylashtiradi",
      "Obyektni qisman yuzaga yopishtirish imkonini beradi",
      "Fonly pivotni sozlaydi",
      "Faqat teksturani ko‘rsatadi"
    ],
    answer: "Obyektni qisman yuzaga yopishtirish imkonini beradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 15,
    type: "quiz",
    question: "Interyerdagi Floor Generator nimaga xizmat qiladi?",
    options: [
      "Pol yuzasida realistik taxta yoki plitka yaratish",
      "Faqat fon rangini o‘zgartirish",
      "Render tezligini oshirish",
      "Obyekt pivotini belgilash"
    ],
    answer: "Pol yuzasida realistik taxta yoki plitka yaratish",
    points: UNIFORM_POINTS,
  },
  {
    id: 16,
    type: "quiz",
    question: "Sweep Profile modifieri asosan qaysi jarayonda ishlatiladi?",
    options: [
      "Profil chiziqlar asosida 3D shakllar yaratishda",
      "Fonly renderda material berishda",
      "Pivotni sozlashda",
      "Nur manbaini yoqishda"
    ],
    answer: "Profil chiziqlar asosida 3D shakllar yaratishda",
    points: UNIFORM_POINTS,
  },

  // ========== PERSPEKTIVA va V-RAY (17–20) ==========
  {
    id: 17,
    type: "quiz",
    question: "Perspective Match vositasi nima uchun ishlatiladi?",
    options: [
      "Render vaqtini o‘lchash uchun",
      "Rasm yoki blueprintdagi perspektivaga sahnani moslashtirish uchun",
      "Material sifatini oshirish uchun",
      "Pivotni markazlashtirish uchun"
    ],
    answer: "Rasm yoki blueprintdagi perspektivaga sahnani moslashtirish uchun",
    points: UNIFORM_POINTS,
  },
  {
    id: 18,
    type: "quiz",
    question: "Field of View (FOV) nima?",
    options: [
      "Render tezligini belgilovchi parametr",
      "Kamera ko‘rish burchagi",
      "Obyekt pivot nuqtasi",
      "Materialning shaffofligi"
    ],
    answer: "Kamera ko‘rish burchagi",
    points: UNIFORM_POINTS,
  },
  {
    id: 19,
    type: "quiz",
    question: "V-Ray materiallarining asosiy ustunligi nima?",
    options: [
      "Fotorealistik natija berishi",
      "Faqat tezroq render qilish",
      "Pivotlarni sozlash imkoniyati",
      "Fonly spline’lar uchun ishlashi"
    ],
    answer: "Fotorealistik natija berishi",
    points: UNIFORM_POINTS,
  },
  {
    id: 20,
    type: "quiz",
    question: "V-Ray’da Grass Generator asosan nima uchun ishlatiladi?",
    options: [
      "Obyekt pivotini sozlash uchun",
      "Realistik o‘t va mayda o‘simlik effektini yaratish uchun",
      "Render fonini sozlash uchun",
      "Kamerani boshqarish uchun"
    ],
    answer: "Realistik o‘t va mayda o‘simlik effektini yaratish uchun",
    points: UNIFORM_POINTS,
  },

  // === CHALLENGE (21–24) ===
  {
    id: 21,
    type: "challenge",
    question: "40 soniyada topologiyani saqlash uchun qo‘llaniladigan kamida 5 ta vositani sanab bering",
    points: UNIFORM_POINTS * 2,
  },
  {
    id: 22,
    type: "challenge",
    question: "Berilgan blueprint asosida 2 daqiqada oddiy uy devorini hosil qiling",
    points: UNIFORM_POINTS * 2,
  },
  {
    id: 23,
    type: "challenge",
    question: "1 daqiqa ichida Ribbon panelidagi Modeling bo‘limidan kamida 3 ta buyruqni ko‘rsating",
    points: UNIFORM_POINTS * 2,
  },
  {
    id: 24,
    type: "challenge",
    question: "30soniya ichida 15ta modifikator sanab bering ",
    points: UNIFORM_POINTS * 2,
  },

  // === POWER (25) ===
  {
  id: 25,
  type: "power",
  question: "3D dasturlarda Grass Generator texnologiyasining asosiy vazifasi nima?",
  options: [
    "Avtomatik ravishda realizmga yaqin o't-o‘lan va maysa hosil qilish",
    "Faqatgina material rangini yashil rangga o‘zgartirish",
    "Render vaqtini kamaytirish uchun fonni yashirish",
    "Geometriyani deformatsiya qilib yangi obyektlar yaratish"
  ],
  answer: "Avtomatik ravishda realizmga yaqin o't-o‘lan va maysa hosil qilish",
  points: UNIFORM_POINTS * 3,
},
];




function App() {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [activeTeam, setActiveTeam] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    isCorrect: false,
  });
  const [powerModal, setPowerModal] = useState(false);
  const [gridState, setGridState] = useState([]);

  useEffect(() => {
    // Savollar massivini aralashtirish
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

    // Panjarani savollar bilan to'ldirish
    const initialGrid = Array.from(
      { length: shuffledQuestions.length },
      (_, i) => ({
        id: i + 1,
        question: shuffledQuestions[i],
        isUsed: false,
      })
    );
    setGridState(initialGrid);
  }, []);

  const handleBoxClick = (boxId) => {
    const box = gridState.find((b) => b.id === boxId);
    if (box.isUsed) return;

    setCurrentQuestion(box.question);
  };

  const updateGridState = () => {
    const newGridState = gridState.map((box) =>
      box.question &&
      box.question.id === currentQuestion.id &&
      box.question.type === currentQuestion.type
        ? { ...box, isUsed: true }
        : box
    );
    setGridState(newGridState);
    if (newGridState.every((box) => box.isUsed)) {
      setIsGameOver(true);
    }
  };

  const switchTeam = () => {
    setActiveTeam((prev) => (prev === 1 ? 2 : 1));
  };

  const handleAnswer = (isCorrect) => {
    if (!currentQuestion) return;

    // "Shart" savoli uchun mantiq
    if (currentQuestion.type === "challenge") {
      if (isCorrect) {
        const points = currentQuestion.points;
        activeTeam === 1
          ? setTeam1Score((s) => s + points)
          : setTeam2Score((s) => s + points);
      }
      updateGridState();
      setCurrentQuestion(null);
      switchTeam();
      return;
    }

    // "Super Savol" va "Quiz"lar uchun mantiq
    if (isCorrect) {
      if (currentQuestion.type === "power") {
        setPowerModal(true);
      } else {
        const points = currentQuestion.points;
        activeTeam === 1
          ? setTeam1Score((s) => s + points)
          : setTeam2Score((s) => s + points);
        setFeedback({
          show: true,
          message: `Javob to'g'ri! Sizga ${points} ball qo'shildi.`,
          isCorrect: true,
        });
        setTimeout(() => {
          setFeedback({ show: false, message: "", isCorrect: false });
          updateGridState();
          setCurrentQuestion(null);
          switchTeam();
        }, 1500);
      }
    } else {
      // Agar javob xato bo'lsa
      setFeedback({
        show: true,
        message: `Afsus, javob xato, lekin o'yin davom etadi.`,
        isCorrect: false,
      });
      setTimeout(() => {
        setFeedback({ show: false, message: "", isCorrect: false });
        updateGridState();
        setCurrentQuestion(null);
        switchTeam();
      }, 1500);
    }
  };

  const handlePowerChoice = (choice) => {
    const pointsToAward = currentQuestion.points;
    if (choice === "add") {
      activeTeam === 1
        ? setTeam1Score((s) => s + pointsToAward)
        : setTeam2Score((s) => s + pointsToAward);
    } else {
      activeTeam === 2
        ? setTeam2Score((s) => Math.max(0, s - pointsToAward))
        : setTeam1Score((s) => Math.max(0, s - pointsToAward));
    }
    setPowerModal(false);
    updateGridState();
    setCurrentQuestion(null);
    switchTeam();
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (team1Name.trim() && team2Name.trim()) {
      setIsGameStarted(true);
    }
  };

  const getWinnerName = () => {
    if (team1Score > team2Score) return team1Name;
    if (team2Score > team1Score) return team2Name;
    return "Durang";
  };

  if (!isGameStarted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-teal-400">
            Jamoa Nomlarini Kiriting
          </h1>
          <form onSubmit={handleStartGame} className="flex flex-col space-y-4">
            <input
              type="text"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              placeholder="1-Jamoa nomi"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              placeholder="2-Jamoa nomi"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              O'yinni Boshlash
            </button>
            {(!team1Name || !team2Name) && (
              <p className="text-red-400 mt-4">
                Iltimos, ikkala jamoa uchun ham nom kiriting.
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  if (isGameOver) {
    const winner = getWinnerName();
    return (
      <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-4 text-center">
        <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-lg w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-4">
            O'yin Tugadi!
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {winner === "Durang" ? (
              "O'yin durang bilan tugadi!"
            ) : (
              <p className="text-green-500">Yutgan jamoa: {winner}!</p>
            )}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300">
            Qani, olqishlaymiz! 👏
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Yana o'ynash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold from-teal-400 to-blue-500 rounded-lg p-2 shadow-lg mb-4">
          Savollar O'yini
        </h1>
        <p className="text-xl md:text-2xl text-gray-300">
          Jamoalar uchun savollar o'yini
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-around w-full max-w-5xl mb-8 space-y-4 md:space-y-0 md:space-x-8">
        {/* Jamoa 1 ballari */}
        <div
          className={`p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 transform ${
            activeTeam === 1
              ? "scale-105 border-4 border-green-400"
              : "scale-100 border-2 border-2 border-white"
          }   from-gray-700 to-gray-900 w-full`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {team1Name}
            </h2>
          </div>
          <p className="text-5xl md:text-6xl font-extrabold text-center text-orange-600">
            {team1Score}
          </p>
        </div>

        {/* Jamoa 2 ballari */}
        <div
          className={`p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 transform ${
            activeTeam === 2
              ? "scale-105 border-4 border-green-400"
              : "scale-100 border-2 border-2 border-white"
          }  from-gray-700 to-gray-900 w-full`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {team2Name}
            </h2>
          </div>
          <p className="text-5xl md:text-6xl font-extrabold text-center text-orange-600">
            {team2Score}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full w-[90%]">
        {gridState.map((box) => (
          <button
            key={box.id}
            onClick={() => handleBoxClick(box.id)}
            disabled={box.isUsed || currentQuestion}
            className={`
              flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl shadow-lg cursor-pointer
              text-center transition-all duration-300 transform text-2xl md:text-4xl font-bold
              ${
                box.isUsed
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              }
            `}
          >
            {box.id}
          </button>
        ))}
      </div>

      {/* Javob berish uchun modal */}
      {feedback.show && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div
            className={`p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center
            ${feedback.isCorrect ? "bg-green-600" : "bg-red-600"}`}
          >
            <h2 className="text-white text-3xl font-bold">
              {feedback.message}
            </h2>
          </div>
        </div>
      )}

      {/* Savol modali */}
      {currentQuestion && !powerModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 z-40">
          <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-xl w-full">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-teal-300">
              {currentQuestion.type === "quiz"
                ? "Savol"
                : currentQuestion.type === "challenge"
                ? "Topshiriq"
                : "Super Savol"}
              <span className="block text-xl md:text-2xl text-yellow-400 mt-2">
                ({currentQuestion.points} ball)
              </span>
            </h3>
            <p className="text-lg md:text-xl text-gray-200 mb-8 text-center">
              {currentQuestion.question || currentQuestion.challenge}
            </p>

            {currentQuestion.type !== "challenge" && (
              <div className="flex flex-col space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(option === currentQuestion.answer)
                    }
                    className="bg-gray-700 text-white rounded-xl py-3 px-6 text-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Shart savoli uchun tugmalar */}
            {currentQuestion.type === "challenge" && (
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="bg-green-500 text-white rounded-xl py-3 px-8 text-lg font-semibold hover:bg-green-600 transition-colors duration-200"
                >
                  Bajarildi
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="bg-red-500 text-white rounded-xl py-3 px-8 text-lg font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  Bajarilmadi
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* "Kuch" savoli uchun tanlov modali */}
      {powerModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">
              Tanlov qilish
            </h3>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              "Super Savol"ga to'g'ri javob berdingiz!
              {currentQuestion?.points || POWER_POINTS} ballni o'zingizga
              qo'shasizmi yoki raqibdan ayirasizmi?
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={() => handlePowerChoice("add")}
                className="bg-blue-600 text-white rounded-xl py-3 px-6 text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                O'zingizga qo'shish
              </button>
              <button
                onClick={() => handlePowerChoice("deduct")}
                className="bg-red-600 text-white rounded-xl py-3 px-6 text-lg font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                Raqibdan ayirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;