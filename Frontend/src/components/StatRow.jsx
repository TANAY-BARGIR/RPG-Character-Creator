import { useState, useEffect } from "react";
// 1. We move the logic INSIDE the component
function StatRow({ label, value, points, onIncrease, onDecrease }) {
  // Each row gets its own independent state for color
  const [bgColor, setBgColor] = useState("white");

  // 2. This useEffect only runs when THIS specific row's 'value' changes
  useEffect(() => {
    // Logic specific to this row
    if (value < 3) {
      setBgColor("salmon"); // Warning color
    } else if (value >= 10) {
      setBgColor("lightgreen"); // Good color
    } else {
      setBgColor("white"); // Default
    }
  }, [value]); // <--- Dependency is just this row's value

  return (
    // 3. We apply the style directly to this div
    <div
      className="stat-row"
      style={{ backgroundColor: bgColor, padding: "10px", margin: "5px" }}
    >
      <span style={{ marginRight: "10px", fontWeight: "bold" }}>{label}</span>

      <button onClick={onDecrease} disabled={value === 0}>
        {" "}
        -{" "}
      </button>

      {/* Added margin to input for looks */}
      <input type="text" readOnly value={value} style={{ margin: "0 10px" }} />

      <button onClick={onIncrease} disabled={points === 0}>
        {" "}
        +{" "}
      </button>
    </div>
  );
}
export default StatRow;