import React from "react";

import { ISelectProps, Option } from "../lib/interfaces";

const defaultStrings = {
  allItemsAreSelected: "All items are selected.",
  clearSearch: "Clear Search",
  clearSelected: "Clear Selected",
  noOptions: "No options",
  search: "Search",
  selectAll: "Select All",
  selectSomeItems: "Select...",
};

const defaultProps: Partial<ISelectProps> = {
  value: [],
  focusSearchOnOpen: true,
  hasSelectAll: true,
  className: "multi-select",
  debounceDuration: 200,
  options: [] as Option[],
};

interface MultiSelectContextProps extends ISelectProps {
  t: (key: string) => string;
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
  const t = (key) => props.overrideStrings?.[key] || defaultStrings[key];

  return (
    <MultiSelectContext.Provider value={{ t, ...defaultProps, ...props }}>
      {children}
    </MultiSelectContext.Provider>
  );
};

export const useMultiSelect = () => React.useContext(MultiSelectContext);
