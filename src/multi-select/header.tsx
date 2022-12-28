import React, { useMemo } from "react";

import { useMultiSelect } from "../hooks/use-multi-select";

export const DropdownHeader = () => {
  const { t, value, options, valueRenderer } = useMultiSelect();

  const noneSelected = value.length === 0;
  const allSelected = value.length === options.length;
  const selectedText = valueRenderer
    ? valueRenderer(value, options)
    : "Text Undefined";

  const getSelectedText = useMemo(
    () => () => value.map((s) => s.label).join(", "),
    [value]
  );

  switch (true) {
    case noneSelected:
      return (
        <span className="gray">{selectedText || t("selectSomeItems")}</span>
      );
    case allSelected:
      return <span>{selectedText || t("allItemsAreSelected")}</span>;
    default:
      return <span>{selectedText || getSelectedText()}</span>;
  }
};
