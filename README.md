# react-multi-select-component

Simple multiple selection dropdown component with `checkboxes`, `search` and `select-all`

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://react-multi-select-component.netlify.com)
[![GitHub Actions Status](https://github.com/harshzalavadiya/react-multi-select-component/workflows/NodeJS/badge.svg)](https://github.com/harshzalavadiya/react-multi-select-component/actions)
[![NPM](https://img.shields.io/npm/v/react-multi-select-component.svg)](https://npm.im/react-multi-select-component)
[![gzip](https://badgen.net/bundlephobia/minzip/react-multi-select-component)](https://bundlephobia.com/result?p=react-multi-select-component)

[![Edit react-multi-select-component-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/muddy-brook-322qc?fontsize=14&hidenavigation=1&theme=dark)

## ✨ Features

- 🍃 Lightweight (~14KB)
- 💅 Themeable
- ✌ Written w/ TypeScript

## 🔧 Installation

```bash
npm i react-multi-select-component    # npm
yarn add react-multi-select-component # yarn
```

## 📦 Example

![Example](preview.gif)

```tsx
import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";

const Example: React.FC = () => {
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" }
  ];

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        selected={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
  );
};

export default App;
```

## 👀 Props

| Prop                  | Description                       | Type               | Default |
| --------------------- | --------------------------------- | ------------------ | ------- |
| `labelledBy`          | value for `aria-labelledby`       | `string`           |         |
| `options`             | options for dropdown              | `[{label, value}]` |         |
| `selected`            | pre-selected rows                 | `[value]`          | `[]`    |
| `hasSelectAll`        | toggle 'Select All' option        | `boolean`          | `true`  |
| `isLoading`           | show spinner on select            | `boolean`          | `false` |
| `shouldToggleOnHover` | toggle dropdown on hover option   | `boolean`          | `false` |
| `overrideStrings`     | Override default strings for i18n | `object`           |         |
| `onChange`            | onChhange callback                | `function`         |         |
| `disabled`            | disable dropdown                  | `boolean`          | `false` |
| `selectAllLabel`      | _select all_ label                | `string`           |         |
| `disableSearch`       | hide search textbox               | `boolean`          | `false` |
| `filterOptions`       | custom filter options             | `function`         |         |
| `theme`               | theme variables                   | `object`           |         |

## 🌐 Internationalization

You can override the strings to be whatever you want, including translations for your languages.

```json
{
  "selectSomeItems": "Select...",
  "allItemsAreSelected": "All items are selected.",
  "selectAll": "Select All",
  "search": "Search"
}
```

## 💅 Themeing

You can override theme variables to change colors

```json
{
  "primary": "#4285F4",
  "hover": "#f1f3f5",
  "border": "#ccc",
  "gray": "#aaa",
  "background": "#fff",
  "borderRadius": "4px",
  "height": "38px"
}
```

## 🤠 Credits

- This project gets inspiration and several pieces of logical code from [react-multiple-select](https://github.com/Khan/react-multi-select/)
- [TypeScript](https://github.com/microsoft/typescript)
- [Rollup](https://github.com/rollup/rollup)
- [Emotion](https://github.com/emotion-js/emotion)

## 📜 License

MIT &copy; [harshzalavadiya](https://github.com/harshzalavadiya)
