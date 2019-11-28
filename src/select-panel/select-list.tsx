/**
 * This component represents an unadorned list of SelectItem (s).
 */
import styled from "@emotion/styled";
import React from "react";

import { Option } from "../lib/interfaces";
import SelectItem from "./select-item";

interface ISelectListProps {
  focusIndex: number;
  ItemRenderer?: Function;
  options: object[];
  selected: object[];
  onChange: (selected: any) => void;
  onClick: Function;
  disabled?: boolean;
}

const SelectListUl = styled.ul`
  margin: 0;
  padding-left: 0;
  li {
    list-style: none;
  }
`;

const SelectList = ({
  selected,
  onChange,
  disabled,
  ItemRenderer,
  options,
  focusIndex,
  onClick
}: ISelectListProps) => {
  const handleSelectionChanged = (option: Option, checked: boolean) => {
    if (disabled) {
      return;
    }
    if (checked) {
      onChange([...selected, option.value]);
    } else {
      const index = selected.indexOf(option.value);
      const removed = [
        ...selected.slice(0, index),
        ...selected.slice(index + 1)
      ];
      onChange(removed);
    }
  };

  return (
    <SelectListUl>
      {options.map((o: any, i) => (
        <li key={o.hasOwnProperty("key") ? o.key : i}>
          <SelectItem
            focused={focusIndex === i}
            option={o}
            onSelectionChanged={c => handleSelectionChanged(o, c)}
            checked={selected.includes(o.value)}
            onClick={e => onClick(e, i)}
            itemRenderer={ItemRenderer}
            disabled={o.disabled || disabled}
          />
        </li>
      ))}
    </SelectListUl>
  );
};

export default SelectList;
