/**
 * This component represents an individual item in the multi-select drop-down
 */
import { css } from "goober";
import React, { useEffect, useRef } from "react";

import { cn } from "../lib/classnames";
import { Option } from "../lib/interfaces";
import DefaultItemRenderer from "./default-item";

interface ISelectItemProps {
  itemRenderer;
  option: Option;
  checked: boolean;
  focused?: boolean;
  tabIndex?: number;
  disabled?: boolean;
  onSelectionChanged: (checked: boolean) => void;
  onClick;
}

const ItemContainer = css({
  boxSizing: "border-box",
  cursor: "pointer",
  display: "block",
  padding: "var(--rmsc-p)",
  outline: 0,
  "&:hover,&:focus": {
    background: "var(--rmsc-hover)",
  },
  "&.selected": {
    background: "var(--rmsc-selected)",
  },
});

const SelectItem = ({
  itemRenderer: ItemRenderer = DefaultItemRenderer,
  option,
  checked,
  focused,
  tabIndex,
  disabled,
  onSelectionChanged,
  onClick,
}: ISelectItemProps) => {
  const itemRef: any = useRef();

  useEffect(() => {
    updateFocus();
    // eslint-disable-next-line
  }, [checked, focused]);

  const toggleChecked = () => {
    onSelectionChanged(!checked);
  };

  const handleClick = (e) => {
    toggleChecked();
    onClick(e);
  };

  const updateFocus = () => {
    if (focused && !disabled && itemRef) {
      itemRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
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
    <label
      className={cn(ItemContainer, "select-item", checked && "selected")}
      role="option"
      aria-selected={checked}
      tabIndex={tabIndex}
      ref={itemRef}
      onKeyDown={handleKeyDown}
    >
      <ItemRenderer
        option={option}
        checked={checked}
        onClick={handleClick}
        disabled={disabled}
      />
    </label>
  );
};

export default SelectItem;
