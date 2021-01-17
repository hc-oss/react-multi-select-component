import { css } from "goober";
import React from "react";

const Spinner = css({
  animation: "rotate 2s linear infinite",

  "& .path": {
    stroke: "var(--rmsc-border)",
    strokeWidth: "4px",
    strokeLinecap: "round",
    animation: "dash 1.5s ease-in-out infinite",
  },

  "@keyframes rotate": {
    "100%": {
      transform: "rotate(360deg)",
    },
  },

  "@keyframes dash": {
    "0%": {
      strokeDasharray: "1,150",
      strokeDashoffset: 0,
    },
    "50%": {
      strokeDasharray: "90,150",
      strokeDashoffset: "-35",
    },
    "100%": {
      strokeDasharray: "90,150",
      strokeDashoffset: "-124",
    },
  },
});

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
      className={Spinner}
      viewBox="0 0 50 50"
      style={{ display: "inline", verticalAlign: "middle" }}
    >
      <circle cx="25" cy="25" r="20" fill="none" className="path"></circle>
    </svg>
  </span>
);
