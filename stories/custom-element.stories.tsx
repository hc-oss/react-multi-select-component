import "./custom-element-story.css";

import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import React, { useState } from "react";

import MultiSelect from "../src/multi-select";
import { options } from "./constants";

export default {
  title: "Custom Element",
  decorators: [withKnobs],
};

export const ExampleWithStrings = () => {
  const [selected, setSelected] = useState<typeof options>([]);

  const valueRenderer = (selected: typeof options) => {
    if (!selected.length) {
      return "No Item Selected";
    }

    return selected.length === 1
      ? `${selected[0].label} 😶`
      : selected.map(({ label }) => "✔️ " + label);
  };

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        hasSelectAll={boolean("hasSelectAll", true)}
        isLoading={boolean("isLoading", false)}
        shouldToggleOnHover={boolean("shouldToggleOnHover", false)}
        disableSearch={boolean("disableSearch", false)}
        value={selected}
        disabled={boolean("disabled", false)}
        onChange={setSelected}
        valueRenderer={valueRenderer}
        labelledBy={text("labelledBy", "Select Fruits")}
        className={text("className", "multi-select")}
      />
    </div>
  );
};

ExampleWithStrings.story = {
  name: "With Strings",
};

export const ExampleWithReactNode = () => {
  const [selected, setSelected] = useState<typeof options>([]);

  const valueRenderer = (selected: typeof options) => {
    if (!selected.length) {
      return <button>Toggle Dropdown!</button>;
    }

    return selected.length === 1 ? (
      <button>{selected[0].label} 😶</button>
    ) : (
      selected.map(({ label }) => <button key={label}>✔️ {label}</button>)
    );
  };

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        hasSelectAll={boolean("hasSelectAll", true)}
        isLoading={boolean("isLoading", false)}
        shouldToggleOnHover={boolean("shouldToggleOnHover", false)}
        disableSearch={boolean("disableSearch", false)}
        value={selected}
        disabled={boolean("disabled", false)}
        onChange={setSelected}
        valueRenderer={valueRenderer}
        labelledBy={text("labelledBy", "Select Fruits")}
        className={text("className", "multi-select mso")}
      />
    </div>
  );
};

ExampleWithReactNode.story = {
  name: "With Element",
};
