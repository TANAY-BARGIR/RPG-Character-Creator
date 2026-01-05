import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Used for links
import "../App.css";

function Home() {
  const [heroList, setHeroList] = useState([]);

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

  useEffect(() => {
    fetchHeroes();
  }, []);

  const deleteHero = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/heroes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchHeroes();
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="parent-container wide-card">
      <h2 style={{color:"#34495e"}}>The Hall of Heroes</h2>

      <Link to="/create">
        <button
          style={{
            marginBottom: "20px",
            background: "#f1c40f",
            color: "#2c3e50",
            fontSize: "1.4rem",
            border: "1px solid #ecf0f1",
            borderRadius: "15px",
            boxShadow: "0 5px 12.5px rgba(0, 0, 0, 0.5)",
          }}
        >
          + Create New Hero
        </button>
      </Link>

      <div style={{ borderTop: "1px solid #7f8c8d", paddingTop: "20px" }}>
        {heroList.length === 0 ? (
          <p>No heroes found. Go create one!</p>
        ) : (
          heroList.map((hero) => (
            <div
              key={hero._id}
              style={{
                background: "#2c3e50",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #34495e",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    display: "block",
                    color: "white",
                  }}
                >
                  {hero.name}
                </span>
                <span style={{ color: "#fedbd3ff", fontSize: "0.9rem" }}>
                  STR:{hero.strength} AGI:{hero.agility} INT:{hero.intelligence}
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Link to={`/edit/${hero._id}`}>
                  <button>Edit</button>
                </Link>

                <button
                  onClick={() => deleteHero(hero._id)}
                  style={{ backgroundColor: "#c0392b" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
