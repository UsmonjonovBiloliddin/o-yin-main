import React, { useState, useEffect } from "react";

// Barcha savollar uchun bir xil ball
const UNIFORM_POINTS = 20;
// "Super Savol" uchun 1,5 baravar ko'proq ball
const POWER_POINTS = Math.round(UNIFORM_POINTS * 1.5);

// O'zbek tilidagi savollar va topshiriqlar
const allQuestions = [
  // Editable Poly
  {
    id: 1,
    type: "quiz",
    question: "Editable Poly rejimida qaysi darajalar bilan ishlash mumkin?",
    options: ["Vertex, Edge, Border, Polygon, Element", "Line, Circle, Arc", "Box, Sphere, Cylinder", "Layer, Group, Object"],
    answer: "Vertex, Edge, Border, Polygon, Element",
    points: UNIFORM_POINTS,
  },
  {
    id: 2,
    type: "quiz",
    question: "Editable Poly rejimida yuzalarni yumaloqlash uchun qaysi amal ishlatiladi?",
    options: ["Bevel", "Chamfer", "Extrude", "Slice"],
    answer: "Chamfer",
    points: UNIFORM_POINTS,
  },

  // Editable Spline
  {
    id: 3,
    type: "quiz",
    question: "Editable Spline qaysi shakl asosida yaratiladi?",
    options: ["Spline chiziqlar", "Mesh obyektlar", "NURBS", "Patch tarmoqlar"],
    answer: "Spline chiziqlar",
    points: UNIFORM_POINTS,
  },
  {
    id: 4,
    type: "quiz",
    question: "Spline'ni 3D obyektga aylantirish uchun qaysi modifikator ishlatiladi?",
    options: ["Extrude", "Lathe", "Bevel Profile", "Hammasi"],
    answer: "Hammasi",
    points: UNIFORM_POINTS,
  },

  // Modifikatorlar
  {
    id: 5,
    type: "quiz",
    question: "Bend modifikatori nima qiladi?",
    options: ["Obyektni bukadi", "Obyektni aylantiradi", "Obyektni cho'zadi", "Obyektni bo‘yaydi"],
    answer: "Obyektni bukadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 6,
    type: "quiz",
    question: "Twist modifikatori obyektni qanday o‘zgartiradi?",
    options: ["Aylantiradi", "Burab o‘giradi", "Cho‘zadi", "Kesib tashlaydi"],
    answer: "Burab o‘giradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 7,
    type: "quiz",
    question: "Noise modifikatori nima uchun ishlatiladi?",
    options: ["Tasodifiy notekisliklar hosil qilish", "Rang berish", "Yorug‘lik qo‘shish", "Animatsiya qilish"],
    answer: "Tasodifiy notekisliklar hosil qilish",
    points: UNIFORM_POINTS,
  },
  {
    id: 8,
    type: "quiz",
    question: "Ripple modifikatori qanday effekt beradi?",
    options: ["To‘lqin hosil qiladi", "Buradi", "Bukadi", "Parchalab yuboradi"],
    answer: "To‘lqin hosil qiladi",
    points: UNIFORM_POINTS,
  },
  {
    id: 9,
    type: "quiz",
    question: "Wave modifikatori qaysi effektni beradi?",
    options: ["Uzoq cho‘zadi", "Yassi to‘lqin hosil qiladi", "Buradi", "Kesadi"],
    answer: "Yassi to‘lqin hosil qiladi",
    points: UNIFORM_POINTS,
  },
  {
    id: 10,
    type: "quiz",
    question: "Extrude modifikatori qanday ishlaydi?",
    options: ["2D shakldan 3D obyekt yaratadi", "Obyektni aylantiradi", "Obyektni siljitadi", "Obyektni bo‘lish uchun"],
    answer: "2D shakldan 3D obyekt yaratadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 11,
    type: "quiz",
    question: "Lathe modifikatori qanday obyekt hosil qiladi?",
    options: ["Aylanish bo‘yicha simmetrik obyekt", "Cho‘zilgan obyekt", "Burilgan obyekt", "Kesilgan obyekt"],
    answer: "Aylanish bo‘yicha simmetrik obyekt",
    points: UNIFORM_POINTS,
  },
  {
    id: 12,
    type: "quiz",
    question: "Lattice modifikatori qaysi effektni beradi?",
    options: ["Spline’ni 3D ramkaga aylantiradi", "Spline’ni cho‘zadi", "Spline’ni bukadi", "Spline’ni animatsiya qiladi"],
    answer: "Spline’ni 3D ramkaga aylantiradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 13,
    type: "quiz",
    question: "Bevel Profile modifikatori qanday ishlaydi?",
    options: ["Spline’ni boshqa shakl bo‘yicha ekstruziya qiladi", "Spline’ni buradi", "Spline’ni kesadi", "Spline’ni bo‘yoqlaydi"],
    answer: "Spline’ni boshqa shakl bo‘yicha ekstruziya qiladi",
    points: UNIFORM_POINTS,
  },
  {
    id: 14,
    type: "quiz",
    question: "Roof Generator plaginining vazifasi nima?",
    options: ["Tom konstruktsiyalarini avtomatik yaratadi", "Devorlarni chizadi", "Deraza va eshik hosil qiladi", "Spline’ni meshga aylantiradi"],
    answer: "Tom konstruktsiyalarini avtomatik yaratadi",
    points: UNIFORM_POINTS,
  },

  // V-Ray
  {
    id: 15,
    type: "quiz",
    question: "V-Ray renderer qaysi maqsadda ishlatiladi?",
    options: ["Realistik rendering qilish uchun", "Obyektni model qilish uchun", "Spline yaratish uchun", "Animatsiya yaratish uchun"],
    answer: "Realistik rendering qilish uchun",
    points: UNIFORM_POINTS,
  },
  {
    id: 16,
    type: "quiz",
    question: "V-Ray material slotida eng ko‘p ishlatiladigan material turi qaysi?",
    options: ["V-Ray Mtl", "Multi/Sub-Object", "Standard Material", "Physical Material"],
    answer: "V-Ray Mtl",
    points: UNIFORM_POINTS,
  },
  {
    id: 17,
    type: "quiz",
    question: "V-Ray Light qaysi afzallikka ega?",
    options: ["Realistik yorug‘lik beradi", "Faqat sun’iy yorug‘lik yaratadi", "Obyektni cho‘zadi", "Materialni tahrirlaydi"],
    answer: "Realistik yorug‘lik beradi",
    points: UNIFORM_POINTS,
  },

  // Challenge
  {
    id: 18,
    type: "challenge",
    challenge: "1 daqiqa ichida 3D obyektni model qiling (masalan: stul yoki stol).",
    points: UNIFORM_POINTS,
  },
  {
    id: 19,
    type: "challenge",
    challenge: "30 soniyada 5 ta modifikator nomini sanab bering!",
    points: UNIFORM_POINTS,
  },

  // Power savol
  {
    id: 20,
    type: "power",
    question: "3ds Max’da Lathe va Extrude modifikatorlari o‘rtasidagi asosiy farq nima?",
    options: [
      "Lathe aylanish bo‘yicha obyekt yaratadi, Extrude esa 2D shakldan cho‘zib 3D obyekt hosil qiladi",
      "Ikkalasi ham bir xil ishlaydi",
      "Extrude obyektni buradi, Lathe esa tekislashtiradi",
      "Lathe faqat spline’larni kesib tashlaydi, Extrude esa spline’ni aylantiradi"
    ],
    answer: "Lathe aylanish bo‘yicha obyekt yaratadi, Extrude esa 2D shakldan cho‘zib 3D obyekt hosil qiladi",
    points: POWER_POINTS,
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
        setCurrentQuestion(null);
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
      activeTeam === 1
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
          Jamolar uchun savollar o'yini
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
          <p className="text-5xl md:text-6xl font-extrabold text-center text-green-200">
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
          <p className="text-5xl md:text-6xl font-extrabold text-center text-green-200">
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
                  : " bg-[linear-gradient(127deg,rgba(0,183,255,1)_0%,rgba(62,207,190,1)_0%,rgba(34,104,224,1)_100%)] hover:bg-blue-700 hover:scale-105"
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
                    className="bg-green-950 text-white rounded-xl py-3 px-6 text-lg font-semibold hover:bg-green-600 cursor-pointer transition-colors duration-200"
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
