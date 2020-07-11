import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import React, { useState } from "react";

import MultiSelect from "../src/multi-select";

export default {
  title: "Multiselect",
  decorators: [withKnobs],
};

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  { label: "Watermelon 🍉", value: "watermelon" },
  { label: "Pear 🍐", value: "pear" },
  { label: "Apple 🍎", value: "apple" },
  { label: "Tangerine 🍊", value: "tangerine" },
  { label: "Pineapple 🍍", value: "pineapple" },
  { label: "Peach 🍑", value: "peach" },
];

export const ExampleDefault = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        focusSearchOnOpen={boolean("focusSearchOnOpen", true)}
        hasSelectAll={boolean("hasSelectAll", true)}
        isLoading={boolean("isLoading", false)}
        shouldToggleOnHover={boolean("shouldToggleOnHover", false)}
        disableSearch={boolean("disableSearch", false)}
        value={selected}
        disabled={boolean("disabled", false)}
        onChange={setSelected}
        onMenuToggle={(s) => {
          console.log("Select Toggle: ", s);
        }}
        labelledBy={text("labelledBy", "Select Fruits")}
        className={text("className", "multi-select")}
      />
    </div>
  );
};

ExampleDefault.story = {
  name: "Default",
};

export const ExampleDisabled = () => {
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango", disabled: true },
    { label: "Strawberry 🍓", value: "strawberry" },
  ];

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={text("labelledBy", "Select Fruits")}
      />
    </div>
  );
};

ExampleDisabled.story = {
  name: "Disabled",
};

export const ExampleCustomArrow = () => {
  const [selected, setSelected] = useState([]);

  const ArrowRenderer = ({ expanded }) => (expanded ? "🦉" : "🦚");

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={text("labelledBy", "Select Fruits")}
        ArrowRenderer={ArrowRenderer}
      />
    </div>
  );
};

ExampleCustomArrow.story = {
  name: "Arrow",
};
