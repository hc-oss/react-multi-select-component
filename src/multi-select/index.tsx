import "../style.css";

import React from "react";

import { MultiSelectProvider } from "../hooks/use-multi-select";
import { ISelectProps } from "../lib/interfaces";
import Dropdown from "./dropdown";

const MultiSelect = (props: ISelectProps) => (
  <MultiSelectProvider props={props}>
    <div className={`rmsc ${props.className || "multi-select"}`}>
      <Dropdown />
    </div>
  </MultiSelectProvider>
);

export default MultiSelect;
