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

export const CreatableCustomRole = () => {
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
                role={"checkbox"}
            />
        </div>
    );
};

CreatableCustomRole .story = {
    name: "Creatable custom role",
};
