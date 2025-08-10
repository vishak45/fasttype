import React, { useEffect, useState, useRef } from "react";
import { useParams,useNavigate,Link } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";
import turtle from '../../assets/turtle.jpg';
import rabbit from '../../assets/rabbit.jpeg';
import fox from '../../assets/fox.jpg';
import leopard from '../../assets/leopard.jpg';
import falcon from '../../assets/falcon.jpg';
import cheetah from '../../assets/cheetah.jpg';
import useUserAuth from "../lib/userAuth";
function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const token = useUserAuth((state) => state.token);
  const [typedWords, setTypedWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const timerRef = useRef(null);
const [showInput, setShowInput] = useState(true);
  // Fetch test data
  useEffect(() => {
    if(!token) navigate('/login');
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/tests/type/specific/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        setTimeLeft(response.data.time);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const words = data?.questionString.split(" ") || [];

  const handleKeyDown = (e) => {
    if (!isActive) setIsActive(true);

    if (e.key === " ") {
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
    setIsActive(false);
    setShowInput(false);
    const finalTypedWords = currentWord
      ? [...typedWords, currentWord]
      : [...typedWords];

    let correctCount = 0;
    finalTypedWords.forEach((word, idx) => {
      if (word === words[idx]) correctCount++;
    });

    const wordsTyped = finalTypedWords.length;
    const timeTaken = (data.time - timeLeft) / 60; // minutes
    const calculatedWpm = Math.round(wordsTyped / timeTaken);
    const calculatedAccuracy = Math.round(
      (correctCount / wordsTyped) * 100
    );

    setWpm(calculatedWpm || 0);
    setAccuracy(calculatedAccuracy || 0);
   
  };
  useEffect(() => {
      const setAnimal=()=>{
    console.log(wpm);
    if(wpm<20 && wpm>0){
        setImg({
            src:turtle,
            description:"You are a turtle 🐢"
           
        })
    }
    else if(wpm<40 && wpm>20){
        setImg({
            src:rabbit  ,
            description:"You are a rabbit 🐇"
        })
    }
    else if(wpm<60 && wpm>40){
        setImg({
            src:fox,
            description:"You are a fox 🦊"
        })
    }
    else if(wpm<80 && wpm>60){
        setImg({
            src:leopard,
            description:"You are a leopard 🐆"
        })
    }
    else if(wpm<100 && wpm>80){
         setImg({
            src:falcon,
            description:"You are a falcon 🦅"
        })
    }
    else{
         setImg({
            src:cheetah,
            description:"You are a cheetah 🐆"
        })
    }
}
    
    setAnimal();
   
  },[wpm]);
  useEffect(()=>{
   let accuracyMessage = "";

if (accuracy < 50) {
  accuracyMessage = "Poor accuracy - focus on hitting the right keys.";
} else if (accuracy >= 50 && accuracy < 70) {
  accuracyMessage = "Fair accuracy – you're getting there, keep practicing!";
} else if (accuracy >= 70 && accuracy < 85) {
  accuracyMessage = "Good accuracy – solid work!";
} else if (accuracy >= 85 && accuracy < 95) {
  accuracyMessage = "Great accuracy – very few mistakes!";
} else {
  accuracyMessage = "Excellent accuracy - near perfect!";
}
setImg(prev=>({
    ...prev,
    message:accuracyMessage}
  
  
  ))
 const addData=async()=>{
      console.log("adding data");
        try{
            await axiosInstance.post("/users/tests/type/add",{
                id,
                wpm,
                accuracy,
                difficulty:data.difficulty
            },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        }catch(error){
            console.log(error);
        }
    }
        if(accuracy!=null)
        addData();
    
  },[accuracy])


const [img, setImg] = useState({});
  const resetTest = () => {
    setShowInput(true);
    setTypedWords([]);
    setCurrentWord("");
    setCurrentIndex(0);
    setTimeLeft(data.time);
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

  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-6">
        Difficulty: <span className="capitalize">{data.difficulty}</span> | Time:{" "}
        {data.time}s
      </p>

      {/* Typing Test Box */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="bg-yellow-50 border border-orange-400 rounded-lg p-5 min-h-[120px] text-lg text-gray-900 mb-4 shadow-inner leading-relaxed flex flex-wrap gap-2">
          {renderWords()}
        </div>
{
    showInput?(  <input
          value={currentWord}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full border-2 border-orange-400 rounded-lg p-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Start typing here..."
          disabled={timeLeft === 0}
        />):null
}
      

        <div className="flex justify-between items-center mt-3 font-semibold text-gray-700">
          <span>
            Time Left: <span className="text-orange-500">{timeLeft}s</span>
          </span>
          {isActive && <span>Keep going! ⌨️</span>}
        </div>

       {wpm !== null && (
  <div className="mt-4 p-4 bg-green-50 border border-green-400 rounded-lg text-center">
    <div className="mb-2 w-40 h-40 mx-auto">
      <img
        src={img.src}
        alt="animal"
        className="w-full h-full object-contain shadow-lg"
      />
    </div>
    <p className="text-lg font-bold text-black-700">{img.description}...</p>
    <p className="text-lg font-bold text-black-700">{img.message}...</p>
    <p className="text-lg font-bold text-green-700">Results</p>
    <p className="text-gray-800">WPM: {wpm}</p>
    <p className="text-gray-800">Accuracy: {accuracy}%</p>
     <Link
          to='/stats'
          className="mt-4 bg-green-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold w-60 text-decoration-none"
          >
          Track your Progress
          </Link>
  </div>
)}



        <div className="text-center d-flex flex-column align-items-center">
          <button
            onClick={resetTest}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold w-60"
          >
            {wpm === null ? "Restart Test" : "Try Again"}
          </button>
         
        </div>
      </div>
    </div>
  );
}

export default TestPage;
