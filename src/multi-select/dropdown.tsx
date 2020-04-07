/**
 * A generic dropdown component.  It takes the children of the component
 * and hosts it in the component.  When the component is selected, it
 * drops-down the contentComponent and applies the contentProps.
 */
import useOutsideClick from "@rooks/use-outside-click";
import { css } from "goober";
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

const PanelContainer = css`
  position: absolute;
  z-index: 1;
  top: 100%;
  width: 100%;
  padding-top: 8px;
  .panel-content {
    max-height: 300px;
    overflow-y: auto;
    border-radius: var(--rmsc-border-radius);
    background-color: var(--rmsc-background);
    box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
  }
`;

const DropdownContainer = css`
  position: relative;
  outline: none;
  background-color: var(--rmsc-background);
  border: 1px solid var(--rmsc-border);
  border-radius: var(--rmsc-border-radius);
  &:focus-within {
    box-shadow: var(--rmsc-primary) 0px 0px 0px 1px;
    border-color: var(--rmsc-primary);
  }
`;

const DropdownHeading = css`
  position: relative;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
  height: var(--rmsc-height);
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
  labelledBy,
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
    <div
      tabIndex={0}
      className={`${DropdownContainer} dropdown-container`}
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
      <div
        className={`${DropdownHeading} dropdown-heading`}
        onClick={toggleExpanded}
      >
        <div className="dropdown-heading-value">{children}</div>
        {isLoading && <Loading />}
        <Arrow expanded={expanded} />
      </div>
      {expanded && (
        <div className={`${PanelContainer} dropdown-content`}>
          <div className="panel-content">
            <ContentComponent {...contentProps} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
