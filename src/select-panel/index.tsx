/**
 * This component represents the entire panel which gets dropped down when the
 * user selects the component.  It encapsulates the search filter, the
 * Select-all item, and the list of options.
 */
import { css } from "goober";
import React, { useCallback, useMemo, useState } from "react";

import { debounce } from "../lib/debounce";
import { filterOptions } from "../lib/fuzzy-match-utils";
import getString from "../lib/get-string";
import { Option } from "../lib/interfaces";
import Cross from "./cross";
import SelectItem from "./select-item";
import SelectList from "./select-list";

interface ISelectPanelProps {
  ItemRenderer?: Function;
  options: Option[];
  value: Option[];
  focusSearchOnOpen: boolean;
  selectAllLabel?: string;
  onChange: (selected: Option[]) => void;
  disabled?: boolean;
  disableSearch?: boolean;
  hasSelectAll: boolean;
  filterOptions?: (options: Option[], filter: string) => Option[];
  overrideStrings?: { [key: string]: string };
  ClearIcon?;
  debounceDuration?: number;
}

enum FocusType {
  SEARCH = -1,
  NONE = 1,
}

const SelectSearchContainer = css({
  width: "100%",
  position: "relative",
  borderBottom: "1px solid var(--rmsc-border)",
  input: {
    height: "var(--rmsc-h)",
    padding: "0 var(--rmsc-p)",
    width: "100%",
    outline: 0,
    border: 0,
  },
});

const SearchClearButton = css({
  cursor: "pointer",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  background: "none",
  border: 0,
  padding: "0 calc(var(--rmsc-p)/2)",
  "[hidden]": {
    display: "none",
  },
});

export const SelectPanel = (props: ISelectPanelProps) => {
  const {
    onChange,
    options,
    value,
    filterOptions: customFilterOptions,
    selectAllLabel,
    ItemRenderer,
    disabled,
    disableSearch,
    focusSearchOnOpen,
    hasSelectAll,
    overrideStrings,
    ClearIcon,
    debounceDuration,
  } = props;
  const [searchText, setSearchText] = useState("");
  const [searchTextForFilter, setSearchTextForFilter] = useState("");
  const [focusIndex, setFocusIndex] = useState(
    focusSearchOnOpen && !disableSearch ? FocusType.SEARCH : FocusType.NONE
  );
  const debouncedSearch = useCallback(
    debounce((query) => setSearchTextForFilter(query), debounceDuration),
    []
  );

  const selectAllOption = {
    label: selectAllLabel || getString("selectAll", overrideStrings),
    value: "",
  };

  const selectAllValues = (checked) => {
    const filteredValues = filteredOptions()
      .filter((o) => !o.disabled)
      .map((o) => o.value);

    if (checked) {
      const selectedValues = value.map((o) => o.value);
      const finalSelectedValues = [...selectedValues, ...filteredValues];

      return options.filter(({ value }) => finalSelectedValues.includes(value));
    }

    return value.filter((o) => !filteredValues.includes(o.value));
  };

  const selectAllChanged = (checked: boolean) => {
    const newOptions = selectAllValues(checked);
    onChange(newOptions);
  };

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
    setSearchText(e.target.value);
    setFocusIndex(FocusType.SEARCH);
  };

  const handleClear = () => {
    setSearchTextForFilter("");
    setSearchText("");
  };

  const handleItemClicked = (index: number) => setFocusIndex(index);

  const handleKeyDown = (e) => {
    switch (e.which) {
      case 38: // Up Arrow
        if (e.altKey) {
          return;
        }
        updateFocus(-1);
        break;
      case 40: // Down Arrow
        if (e.altKey) {
          return;
        }
        updateFocus(1);
        break;
      default:
        return;
    }
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSearchFocus = () => {
    setFocusIndex(FocusType.SEARCH);
  };

  const filteredOptions = () =>
    customFilterOptions
      ? customFilterOptions(options, searchTextForFilter)
      : filterOptions(options, searchTextForFilter);

  const updateFocus = (offset: number) => {
    let newFocus = focusIndex + offset;
    newFocus = Math.max(1, newFocus);
    newFocus = Math.min(newFocus, options.length);
    setFocusIndex(newFocus);
  };

  const [isAllOptionSelected, hasSelectableOptions] = useMemo(() => {
    const filteredOptionsList = filteredOptions().filter((o) => !o.disabled);
    return [
      filteredOptionsList.every(
        (o) => value.findIndex((v) => v.value === o.value) !== -1
      ),
      filteredOptionsList.length !== 0,
    ];
    // eslint-disable-next-line
  }, [searchText, value]);

  return (
    <div className="select-panel" role="listbox" onKeyDown={handleKeyDown}>
      {!disableSearch && (
        <div className={SelectSearchContainer}>
          <input
            autoFocus={focusSearchOnOpen}
            placeholder={getString("search", overrideStrings)}
            type="text"
            aria-describedby={getString("search", overrideStrings)}
            onKeyDown={(e) => e.stopPropagation()}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            value={searchText}
          />
          <button
            className={`${SearchClearButton} search-clear-button`}
            hidden={!searchText}
            onClick={handleClear}
            aria-label={getString("clearSearch", overrideStrings)}
          >
            {ClearIcon || <Cross />}
          </button>
        </div>
      )}

      {hasSelectAll && hasSelectableOptions && (
        <SelectItem
          focused={focusIndex === 1}
          tabIndex={1}
          checked={isAllOptionSelected}
          option={selectAllOption}
          onSelectionChanged={selectAllChanged}
          onClick={() => handleItemClicked(0)}
          itemRenderer={ItemRenderer}
          disabled={disabled}
        />
      )}

      <SelectList
        {...props}
        options={filteredOptions()}
        focusIndex={focusIndex}
        onClick={(_e, index) => handleItemClicked(index)}
        ItemRenderer={ItemRenderer}
        disabled={disabled}
      />
    </div>
  );
};

export default SelectPanel;
