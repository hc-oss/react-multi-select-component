/**
 * This component represents an unadorned list of SelectItem (s).
 */
import React from "react";

import { useMultiSelect } from "../hooks/use-multi-select";
import { Option } from "../lib/interfaces";
import SelectItem from "./select-item";

interface ISelectListProps {
  options: Option[];
  onClick: Function;
  skipIndex: number;
}

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
    <>
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
    </>
  );
};

export default SelectList;
