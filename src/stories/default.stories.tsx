import "./style.css";

import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import React, { useState } from "react";

import MultiSelect from "../multi-select";

export default {
  title: "Multiselect",
  decorators: [withKnobs]
};

export const toStorybook = () => {
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" }
  ];

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
        labelledBy={text("labelledBy", "Select Fruits")}
      />
    </div>
  );
};

toStorybook.story = {
  name: "default"
};
