import React from "react";

import { Option } from "../lib/interfaces";

interface IDefaultItemRendererProps {
  checked: boolean;
  option: Option;
  disabled?: boolean;
  onClick: () => void;
}

const DefaultItemRenderer = ({
  checked,
  option,
  onClick,
  disabled,
}: IDefaultItemRendererProps) => (
  <label
    className={`item-renderer ${disabled ? "disabled" : ""}`}
    htmlFor={option.value}
  >
    <input
      id={option.value}
      type="checkbox"
      onChange={onClick}
      checked={checked}
      tabIndex={-1}
      disabled={disabled}
    />
    <span>{option.label}</span>
  </label>
);

export default DefaultItemRenderer;
