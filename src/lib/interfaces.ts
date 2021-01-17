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
  valueRenderer?: (selected: Option[], options: Option[]) => string;
  ItemRenderer?: Function;
  ArrowRenderer?: ({ expanded }) => JSX.Element;
  selectAllLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  disableSearch?: boolean;
  shouldToggleOnHover?: boolean;
  hasSelectAll?: boolean;
  filterOptions?: (options: Option[], filter: string) => Option[];
  overrideStrings?: { [key: string]: string };
  labelledBy: string;
  className?: string;
  onMenuToggle?;
  ClearIcon?: string | Function;
  debounceDuration?: number;
  ClearSelectedIcon?: string | Function;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
}
