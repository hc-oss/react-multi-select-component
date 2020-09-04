export interface ITheme {
  primary: string;
  hover: string;
  border: string;
  gray: string;
  background: string;
  borderRadius: string;
  height: string;
}

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
  ArrowRenderer?: ({ expanded: boolean }) => void;
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
}
