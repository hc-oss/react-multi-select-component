const strings = {
  selectSomeItems: "Select...",
  allItemsAreSelected: "All items are selected.",
  selectAll: "Select All",
  search: "Search",
  clearSearch: "Clear Search",
  clearSelected: "Clear Selected",
};

export default function getString(key: string, overrideStrings?): string {
  return overrideStrings?.[key] || strings[key];
}
