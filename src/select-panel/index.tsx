/**
 * This component represents the entire panel which gets dropped down when the
 * user selects the component.  It encapsulates the search filter, the
 * Select-all item, and the list of options.
 */
import { css } from "goober";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useMultiSelect } from "../hooks/use-multi-select";
import { cn } from "../lib/classnames";
import { debounce } from "../lib/debounce";
import { filterOptions } from "../lib/fuzzy-match-utils";
import { Cross } from "./cross";
import SelectItem from "./select-item";
import SelectList from "./select-list";

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

const NoOptions = css({
  padding: "var(--rmsc-p)",
  textAlign: "center",
  color: "var(--rmsc-gray)",
});

const SelectPanel = () => {
  const {
    t,
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
    ClearIcon,
    debounceDuration,
  } = useMultiSelect();

  const searchInputRef = useRef<any>();
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTextForFilter, setSearchTextForFilter] = useState("");
  const [focusIndex, setFocusIndex] = useState(
    focusSearchOnOpen && !disableSearch ? FocusType.SEARCH : FocusType.NONE
  );
  const debouncedSearch = useCallback(
    debounce((query) => setSearchTextForFilter(query), debounceDuration),
    []
  );

  const selectAllOption = {
    label: selectAllLabel || t("selectAll"),
    value: "",
  };

  const selectAllValues = (checked) => {
    const filteredValues = filteredOptions
      .filter((o) => !o.disabled)
      .map((o) => o.value);

    if (checked) {
      const selectedValues = value.map((o) => o.value);
      const finalSelectedValues = [...selectedValues, ...filteredValues];

      return filteredOptions.filter((o) =>
        finalSelectedValues.includes(o.value)
      );
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
    searchInputRef?.current?.focus();
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

  const getFilteredOptions = async () =>
    customFilterOptions
      ? await customFilterOptions(options, searchTextForFilter)
      : filterOptions(options, searchTextForFilter);

  const updateFocus = (offset: number) => {
    let newFocus = focusIndex + offset;
    newFocus = Math.max(1, newFocus);
    newFocus = Math.min(newFocus, options.length + 1);
    setFocusIndex(newFocus);
  };

  const [isAllOptionSelected, hasSelectableOptions] = useMemo(() => {
    const filteredOptionsList = filteredOptions.filter((o) => !o.disabled);
    return [
      filteredOptionsList.every(
        (o) => value.findIndex((v) => v.value === o.value) !== -1
      ),
      filteredOptionsList.length !== 0,
    ];
    // eslint-disable-next-line
  }, [filteredOptions, value]);

  useEffect(() => {
    getFilteredOptions().then(setFilteredOptions);
  }, [searchTextForFilter, options]);

  return (
    <div className="select-panel" role="listbox" onKeyDown={handleKeyDown}>
      {!disableSearch && (
        <div className={SelectSearchContainer}>
          <input
            autoFocus={focusSearchOnOpen}
            placeholder={t("search")}
            type="text"
            aria-describedby={t("search")}
            onKeyDown={(e) => e.stopPropagation()}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            value={searchText}
            ref={searchInputRef}
          />
          <button
            type="button"
            className={cn(SearchClearButton, "search-clear-button")}
            hidden={!searchText}
            onClick={handleClear}
            aria-label={t("clearSearch")}
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
          onClick={() => handleItemClicked(1)}
          itemRenderer={ItemRenderer}
          disabled={disabled}
        />
      )}

      {filteredOptions.length ? (
        <SelectList
          options={filteredOptions}
          focusIndex={focusIndex}
          onClick={(_e, index) => handleItemClicked(index)}
        />
      ) : (
        <div className={cn(NoOptions, "no-options")}>{t("noOptions")}</div>
      )}
    </div>
  );
};

export default SelectPanel;
