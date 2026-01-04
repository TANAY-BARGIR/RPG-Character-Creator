import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Used for links

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
    <div>
      <h2>The Hall of Heroes</h2>

      {/* A Link is better than a standard <a href> because it doesn't reload the page */}
      <Link to="/create">
        <button
          style={{
            marginBottom: "20px",
            background: "#f1c40f",
            color: "#2c3e50",
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
                  }}
                >
                  {hero.name}
                </span>
                <span style={{ color: "#bdc3c7", fontSize: "0.9rem" }}>
                  STR:{hero.strength} AGI:{hero.agility} INT:{hero.intelligence}
                </span>
              </div>
              <button
                onClick={() => deleteHero(hero._id)}
                style={{ backgroundColor: "#c0392b", padding: "5px 12px" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
