import React from "react";
interface IArrowProps {
  expanded: boolean | undefined;
}

export const Arrow = ({ expanded }: IArrowProps) => (
  <svg
    width="24"
    height="24"
    className="rmsc__arrow-svg dropdown-heading-dropdown-arrow gray"
  >
    <path
      className="rmsc__arrow-path"
      d={expanded ? "M18 15 12 9 6 15" : "M6 9L12 15 18 9"}
    />
  </svg>
);
