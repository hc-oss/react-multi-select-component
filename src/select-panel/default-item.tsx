import styled from "@emotion/styled";
import React from "react";

import { Option } from "../lib/interfaces";

interface IDefaultItemRendererProps {
  checked: boolean;
  option: Option;
  disabled?: boolean;
  onClick;
}

const DefaultRenderer = styled.span`
  cursor: default;

  input,
  span {
    vertical-align: middle;
    margin: 0;
  }
  span {
    display: inline-block;
    padding-left: 5px;
  }
  &.disabled {
    opacity: 0.5;
  }
`;

const DefaultItemRenderer = ({
  checked,
  option,
  onClick,
  disabled
}: IDefaultItemRendererProps) => {
  return (
    <DefaultRenderer className={`item-renderer ${disabled && "disabled"}`}>
      <input
        type="checkbox"
        onChange={onClick}
        checked={checked}
        tabIndex={-1}
        disabled={disabled}
      />
      <span>{option.label}</span>
    </DefaultRenderer>
  );
};

export default DefaultItemRenderer;
