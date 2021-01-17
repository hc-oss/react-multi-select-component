import { css } from "goober";
import React from "react";

import { MultiSelectProvider } from "../hooks/use-multi-select";
import { cn } from "../lib/classnames";
import { ISelectProps } from "../lib/interfaces";
import Dropdown from "./dropdown";

const MultiSelectBox = css({
  "--rmscMain": "#4285f4",
  "--rmscHover": "#f1f3f5",
  "--rmscSelected": "#e2e6ea",
  "--rmscBorder": "#ccc",
  "--rmscGray": "#aaa",
  "--rmscBg": "#fff",
  "--rmscP": "10px",
  "--rmscRadius": "4px",
  "--rmscH": "38px",

  "*": {
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },
  ".gray": {
    color: "var(--rmsc-gray)",
  },
});

const MultiSelect = (props: ISelectProps) => (
  <MultiSelectProvider props={props}>
    <div className={cn(MultiSelectBox, props.className || "multi-select")}>
      <Dropdown />
    </div>
  </MultiSelectProvider>
);

export default MultiSelect;
