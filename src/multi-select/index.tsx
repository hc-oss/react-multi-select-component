import styled from "@emotion/styled";
import React from "react";

import Dropdown from "./dropdown";

import { ISelectProps } from "../lib/interfaces";
import SelectPanel from "../select-panel";
import DropdownThemeProvider from "../theme-provider";
import DropdownHeader from "./header";

const MultiSelectBox = styled.div`
  .gray {
    color: ${(props: any) => props.theme.gray};
  }
`;

const MultiSelect = ({
  focusSearchOnStart = true,
  hasSelectAll = true,
  shouldToggleOnHover = false,
  options,
  value,
  valueRenderer,
  overrideStrings,
  onChange,
  disabled,
  ItemRenderer,
  selectAllLabel,
  isLoading,
  disableSearch,
  filterOptions,
  labelledBy,
  theme
}: ISelectProps) => {
  const nvalue = value || [];
  return (
    <DropdownThemeProvider theme={theme}>
      <MultiSelectBox className="multi-select">
        <Dropdown
          isLoading={isLoading}
          contentComponent={SelectPanel}
          shouldToggleOnHover={shouldToggleOnHover}
          contentProps={{
            ItemRenderer,
            options,
            value: nvalue,
            hasSelectAll,
            selectAllLabel,
            onChange,
            disabled,
            disableSearch,
            focusSearchOnStart,
            filterOptions,
            overrideStrings
          }}
          disabled={disabled}
          labelledBy={labelledBy}
        >
          <DropdownHeader
            value={nvalue}
            options={options}
            valueRenderer={valueRenderer}
            overrideStrings={overrideStrings}
          />
        </Dropdown>
      </MultiSelectBox>
    </DropdownThemeProvider>
  );
};

export default MultiSelect;
