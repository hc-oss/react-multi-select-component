import React from "react";

import { useMultiSelect } from "../hooks/use-multi-select";

export const DropdownHeader = () => {
  const { t, value, options, valueRenderer } = useMultiSelect();

  const noneSelected = value.length === 0;
  const allSelected = value.length === options.length;
  const customText = valueRenderer && valueRenderer(value, options);

  const getSelectedText = () => value.map((s) => s.label).join(", ");

  return noneSelected ? (
    <span className="gray">{customText || t("selectSomeItems")}</span>
  ) : (
    <span>
      {customText ||
        (allSelected ? t("allItemsAreSelected") : getSelectedText())}
    </span>
  );
};
