import React from "react";

import getString from "../lib/get-string";

const DropdownHeader = ({ value, options, valueRenderer, overrideStrings }) => {
  const noneSelected = value.length === 0;
  const allSelected = value.length === options.length;
  const customText = valueRenderer && valueRenderer(value, options);

  const getSelectedText = () => value.map((s) => s.label).join(", ");

  return noneSelected ? (
    <span className="gray">
      {customText || getString("selectSomeItems", overrideStrings)}
    </span>
  ) : (
    <span>
      {customText ||
        (allSelected
          ? getString("allItemsAreSelected", overrideStrings)
          : getSelectedText())}
    </span>
  );
};

export default DropdownHeader;
