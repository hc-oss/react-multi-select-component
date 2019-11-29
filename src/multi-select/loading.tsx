import React from "react";
import styled from "@emotion/styled";

const Spinner = styled.svg`
  animation: rotate 2s linear infinite;

  & .path {
    stroke: ${(props: any) => props.theme.border};
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

function Loading({ size = 26 }) {
  return (
    <div
      style={{
        cursor: "pointer",
        display: "table-cell",
        verticalAlign: "middle",
        width: size,
        marginRight: "0.2rem"
      }}
    >
      <Spinner
        width={size}
        height={size}
        className="spinner"
        viewBox="0 0 50 50"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <circle cx="25" cy="25" r="20" fill="none" className="path"></circle>
      </Spinner>
    </div>
  );
}

export default Loading;
