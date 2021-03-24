import { ReactNode } from "react";

export interface Option {
  value;
  label: string;
  key?: string;
  disabled?: boolean;
}

export interface ISelectProps {
  options: Option[];
  value: Option[];
  focusSearchOnOpen?: boolean;
  onChange?;
  valueRenderer?: (selected: Option[], options: Option[]) => ReactNode;
  ItemRenderer?: Function;
  ArrowRenderer?: ({ expanded }) => JSX.Element;
  selectAllLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  disableSearch?: boolean;
  shouldToggleOnHover?: boolean;
  hasSelectAll?: boolean;
  filterOptions?: (
    options: Option[],
    filter: string
  ) => Promise<Option[]> | Option[];
  overrideStrings?: { [key: string]: string };
  labelledBy: string;
  className?: string;
  onMenuToggle?;
  ClearIcon?: ReactNode;
  debounceDuration?: number;
  ClearSelectedIcon?: ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
}
