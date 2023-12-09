import { text, withKnobs } from "@storybook/addon-knobs";
import React, { useState } from "react";

import MultiSelect from "../src/multi-select";

export default {
  title: "Custom Filter",
  decorators: [withKnobs],
};

const customFilterOptions = async (_options, filter) => {
  const opts = await fetch(`https://swapi.dev/api/people/?search=${filter}`)
    .then((r) => r.json())
    .then(({ results }) =>
      results.map(({ name: label }) => ({ label, value: label }))
    );
  return opts;
};

export const ExampleCustomFilter = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={[]}
        value={selected}
        onChange={setSelected}
        filterOptions={customFilterOptions}
        labelledBy={text("labelledBy", "Select Fruits")}
      />
    </div>
  );
};

ExampleCustomFilter.story = {
  name: "External Search Async",
};
