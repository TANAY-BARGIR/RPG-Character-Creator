import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import "./App.css";
import StatRow from "./components/StatRow";

const MAX_POINTS = 20;

function rpgReducer(state, action) {
  const pointsSpent = state.strength + state.agility + state.intelligence;
  const pointsRemaining = MAX_POINTS - pointsSpent;

  switch (action.type) {
    case "INCREMENT":
      if (pointsRemaining > 0) {
        return { ...state, [action.attribute]: state[action.attribute] + 1 };
      }
      return state;
    case "DECREMENT":
      if (state[action.attribute] > 0) {
        return { ...state, [action.attribute]: state[action.attribute] - 1 };
      }
      return state;
    default:
      return state;
  }
}

function App() {
  const initialState = { strength: 0, agility: 0, intelligence: 0 };
  const [state, dispatch] = useReducer(rpgReducer, initialState);
  const { strength, agility, intelligence } = state;

  // 1. Back to simple initialization (No localStorage logic)
  const [name, setName] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [heroList, setHeroList] = useState([]);

  const nameInputref = useRef(null);
  const points = MAX_POINTS - (strength + agility + intelligence);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Title Effect (Unchanged)
  useEffect(() => {
    if (points === 0) {
      document.title = "Character Ready!";
    } else {
      document.title = `Points: ${points}`;
    }
  }, [points]);

  // Focus Effect (Unchanged)
  useEffect(() => {
    nameInputref.current.focus();
  }, []);

  // --- SERVER LOGIC ---

  const fetchHeroes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/heroes");
      if (response.ok) {
        const data = await response.json();
        setHeroList(data);
      }
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
  };

  // Load list on startup
  useEffect(() => {
    fetchHeroes();
  }, []);

  const saveCharacter = useCallback(async () => {
    // Basic validation
    if (!name) {
      alert("Please enter a name first!");
      return;
    }

    const characterData = { name, strength, agility, intelligence };
    try {
      const response = await fetch("http://localhost:5000/api/heroes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(characterData),
      });
      if (response.ok) {
        console.log("Saved to Server!");
        fetchHeroes(); // Refresh list immediately
        // Optional: Clear name after save to indicate success
        setName("");
      }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }, [name, state]);

  const deleteHero = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/heroes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Hero banished!");
        fetchHeroes();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };
  return (
    <div className="parent-container background">
      <h2>Points Remaining: {points}</h2>

      <input
        type="text"
        ref={nameInputref}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Hero Name"
      />

      <StatRow
        label="Strength"
        value={strength}
        points={points}
        onIncrease={() =>
          dispatch({ type: "INCREMENT", attribute: "strength" })
        }
        onDecrease={() =>
          dispatch({ type: "DECREMENT", attribute: "strength" })
        }
      />
      <StatRow
        label="Agility"
        value={agility}
        points={points}
        onIncrease={() => dispatch({ type: "INCREMENT", attribute: "agility" })}
        onDecrease={() => dispatch({ type: "DECREMENT", attribute: "agility" })}
      />
      <StatRow
        label="Intelligence"
        value={intelligence}
        points={points}
        onIncrease={() =>
          dispatch({ type: "INCREMENT", attribute: "intelligence" })
        }
        onDecrease={() =>
          dispatch({ type: "DECREMENT", attribute: "intelligence" })
        }
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button
          className="reset-btn"
          style={{ backgroundColor: "#27ae60" }}
          onClick={saveCharacter}
        >
          Save to Hall of Heroes
        </button>
      </div>

      <h3>Time Spent: {seconds}s</h3>

      {/* --- HALL OF HEROES --- */}
      <div
        style={{
          marginTop: "30px",
          borderTop: "1px solid #7f8c8d",
          paddingTop: "20px",
        }}
      >
        <h3 style={{ color: "#f1c40f" }}>Hall of Heroes</h3>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {heroList.length === 0 ? (
            <p style={{ color: "#95a5a6" }}>No heroes saved yet...</p>
          ) : (
            heroList.map((hero) => (
              <div
                key={hero._id}
                style={{
                  background: "#2c3e50",
                  margin: "5px 0",
                  padding: "10px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.9rem",
                  border: "1px solid #34495e",
                }}
              >
                {/* Left side: Text */}
                <div style={{ textAlign: "left" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#ecf0f1",
                      display: "block",
                    }}
                  >
                    {hero.name}
                  </span>
                  <span style={{ color: "#bdc3c7", fontSize: "0.8rem" }}>
                    Str:{hero.strength} Agi:{hero.agility} Int:
                    {hero.intelligence}
                  </span>
                </div>

                {/* Right side: Delete Button */}
                <button
                  onClick={() => deleteHero(hero._id)}
                  style={{
                    backgroundColor: "#c0392b",
                    fontSize: "0.8rem",
                    padding: "5px 10px",
                    width: "auto",
                    height: "auto",
                    marginLeft: "10px",
                  }}
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
