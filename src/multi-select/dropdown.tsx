/**
 * A generic dropdown component.  It takes the children of the component
 * and hosts it in the component.  When the component is selected, it
 * drops-down the contentComponent and applies the contentProps.
 */
import styled from "@emotion/styled";
import useOutsideClick from "@rooks/use-outside-click";
import React, { useRef, useState } from "react";

import Arrow from "./arrow";
import Loading from "./loading";

interface IDropdownProps {
  children?;
  contentComponent;
  contentProps: object;
  isLoading?: boolean;
  disabled?: boolean;
  shouldToggleOnHover?: boolean;
  labelledBy?: string;
}

const PanelContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  width: 100%;
  padding-top: 8px;
  .panel-content {
    max-height: 300px;
    overflow-y: auto;
    border-radius: ${(props: any) => props.theme.borderRadius};
    background-color: ${(props: any) => props.theme.background};
    box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  outline: none;
  background: ${(props: any) => props.theme.background};
  border: 1px solid ${(props: any) => props.theme.border};
  border-radius: ${(props: any) => props.theme.borderRadius};
  box-sizing: border-box;
  &:focus-within {
    box-shadow: ${(props: any) => props.theme.primary} 0px 0px 0px 1px;
    border-color: ${(props: any) => props.theme.primary};
  }
  * {
    box-sizing: border-box;
    transition: all 0.2s ease;
  }
`;

const DropdownHeading = styled.div`
  position: relative;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
  height: ${(props: any) => props.theme.height};
  cursor: default;
  outline: none;
  .dropdown-heading-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
`;

const Dropdown = ({
  children,
  contentComponent: ContentComponent,
  contentProps,
  isLoading,
  disabled,
  shouldToggleOnHover,
  labelledBy
}: IDropdownProps) => {
  const [expanded, setExpanded] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const wrapper: any = useRef();

  useOutsideClick(wrapper, () => setExpanded(false));

  const handleKeyDown = e => {
    switch (e.which) {
      case 27: // Escape
      case 38: // Up Arrow
        setExpanded(false);
        break;
      case 13: // Enter Key
      case 40: // Down Arrow
        setExpanded(true);
        break;
      default:
        return;
    }
    e.preventDefault();
  };
  const handleHover = (iexpanded: boolean) => {
    shouldToggleOnHover && setExpanded(iexpanded);
  };
  const handleFocus = e => {
    e.target === wrapper && !hasFocus && setHasFocus(true);
  };
  const handleBlur = () => hasFocus && setHasFocus(false);
  const handleMouseEnter = () => handleHover(true);
  const handleMouseLeave = () => handleHover(false);
  const toggleExpanded = () => setExpanded(isLoading ? false : !expanded);

  return (
    <DropdownContainer
      className="dropdown"
      tabIndex={0}
      role="combobox"
      aria-labelledby={labelledBy}
      aria-expanded={expanded}
      aria-readonly="true"
      aria-disabled={disabled}
      ref={wrapper}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownHeading className="dropdown-heading" onClick={toggleExpanded}>
        <div className="dropdown-heading-value">{children}</div>
        {isLoading && <Loading />}
        <Arrow expanded={expanded} />
      </DropdownHeading>
      {expanded && (
        <PanelContainer className="dropdown-content">
          <div className="panel-content">
            <ContentComponent {...contentProps} />
          </div>
        </PanelContainer>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
