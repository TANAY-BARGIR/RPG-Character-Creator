import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Import your pages
import Home from "./pages/Home";
import CreateHero from "./pages/CreateHero";

function App() {
  return (
    <BrowserRouter>
      <div className="parent-container background">
        {/* Navigation Bar (Visible on all pages) */}
        <nav
          style={{
            marginBottom: "30px",
            borderBottom: "2px solid #7f8c8d",
            paddingBottom: "15px",
          }}
        >
          <Link
            to="/"
            style={{
              margin: "0 10px",
              color: "white",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            🏠 Home
          </Link>
          <Link
            to="/create"
            style={{
              margin: "0 10px",
              color: "#f1c40f",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            🧪 Create Hero
          </Link>
        </nav>

        {/* The "Screen" that changes based on URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateHero />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
