import { useState, useEffect } from "react";
import "../App.css";

function StatRow({ label, value, points, onIncrease, onDecrease }) {
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    if (value < 3) {
      setBgColor("salmon");
    } else if (value >= 10) {
      setBgColor("lightgreen");
    } else {
      setBgColor("white");
    }
  }, [value]);

  return (
    <div
      className="stat-row"
      style={{ backgroundColor: bgColor, padding: "10px", margin: "5px" }}
    >
      <span style={{ marginRight: "10px", fontWeight: "bold", color: "#346" }}>
        {label}
      </span>

      <button className="stat-btn" onClick={onDecrease} disabled={value === 0}>
        {" "}
        -{" "}
      </button>

      <input type="text" readOnly value={value} style={{ margin: "0 10px" }} />

      <button className="stat-btn" onClick={onIncrease} disabled={points === 0}>
        {" "}
        +{" "}
      </button>
    </div>
  );
}

export default StatRow;
