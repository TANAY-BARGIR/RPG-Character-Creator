import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom"; // IMPORT THIS
import StatRow from "../components/StatRow";
import "../App.css";
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
    case "SET_DATA":
      return action.payload;
    default:
      return state;
  }
}

function CreateHero() {
  const navigate = useNavigate(); // Hook for redirection
  const { id } = useParams();
  const isEditing = Boolean(id);

  const initialState = { strength: 0, agility: 0, intelligence: 0 };
  const [state, dispatch] = useReducer(rpgReducer, initialState);
  const { strength, agility, intelligence } = state;

  const [name, setName] = useState("");
  const nameInputref = useRef(null);
  const points = MAX_POINTS - (strength + agility + intelligence);

  useEffect(() => {
    nameInputref.current.focus();
  }, []);

  useEffect(() => {
    if (isEditing) {
      const fetchHero = async () => {
        const response = await fetch(`http://localhost:5000/api/heroes`);
        const data = await response.json();
        const heroToEdit = data.find((h) => h._id === id);

        if (heroToEdit) {
          setName(heroToEdit.name);
          dispatch({
            type: "SET_DATA",
            payload: {
              strength: heroToEdit.strength,
              agility: heroToEdit.agility,
              intelligence: heroToEdit.intelligence,
            },
          });
        }
      };
      fetchHero();
    }
  }, [id, isEditing]);
  const saveCharacter = useCallback(async () => {
    if (!name) {
      alert("Please enter a name first!");
      return;
    }
    const characterData = { name, strength, agility, intelligence };
    try {
      let url = "http://localhost:5000/api/heroes";
      let method = "POST";

      if (isEditing) {
        url = `http://localhost:5000/api/heroes/${id}`;
        method = "PUT";
      }
      const response = await fetch(url, {
        method: method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(characterData),
      });
      if (response.ok) {
        console.log(isEditing ? "Updated!" : "Created!");
        navigate("/");
      }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }, [name, state, navigate, isEditing, id]);

  return (
    <div className="parent-container wide-card">
      <h2 style={{color:"#34495e"}}>{isEditing ? "Edit Hero" : "Create Your Hero"}</h2>
      <h3 style={{color:"#34495e" , fontSize:"1.2rem"}}>Points Remaining: {points}</h3>

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
          style={{ backgroundColor: "#27ae60" ,fontSize:"1.3rem" }}
          onClick={saveCharacter}
        >
          {isEditing ? "Update Hero" : "Create Hero"}
        </button>
      </div>
    </div>
  );
}

export default CreateHero;
