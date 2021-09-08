import React, { useEffect, useMemo, useState } from "react";

import { injectStyles } from "../lib/inject-style";
import { ISelectProps, Option } from "../lib/interfaces";

const defaultStrings = {
  allItemsAreSelected: "All items are selected.",
  clearSearch: "Clear Search",
  clearSelected: "Clear Selected",
  noOptions: "No options",
  search: "Search",
  selectAll: "Select All",
  selectAllFiltered: "Select All (Filtered)",
  selectSomeItems: "Select...",
  create: "Create",
};

const defaultProps: Partial<ISelectProps> = {
  value: [],
  hasSelectAll: true,
  className: "multi-select",
  debounceDuration: 200,
  options: [] as Option[],
};

interface MultiSelectContextProps extends ISelectProps {
  t: (key: string) => string;
  setOptions?;
}

interface MultiSelectProviderProps {
  props: ISelectProps;
  children;
}

const MultiSelectContext = React.createContext<MultiSelectContextProps>(
  {} as MultiSelectContextProps
);

export const MultiSelectProvider = ({
  props,
  children,
}: MultiSelectProviderProps) => {
  const [options, setOptions] = useState(props.options);
  const t = (key) => props.overrideStrings?.[key] || defaultStrings[key];

  useMemo(() => injectStyles(), []);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  return (
    <MultiSelectContext.Provider
      value={{ t, ...defaultProps, ...props, options, setOptions }}
    >
      {children}
    </MultiSelectContext.Provider>
  );
};

export const useMultiSelect = () => React.useContext(MultiSelectContext);
