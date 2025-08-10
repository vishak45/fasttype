import React, { useState, useEffect, useRef } from "react";
import typingImage from "../../assets/typing-practice.jpg";
import { Link } from "react-router-dom";

function Home() {
  const testText =
    "The quick brown fox jumps over the lazy dog. Where there is a will, there is a way. How far you go in life depends on your being the change you want to see. The future belongs to those who believe in the beauty of their dreams!";
  const words = testText.split(" ");

  const [typedWords, setTypedWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const timerRef = useRef(null);
  const [showInput,setShowInput]=useState(true);
  const handleKeyDown = (e) => {
    if (!isActive) setIsActive(true);

  if (e.key === " " || e.code === "Space")  {
      e.preventDefault();

      const newTypedWords = [...typedWords, currentWord];
      setTypedWords(newTypedWords);
      setCurrentWord("");
      setCurrentIndex((prev) => prev + 1);
      if(currentIndex === words.length - 1) finishTest();
    }
  };

  const handleChange = (e) => {
    setCurrentWord(e.target.value);
  };

  // Timer countdown
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      finishTest();
    }
    return () => clearTimeout(timerRef.current);
  }, [isActive, timeLeft]);

  const finishTest = () => {
    setShowInput(false);
    setIsActive(false);

    // Include the last typed word if timer ends mid-word
    const finalTypedWords = currentWord
      ? [...typedWords, currentWord]
      : [...typedWords];

    let correctCount = 0;
    finalTypedWords.forEach((word, idx) => {
      if (word === words[idx]) correctCount++;
    });

    const wordsTyped = finalTypedWords.length;
    const timeTaken = (30 - timeLeft) / 60; // minutes
    const calculatedWpm = Math.round(wordsTyped / timeTaken);
    const calculatedAccuracy = Math.round(
      (correctCount / wordsTyped) * 100
    );

    setWpm(calculatedWpm || 0);
    setAccuracy(calculatedAccuracy || 0);
  };

  const resetTest = () => {
    setShowInput(true);
    setTypedWords([]);
    setCurrentWord("");
    setCurrentIndex(0);
    setTimeLeft(30);
    setIsActive(false);
    setWpm(null);
    setAccuracy(null);
  };

  const renderWords = () => {
    return words.map((word, idx) => {
      let className = "";
      if (idx < typedWords.length) {
        className =
          typedWords[idx] === word
            ? "text-green-600"
            : "text-red-600";
      }
      if (idx === currentIndex) {
        return (
          <span key={idx} className="bg-yellow-100 px-1 rounded">
            {word.split("").map((char, charIdx) => {
              let letterClass = "";
              if (charIdx < currentWord.length) {
                if (currentWord[charIdx] === char) {
                  letterClass = "text-green-600";
                } else {
                  letterClass = "text-red-600";
                }
              }
              return (
                <span key={charIdx} className={letterClass}>
                  {char}
                </span>
              );
            })}
          </span>
        );
      }
      return (
        <span key={idx} className={`${className} px-1`}>
          {word}
        </span>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
  <h1 className="font-bold text-gray-900 text-3xl md:text-4xl">
    Welcome to <span className="text-orange-500">TypeGearUp</span>
  </h1>
  <p className="text-base md:text-lg text-gray-700 mt-3 leading-relaxed max-w-xl mx-auto">
    Test and improve your typing speed with fun challenges, real-time accuracy
    tracking, and an easy-to-use interface.
  </p>

  <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-4">
    {/* Left Side - Image */}
    <div className="flex-shrink-0 w-full md:w-1/3">
      <img
        src={typingImage}
        alt="Typing"
        className="w-56 md:w-64 rounded-xl shadow-lg mx-auto"
      />
    </div>

    {/* Right Side - How It Works */}
    <div className="max-w-md text-left">
     
      <div className="space-y-3">
        {[
          {
            step: "1️⃣",
            title: "Choose a Challenge",
            desc: "Select a typing challenge that matches your skill level.",
          },
          {
            step: "2️⃣",
            title: "Start Typing",
            desc: "Type the given text as quickly and accurately as you can.",
          },
          {
            step: "3️⃣",
            title: "View Results",
            desc: "See your WPM, accuracy, and progress instantly.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl mr-3">{item.step}</div>
            <div>
              <h3 className="font-semibold text-base">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

 <div className="d-flex justify-content-center w-100 text-center mb-4 mt-4">
  <p className="fw-bold">
    <span className="text-orange-600">Finished typing?</span> Press the spacebar to submit instantly—no need to wait for the timer to end 😜!
  </p>
</div>
      {/* Typing Test Box */}
      <div className="mx-auto max-w-3xl bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="bg-yellow-50 border border-orange-400 rounded-lg p-5 min-h-[120px] text-lg text-gray-900 mb-4 shadow-inner leading-relaxed flex flex-wrap gap-2">
          {renderWords()}
        </div>

       {
        showInput&&( <input
          value={currentWord}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full border-2 border-orange-400 rounded-lg p-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Start typing here..."
          disabled={timeLeft === 0}
        />)
       }

        <div className="flex justify-between items-center mt-3 font-semibold text-gray-700">
          <span>
            Time Left: <span className="text-orange-500">{timeLeft}s</span>
          </span>
          {isActive && <span>Keep going! ⌨️</span>}
        </div>

        {wpm !== null && (
          <div className="mt-4 p-4 bg-green-50 border border-green-400 rounded-lg text-center">
            <p className="text-lg font-bold text-green-700">Results</p>
            <p className="text-gray-800">WPM: {wpm}</p>
            <p className="text-gray-800">Accuracy: {accuracy}%</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={resetTest}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {wpm === null ? "Restart Test" : "Try Again"}
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center bg-orange-50 border border-orange-300 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900">
          Wanna try something harder and more challenging?
        </h2>
        <p className="mt-3 text-lg text-gray-700 leading-relaxed">
          This is just a warm-up! 🏁 Explore{" "}
          <span className="text-orange-500 font-semibold">TypeGearUp</span>'s full
          library of challenges.
        </p>
        <Link
          to="/challenges"
          className="inline-block mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-decoration-none"
        >
          Explore Challenges 🚀
        </Link>
      </div>
 

{/* Typing Tips */}
{/* <div className="mt-16 bg-orange-50 p-8 rounded-xl border border-orange-200 shadow-inner">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Typing Tips & Tricks</h2>
  <ul className="list-disc pl-6 text-gray-700 space-y-2">
    <li>Keep your fingers on the home row keys for maximum speed.</li>
    <li>Avoid looking at the keyboard – build muscle memory instead.</li>
    <li>Focus on accuracy before speed to improve long-term performance.</li>
    <li>Take regular breaks to prevent fatigue and strain.</li>
  </ul>
</div> */}

{/* Fun Facts */}
<div className="mt-16">
  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Fun Facts About Typing</h2>
  <div className="grid md:grid-cols-2 gap-6">
    {[
      { fact: "The fastest typing speed ever recorded was 216 words per minute.", bg: "bg-yellow-100" },
      { fact: "Touch typing can improve productivity by up to 70%.", bg: "bg-pink-100" },
      { fact: "Typing with 10 fingers reduces strain compared to hunt-and-peck methods.", bg: "bg-blue-100" },
      { fact: "The sentence 'The quick brown fox jumps over the lazy dog' contains every letter in the English alphabet.", bg: "bg-green-100" }
    ].map((item, idx) => (
      <div key={idx} className={`${item.bg} p-4 rounded-lg shadow-md border border-gray-200`}>
        {item.fact}
      </div>
    ))}
  </div>
</div>


       {/* Why Choose Us */}
      <div className="mt-12 grid md:grid-cols-4 gap-6">
        {[
          { icon: "🚀", title: "Boost Speed", desc: "Train to type faster with structured lessons." },
          { icon: "📊", title: "Track Progress", desc: "View your stats and monitor improvement over time." },
          { icon: "🎯", title: "Fun Challenges", desc: "Engage in interactive and competitive typing games." },
         { icon: "🔥", title: "Daily Challenge", desc: "Take on a new typing challenge every day and improve your skills." }

        ].map((item, idx) => (
          <div
  key={idx}
  className="bg-white p-5 rounded-lg shadow-md border border-gray-200 text-center 
             transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-orange-300"
>
  <div className="text-4xl">{item.icon}</div>
  <h3 className="font-bold text-lg mt-3">{item.title}</h3>
  <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
</div>

        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-orange-500 font-semibold text-lg">
        Start your journey to becoming a typing pro with{" "}
        <span className="text-gray-900">TypeGearUp</span> today!
      </div>
    </div>
  );
}

export default Home;

