import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/axiosInstance";
import useUserAuth from "../lib/userAuth";
import { useNavigate,Link } from "react-router-dom";
import turtle from '../../assets/turtle.jpg';
import rabbit from '../../assets/rabbit.jpeg';
import fox from '../../assets/fox.jpg';
import leopard from '../../assets/leopard.jpg';
import falcon from '../../assets/falcon.jpg';
import cheetah from '../../assets/cheetah.jpg';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function CheckStats() {
  const navigate = useNavigate();
  const token = useUserAuth((state) => state.token);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/users/tests/fetch", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Fetched data:", response.data);
        // Adjust if your data is nested differently
        setData(response.data.typingTest || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, navigate]);

  // Get unique difficulty levels for filter dropdown
  const difficulties = ["All", ...new Set(data.map((d) => d.difficulty))];

  // Filter data based on selected difficulty
  const filteredData =
    filter === "All" ? data : data.filter((d) => d.difficulty === filter);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Typing Stats</h1>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label
          htmlFor="difficultyFilter"
          className="mr-3 font-semibold text-lg"
          style={{ color: "#111" }}
        >
          Filter by Difficulty:
        </label>
        <select
          id="difficultyFilter"
          className="border rounded px-3 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </div>

      {/* Graphs */}

      {filteredData.length > 0 ? (
        <>
          {/* WPM Over Time */}
          <div className="bg-white shadow p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">WPM Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="testDate"
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-GB")
                  }
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) =>
                    new Date(date).toLocaleString("en-GB")
                  }
                />
                <Line
                  type="monotone"
                  dataKey="wpm"
                  stroke="#f97316"
                  strokeWidth={3}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Accuracy Over Time */}
          <div className="bg-white shadow p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Accuracy Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="testDate"
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-GB")
                  }
                />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  labelFormatter={(date) =>
                    new Date(date).toLocaleString("en-GB")
                  }
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={3}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Test List */}
          
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Details</h2>
            {filteredData.map((item, index) => {
  // Determine image and description based on item.wpm
  let imgInfo;
  if (item.wpm >= 0 && item.wpm <= 20) {
    imgInfo = { src: turtle, description: "You are a turtle 🐢" };
  } else if (item.wpm > 20 && item.wpm <= 40) {
    imgInfo = { src: rabbit, description: "You are a rabbit 🐇" };
  } else if (item.wpm > 40 && item.wpm <= 60) {
    imgInfo = { src: fox, description: "You are a fox 🦊" };
  } else if (item.wpm > 60 && item.wpm <= 80) {
    imgInfo = { src: leopard, description: "You are a leopard 🐆" };
  } else if (item.wpm > 80 && item.wpm <= 100) {
    imgInfo = { src: falcon, description: "You are a falcon 🦅" };
  } else {
    imgInfo = { src: cheetah, description: "You are a cheetah 🐆" };
  }

  return (
    <div key={item._id || index} className="border-b last:border-b-0 py-2">
      <p>
        <strong>Date:</strong> {new Date(item.testDate).toLocaleString("en-GB")}
      </p>
      <p>
        <strong>WPM:</strong> {item.wpm}
      </p>
      <div>
        <img src={imgInfo.src} alt={imgInfo.description} className="w-24 h-auto" />
        <p>{imgInfo.description}</p>
      </div>
      <p>
        <strong>Accuracy:</strong> {item.accuracy}%
      </p>
      <p>
        <strong>Difficulty:</strong> {item.difficulty}
      </p>
      <hr className="my-2" />
    </div>
  );
})}

          </div>
        </>
      ) : (
       <div className="text-center py-10 px-6 bg-yellow-100 rounded-lg max-w-md mx-auto shadow-md">
  <p className="text-lg font-semibold mb-4" style={{ color: "#333" }}>
    No tests found for selected difficulty.
  </p>
  <p className="text-md" style={{ color: "#555" }}>
    Find fun and challenging tests at{" "}
    <Link to="/challenges" className="text-orange-500 font-bold hover:underline">
      Challenges
    </Link>
  </p>
</div>

      )}
    </div>
  );
}

export default CheckStats;
