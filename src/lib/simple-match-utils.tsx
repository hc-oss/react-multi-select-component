import { Option } from "./interfaces";

export function filterOptions(options: Option[], filter?: string): Option[] {
  // If the filter is blank, return the full list of Options.
  if (!filter) {
    return options;
  }

  // Simple sub-string match
  return options.filter(
    ({ label, value }) =>
      label != null &&
      value != null &&
      label.toLowerCase().includes(filter.toLowerCase())
  );
}
