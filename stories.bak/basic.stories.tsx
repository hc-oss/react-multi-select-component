import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import React, { useState } from "react";

import { MultiSelect } from "../dist/no-inject-style";
import { options } from "./constants";

export default {
  title: "Basic",
  decorators: [withKnobs],
};

export const ExampleDefault = () => {
  const [selected, setSelected] = useState([]);

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
        onMenuToggle={(s) => {
          console.debug("Select Toggle: ", s);
        }}
        labelledBy={text("labelledBy", "Select Fruits")}
        className={text("className", "multi-select")}
      />
    </div>
  );
};

ExampleDefault.story = {
  name: "Basic",
};
