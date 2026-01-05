import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import CreateHero from "./pages/CreateHero";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <nav
          style={{
            marginBottom: "30px",
            padding: "15px",
            backgroundColor: "#b9d4ed",
            border: "2px solid #ecf0f1",
            borderRadius: "15px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Link
            to="/"
            style={{
              margin: "0 10px",
              color: "Black",
              textDecoration: "none",
              fontSize: "1.8rem",
            }}
          >
            🏠 Home
          </Link>
          <Link
            to="/create"
            style={{
              margin: "0 10px",
              color: "Black",
              textDecoration: "none",
              fontSize: "1.8rem",
            }}
          >
            🧪 Create Hero
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateHero />} />
          <Route path="/edit/:id" element={<CreateHero />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
