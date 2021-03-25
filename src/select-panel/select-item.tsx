/**
 * This component represents an individual item in the multi-select drop-down
 */
import { css } from "goober";
import React, { useRef } from "react";

import { useKey } from "../hooks/use-key";
import { cn } from "../lib/classnames";
import { Option } from "../lib/interfaces";
import DefaultItemRenderer from "./default-item";

interface ISelectItemProps {
  itemRenderer;
  option: Option;
  checked?: boolean;
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
  tabIndex,
  disabled,
  onSelectionChanged,
  onClick,
}: ISelectItemProps) => {
  const itemRef: any = useRef();

  const onOptionCheck = (e) => {
    toggleChecked();
    e.preventDefault();
  };

  const toggleChecked = () => {
    if (!disabled) {
      onSelectionChanged(!checked);
    }
  };

  const handleClick = (e) => {
    toggleChecked();
    onClick(e);
  };

  useKey(["Enter", "Space"], onOptionCheck, { target: itemRef });

  return (
    <label
      className={cn(ItemContainer, "select-item", checked && "selected")}
      role="option"
      aria-selected={checked}
      tabIndex={tabIndex}
      ref={itemRef}
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
