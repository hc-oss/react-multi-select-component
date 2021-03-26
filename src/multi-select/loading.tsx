import React from "react";

export const Loading = ({ size = 24 }) => (
  <span
    style={{
      width: size,
      marginRight: "0.2rem",
    }}
  >
    <svg
      width={size}
      height={size}
      className="spinner"
      viewBox="0 0 50 50"
      style={{ display: "inline", verticalAlign: "middle" }}
    >
      <circle cx="25" cy="25" r="20" fill="none" className="path"></circle>
    </svg>
  </span>
);
