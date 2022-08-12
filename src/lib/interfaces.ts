import { ReactNode } from "react";

export interface Option {
  value;
  label: string;
  key?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: Option[];
  value: Option[];
  onChange?;
  valueRenderer?: (selected: Option[], options: Option[]) => ReactNode;
  ItemRenderer?;
  ArrowRenderer?: ({ expanded }) => JSX.Element;
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
  isCreatable?: boolean;
  onCreateOption?;
  closeOnChangedValue?: boolean;
}
