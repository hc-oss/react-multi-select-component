/**
 * This component represents an individual item in the multi-select drop-down
 */
import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";

import { Option } from "../lib/interfaces";
import DefaultItemRenderer from "./default-item";

interface ISelectItemProps {
  itemRenderer;
  option: Option;
  checked: boolean;
  focused?: boolean;
  disabled?: boolean;
  onSelectionChanged: (checked: boolean) => void;
  onClick;
}

const ItemContainer = styled.label`
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  padding: 10px;
  outline: 0;
  &:hover,
  &.selected {
    background: ${(props: any) => props.theme.hover};
  }
`;

const SelectItem = ({
  itemRenderer: ItemRenderer = DefaultItemRenderer,
  option,
  checked,
  focused,
  disabled,
  onSelectionChanged,
  onClick
}: ISelectItemProps) => {
  const itemRef: any = useRef();

  useEffect(() => {
    updateFocus();
    // eslint-disable-next-line
  }, []);

  const toggleChecked = () => {
    onSelectionChanged(!checked);
  };

  const handleClick = e => {
    toggleChecked();
    onClick(e);
  };

  const updateFocus = () => {
    if (focused && itemRef) {
      console.log(itemRef);
      itemRef.current.focus();
    }
  };

  const handleKeyDown = e => {
    switch (e.which) {
      case 13: // Enter
      case 32: // Space
        toggleChecked();
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <ItemContainer
      className={`select-item ${checked && "selected"}`}
      role="option"
      aria-selected={checked}
      tabIndex={-1}
      ref={itemRef}
      onKeyDown={handleKeyDown}
    >
      <ItemRenderer
        option={option}
        checked={checked}
        onClick={handleClick}
        disabled={disabled}
      />
    </ItemContainer>
  );
};

export default SelectItem;
