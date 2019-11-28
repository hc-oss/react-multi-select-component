import React from "react";

export default function Arrow({ expanded = false }) {
  return (
    <span
      className="dropdown-heading-dropdown-arrow gray"
      style={{ paddingTop: "4px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {expanded ? (
          <polyline points="18 15 12 9 6 15"></polyline>
        ) : (
          <path d="M6 9L12 15 18 9"></path>
        )}
      </svg>
    </span>
  );
}
