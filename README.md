# react-multi-select-component

Simple and lightweight multiple selection dropdown component with `checkboxes`, `search` and `select-all`

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://react-multi-select-component.netlify.com)
[![GitHub Actions Status](https://github.com/harshzalavadiya/react-multi-select-component/workflows/NodeJS/badge.svg)](https://github.com/harshzalavadiya/react-multi-select-component/actions)
[![NPM](https://img.shields.io/npm/v/react-multi-select-component.svg)](https://npm.im/react-multi-select-component)
[![gzip](https://badgen.net/bundlephobia/minzip/react-multi-select-component@latest)](https://bundlephobia.com/result?p=react-multi-select-component@latest)

## ✨ Features

- 🍃 Lightweight (~4KB)
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
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
  );
};

export default Example;
```

## 👀 Props

| Prop                  | Description                        | Type                         | Default        |
| --------------------- | ---------------------------------- | ---------------------------- | -------------- |
| `labelledBy`          | value for `aria-labelledby`        | `string`                     |                |
| `options`             | options for dropdown               | `[{label, value, disabled}]` |                |
| `value`               | pre-selected rows                  | `[{label, value}]`           | `[]`           |
| `focusSearchOnOpen`   | focus on search input when opening | `boolean`                    | `true`         |
| `hasSelectAll`        | toggle 'Select All' option         | `boolean`                    | `true`         |
| `isLoading`           | show spinner on select             | `boolean`                    | `false`        |
| `shouldToggleOnHover` | toggle dropdown on hover option    | `boolean`                    | `false`        |
| `overrideStrings`     | Override default strings for i18n  | `object`                     |                |
| `onChange`            | onChange callback                  | `function`                   |                |
| `disabled`            | disable dropdown                   | `boolean`                    | `false`        |
| `selectAllLabel`      | _select all_ label                 | `string`                     |                |
| `disableSearch`       | hide search textbox                | `boolean`                    | `false`        |
| `filterOptions`       | custom filter options              | `function`                   | Fuzzy Search   |
| `className`           | class name for parent component    | `string`                     | `multi-select` |

### 🔍 Custom filter logic

By default this component uses fuzzy search algorithm to filter options but also allows you to opt-out and use your own logic if you want to below is the example doing just case insensitive search

```js
export function filterOptions(options, filter) {
  if (!filter) {
    return options;
  }
  const re = new RegExp(filter, "i");
  return options.filter(({ value }) => value && value.match(re));
}
```

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

You can override css variables to customize appearance

```css
.multi-select {
  --rmsc-primary: #4285f4;
  --rmsc-hover: #f1f3f5;
  --rmsc-selected: #e2e6ea;
  --rmsc-border: #ccc;
  --rmsc-gray: #aaa;
  --rmsc-background: #fff;
  --rmsc-spacing: 10px;
  --rmsc-border-radius: 4px;
  --rmsc-height: 38px;
}
```

## 🤠 Credits

- This project gets inspiration and several pieces of logical code from [react-multiple-select](https://github.com/Khan/react-multi-select/)
- [TypeScript](https://github.com/microsoft/typescript)
- [TSDX](https://github.com/jaredpalmer/tsdx)
- [Goober](https://github.com/cristianbote/goober)

## 📜 License

MIT &copy; [harshzalavadiya](https://github.com/harshzalavadiya)
