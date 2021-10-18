import React from "react";
import { createContext } from "react";
import styles from "../style.css";

let styleElement: HTMLStyleElement | undefined;

interface StyleContext {
  container: HTMLElement;
}
const defaultStyleContext = { container: document.head };

export const MultiSelectStyleContext =
  createContext<StyleContext>(defaultStyleContext);

export const MultiSelectStyleProvider: React.FC<StyleContext> = (props) => {
  return (
    <MultiSelectStyleContext.Provider value={props}>
      {props.children}
    </MultiSelectStyleContext.Provider>
  );
};

export const injectStyles = (props: StyleContext) => {
  const options = { ...defaultStyleContext, ...props };

  if (typeof document !== "undefined" && !styleElement) {
    styleElement = document.createElement("style");
    styleElement.innerHTML = styles;

    options.container.appendChild(styleElement);
  }
};
