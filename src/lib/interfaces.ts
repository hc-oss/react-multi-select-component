export interface ITheme {
  primary: string;
  border: string;
  [key: string]: any;
}

export interface Option {
  value;
  label: string;
  key?: string;
  disabled?: boolean;
}

export interface IStyledProps {
  theme?: ITheme;
}

export interface ISelectProps {
  options: Option[];
  selected: Option[];
  onChange?;
  valueRenderer?: (selected: Option[], options: Option[]) => string;
  ItemRenderer?: Function;
  selectAllLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  disableSearch?: boolean;
  shouldToggleOnHover?: boolean;
  hasSelectAll?: boolean;
  filterOptions?: (options: Option[], filter: string) => Option[];
  overrideStrings?: { [key: string]: string };
  labelledBy: string;
  theme?: ITheme;
}
