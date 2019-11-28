import React from "react";

function Loading({ size = 26, color = "#666", isLoading }) {
  return isLoading ? (
    <div
      style={{
        cursor: "pointer",
        display: "table-cell",
        verticalAlign: "middle",
        width: size
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        stroke={color}
        viewBox="0 0 46 46"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <g
          fill="none"
          fillRule="evenodd"
          strokeWidth="5"
          transform="translate(4 4)"
        >
          <circle cx="18" cy="18" r="18" strokeOpacity="0.4"></circle>
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              dur="1s"
              from="0 18 18"
              repeatCount="indefinite"
              to="360 18 18"
              type="rotate"
            ></animateTransform>
          </path>
        </g>
      </svg>
    </div>
  ) : (
    <></>
  );
}

export default Loading;
