# 🎛 Custom Value Renderer

Optionally customise value renderer view by passing `valueRenderer` prop

```js
const customValueRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => "✔️ " + label)
    : "😶 No Items Selected";
};
```

![Custom Value Renderer](/custom-value.gif)
F