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
  options: Option[];
  value: Option[];
  onChange: (selected: Option[]) => void;
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
  value,
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
    onChange(
      checked
        ? [...value, option]
        : value.filter((o: any) => o.value !== option.value)
    );
  };

  return (
    <SelectListUl>
      {options.map((o: any, i) => (
        <li key={o.hasOwnProperty("key") ? o.key : i}>
          <SelectItem
            focused={focusIndex === i}
            option={o}
            onSelectionChanged={c => handleSelectionChanged(o, c)}
            checked={value.find(s => s.value === o.value) ? true : false}
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
