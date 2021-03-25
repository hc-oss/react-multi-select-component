/**
 * This component represents an unadorned list of SelectItem (s).
 */
import { css } from "goober";
import React from "react";

import { useMultiSelect } from "../hooks/use-multi-select";
import { Option } from "../lib/interfaces";
import SelectItem from "./select-item";

interface ISelectListProps {
  options: Option[];
  onClick: Function;
  skipIndex: number;
}

const SelectListUl = css({
  margin: 0,
  paddingLeft: 0,
  li: {
    listStyle: "none",
    margin: 0,
  },
});

const SelectList = ({ options, onClick, skipIndex }: ISelectListProps) => {
  const { disabled, value, onChange, ItemRenderer } = useMultiSelect();

  const handleSelectionChanged = (option: Option, checked: boolean) => {
    if (disabled) return;

    onChange(
      checked
        ? [...value, option]
        : value.filter((o: any) => o.value !== option.value)
    );
  };

  return (
    <ul className={SelectListUl}>
      {options.map((o: any, i) => {
        const tabIndex = i + skipIndex;

        return (
          <li key={o?.key || i}>
            <SelectItem
              tabIndex={tabIndex}
              option={o}
              onSelectionChanged={(c) => handleSelectionChanged(o, c)}
              checked={!!value.find((s) => s.value === o.value)}
              onClick={(e) => onClick(e, tabIndex)}
              itemRenderer={ItemRenderer}
              disabled={o.disabled || disabled}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SelectList;
