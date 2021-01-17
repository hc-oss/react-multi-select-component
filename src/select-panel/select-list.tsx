/**
 * This component represents an unadorned list of SelectItem (s).
 */
import { css } from "goober";
import React from "react";

import { useMultiSelect } from "../hooks/use-multi-select";
import { Option } from "../lib/interfaces";
import SelectItem from "./select-item";

interface ISelectListProps {
  focusIndex: number;
  options: Option[];
  onClick: Function;
}

const SelectListUl = css({
  margin: 0,
  paddingLeft: 0,
  li: {
    listStyle: "none",
    margin: 0,
  },
});

const skipIndex = 2;

const SelectList = ({ options, focusIndex, onClick }: ISelectListProps) => {
  const { disabled, value, onChange, ItemRenderer } = useMultiSelect();

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
    <ul className={SelectListUl}>
      {options.map((o: any, i) => {
        const tabIndex = i + skipIndex;

        return (
          <li key={o?.key || i}>
            <SelectItem
              focused={focusIndex === tabIndex}
              tabIndex={tabIndex}
              option={o}
              onSelectionChanged={(c) => handleSelectionChanged(o, c)}
              checked={value.find((s) => s.value === o.value) ? true : false}
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
