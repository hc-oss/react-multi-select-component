/**
 * A generic dropdown component.  It takes the children of the component
 * and hosts it in the component.  When the component is selected, it
 * drops-down the contentComponent and applies the contentProps.
 */
import { css } from "goober";
import React, { useEffect, useRef, useState } from "react";

import getString from "../lib/get-string";
import Cross from "../select-panel/cross";
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
  onMenuToggle?;
  ArrowRenderer?;
  ClearSelectedIcon?;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
}

const PanelContainer = css({
  position: "absolute",
  zIndex: 1,
  top: "100%",
  width: "100%",
  paddingTop: "8px",
  ".panel-content": {
    maxHeight: "300px",
    overflowY: "auto",
    borderRadius: "var(--rmsc-radius)",
    background: "var(--rmsc-bg)",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1)",
  },
});

const DropdownContainer = css({
  position: "relative",
  outline: 0,
  backgroundColor: "var(--rmsc-bg)",
  border: "1px solid var(--rmsc-border)",
  borderRadius: "var(--rmsc-radius)",
  "&:focus-within": {
    boxShadow: "var(--rmsc-main) 0 0 0 1px",
    borderColor: "var(--rmsc-main)",
  },
});

const DropdownHeading = css({
  position: "relative",
  padding: "0 var(--rmsc-p)",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "var(--rmsc-h)",
  cursor: "default",
  outline: 0,
  ".dropdown-heading-value": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
  },
});

const ClearSelectedButton = css({
  cursor: "pointer",
  background: "none",
  border: 0,
  padding: 0,
  display: "flex",
});

const Dropdown = ({
  children,
  contentComponent: ContentComponent,
  contentProps,
  isLoading,
  disabled,
  shouldToggleOnHover,
  labelledBy,
  onMenuToggle,
  ArrowRenderer,
  ClearSelectedIcon,
  defaultIsOpen,
  isOpen,
}: IDropdownProps) => {
  const [isInternalExpand, setIsInternalExpand] = useState(true);
  const [expanded, setExpanded] = useState(defaultIsOpen);
  const [hasFocus, setHasFocus] = useState(false);
  const FinalArrow = ArrowRenderer || Arrow;

  const wrapper: any = useRef();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onMenuToggle && onMenuToggle(expanded);
  }, [expanded]);

  useEffect(() => {
    if (defaultIsOpen === undefined && typeof isOpen === "boolean") {
      setIsInternalExpand(false);
      setExpanded(isOpen);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (isInternalExpand) {
      switch (e.which) {
        case 27: // Escape
        case 38: // Up Arrow
          setExpanded(false);
          wrapper?.current?.focus();
          break;
        case 32: // Space
        case 13: // Enter Key
        case 40: // Down Arrow
          setExpanded(true);
          break;
        default:
          return;
      }
    }
    e.preventDefault();
  };

  const handleHover = (iexpanded: boolean) => {
    isInternalExpand && shouldToggleOnHover && setExpanded(iexpanded);
  };

  const handleFocus = () => !hasFocus && setHasFocus(true);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && isInternalExpand) {
      setHasFocus(false);
      setExpanded(false);
    }
  };

  const handleMouseEnter = () => handleHover(true);

  const handleMouseLeave = () => handleHover(false);

  const toggleExpanded = () => {
    isInternalExpand && setExpanded(isLoading || disabled ? false : !expanded);
  };

  const handleClearSelected = (e) => {
    e.stopPropagation();
    contentProps["onChange"]([]);
    isInternalExpand && setExpanded(false);
  };

  return (
    <div
      tabIndex={0}
      className={`${DropdownContainer} dropdown-container`}
      aria-labelledby={labelledBy}
      aria-expanded={expanded}
      aria-readonly={true}
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
        {contentProps["value"].length > 0 && (
          <button
            type="button"
            className={`${ClearSelectedButton} clear-selected-button`}
            onClick={handleClearSelected}
            aria-label={getString(
              "clearSelected",
              contentProps["overrideStrings"]
            )}
          >
            {ClearSelectedIcon || <Cross />}
          </button>
        )}
        <FinalArrow expanded={expanded} />
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
