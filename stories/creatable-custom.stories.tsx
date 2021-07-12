import { text, withKnobs } from "@storybook/addon-knobs";
import React, { useState } from "react";

import MultiSelect from "../src/multi-select";

export default {
  title: "Creatable",
  decorators: [withKnobs],
};

const INITIAL_OPTIONS = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango", disabled: true },
  { label: "Strawberry 🍓", value: "strawberry" },
];

export const CreatableCustom = () => {
  /**
   * overrides default `onCreateOption` allows you to modify newly added option
   */
  const handleNewField = (value) => ({
    label: value,
    value: value.toUpperCase(),
  });

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>

      <MultiSelect
        options={INITIAL_OPTIONS}
        value={selected}
        onChange={setSelected}
        labelledBy={text("labelledBy", "Select Fruits")}
        isCreatable={true}
        onCreateOption={handleNewField} // <--
      />
    </div>
  );
};

CreatableCustom.story = {
  name: "Creatable Custom onCreateOption",
};
