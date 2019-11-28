import React from "react";

import getString from "../lib/get-string";

const DropdownHeader = ({
  selected,
  options,
  valueRenderer,
  overrideStrings
}) => {
  const noneSelected = selected.length === 0;
  const allSelected = selected.length === options.length;
  const customText = valueRenderer && valueRenderer(selected, options);

  const getSelectedText = () => {
    const selectedOptions = selected.map(s =>
      options.find((o: any) => o.value === s)
    );
    return selectedOptions.map((s: any) => (s ? s.label : "")).join(", ");
  };

  if (noneSelected) {
    return (
      <span className="gray">
        {customText || getString("selectSomeItems", overrideStrings)}
      </span>
    );
  }

  return (
    <span>
      {customText
        ? customText
        : allSelected
        ? getString("allItemsAreSelected", overrideStrings)
        : getSelectedText()}
    </span>
  );
};

export default DropdownHeader;
