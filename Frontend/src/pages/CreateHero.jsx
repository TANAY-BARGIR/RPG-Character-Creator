import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // IMPORT THIS
import StatRow from "../components/StatRow";

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

function CreateHero() {
  const navigate = useNavigate(); // Hook for redirection

  const initialState = { strength: 0, agility: 0, intelligence: 0 };
  const [state, dispatch] = useReducer(rpgReducer, initialState);
  const { strength, agility, intelligence } = state;

  const [name, setName] = useState("");
  const nameInputref = useRef(null);
  const points = MAX_POINTS - (strength + agility + intelligence);

  useEffect(() => {
    nameInputref.current.focus();
  }, []);

  const saveCharacter = useCallback(async () => {
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
        // HERE IS THE MAGIC: Redirect to Home Page after save
        navigate("/");
      }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }, [name, state, navigate]);

  return (
    <div>
      <h2>Create Your Hero</h2>
      <h3>Points Remaining: {points}</h3>

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
          Save & Exit
        </button>
      </div>
    </div>
  );
}

export default CreateHero;
