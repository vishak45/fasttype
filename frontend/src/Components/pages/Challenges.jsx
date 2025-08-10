import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";
import useUserAuth from "../lib/userAuth";
function Challenges() {
  const token=useUserAuth((state) => state.token);
  const navigate = useNavigate();
  const dailyChallenge = {
    id: 99,
    title: "Daily Typing Blast",
    description: "Test your skills with today's special challenge!",
    difficulty: "Custom",
  };
  useEffect(() => {
    if(!token) navigate('/login');
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/tests/type/all",{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

  }, []);
  const challenges={
    Easy: [],
    Medium: [],
    Hard: []
  }
  const [data,setData]=React.useState([])
  data.map((data) => {
    if (data.difficulty === "easy") {
      challenges.Easy.push({ id: data._id, title: data.title });
    } else if (data.difficulty === "medium") {
      challenges.Medium.push({ id: data._id, title: data.title });
    } else if (data.difficulty === "hard") {
      challenges.Hard.push({ id: data._id, title: data.title });
    }
  });
  // const challenges = {
  //   Easy: [
  //     { id: data._id, title: "Home Row Practice" },
  //     { id: 2, title: "Basic Words" },
  //     { id: 3, title: "Short Sentences" },
  //     { id: 10, title: "Easy Numbers" },
  //     { id: 11, title: "Beginner Quotes" },
  //   ],
  //   Medium: [
  //     { id: 4, title: "Speed Test" },
  //     { id: 5, title: "Common Phrases" },
  //     { id: 6, title: "Long Paragraph" },
  //     { id: 12, title: "Mixed Sentences" },
  //     { id: 13, title: "Medium Quotes" },
  //   ],
  //   Hard: [
  //     { id: 7, title: "Code Snippets" },
  //     { id: 8, title: "Random Words" },
  //     { id: 9, title: "Accuracy Challenge" },
  //     { id: 14, title: "Hard Numbers" },
  //     { id: 15, title: "Advanced Paragraph" },
  //   ],
  // };

  const categoryColors = {
    Easy: "text-green-600",
    Medium: "text-yellow-600",
    Hard: "text-red-600",
  };

  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleShowMore = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="bg-[#FFF7E6] min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#111] mb-2">Challenges</h1>
<div><p className="text-[#111] mb-4 font-semibold">Test your typing speed and accuracy with our daily typing challenge!</p></div>
      {/* Daily Challenge Card */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{dailyChallenge.title}</h2>
            <p className="mt-2 text-sm opacity-90">{dailyChallenge.description}</p>
            <p className="mt-1 font-semibold">
              Difficulty: <span className="text-yellow-300">{dailyChallenge.difficulty}</span>
            </p>
          </div>
          <Link
            readOnly
            className="mt-4 sm:mt-0 bg-white text-purple-600 px-5 py-2 rounded-full font-medium shadow-md hover:bg-gray-100 transition text-decoration-none"
          >
            Coming Soon
          </Link>
        </div>
      </div>

      {/* Category Challenges */}
      {Object.keys(challenges).map((category) => {
        const isExpanded = expandedCategories[category];
        const visibleChallenges = isExpanded
          ? challenges[category]
          : challenges[category].slice(0, 3);

        return (
          <div key={category} className="mb-10">
            <h2
              className={`text-2xl font-semibold mb-4 ${categoryColors[category]}`}
            >
              {category}
            </h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#FFA500] text-white">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleChallenges.map((ch) => (
                    <tr
                      key={ch.id}
                      className="border-b hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-4 py-3">
                        <Link
                          to={`/typing/${ch.id}`}
                          className="text-[#111] font-medium hover:underline text-decoration-none"
                        >
                          {ch.title}
                        </Link>
                      </td>
                      <td className={`px-4 py-3 ${categoryColors[category]}`}>
                        {category}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {challenges[category].length > 3 && (
              <button
                onClick={() => toggleShowMore(category)}
                className="mt-3 text-sm px-4 py-1 bg-[#FFA500] text-white rounded-full shadow hover:bg-orange-500 transition"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Challenges;
