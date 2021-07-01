import { text, withKnobs } from "@storybook/addon-knobs";
import React, { useState } from "react";

import MultiSelect from "../src/multi-select";

export default {
  title: "Multiselect",
  decorators: [withKnobs],
};

const INITIAL_OPTIONS = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango", disabled: true },
  { label: "Strawberry 🍓", value: "strawberry" },
];

export const ExampleNewField = () => {
  
  function handleNewField(newVal) {
    setOptions([...options, {label: newVal, value: newVal.toLowerCase()}]);
  }

  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={text("labelledBy", "Select Fruits")}
        enableNewFields
        onNewField={handleNewField}
      />
    </div>
  );
};

ExampleNewField.story = {
  name: "New field",
};
