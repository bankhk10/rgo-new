import {
  createElement,
  createRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import "@left4code/tw-starter/dist/js/dropdown";
import PropTypes from "prop-types";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useLocation } from "react-router-dom";

const init = (el, props) => {
  const dropdown = tailwind.Dropdown.getOrCreateInstance(el);
  setTimeout(() => {
    const isDropdownShowed = dom(el).find("[data-dropdown-replacer]").length;
    if (props.show && !isDropdownShowed) {
      dropdown.show();
    } else if (!props.show && isDropdownShowed) {
      dropdown.hide();
    }
  });

  if (el["__initiated"] === undefined) {
    el["__initiated"] = true;

    el.addEventListener("show.tw.dropdown", () => {
      props.onShow();
    });

    el.addEventListener("shown.tw.dropdown", () => {
      props.onShown();
    });

    el.addEventListener("hide.tw.dropdown", () => {
      props.onHide();
    });

    el.addEventListener("hidden.tw.dropdown", () => {
      props.onHidden();
    });
  }
};

const dropdownRefContext = createContext();

function Dropdown({
  show = false,
  placement = "bottom-end",
  onShow = () => {},
  onShown = () => {},
  onHide = () => {},
  onHidden = () => {},
  className = "",
  children,
}) {
  const dropdownRef = createRef();
  const dropdownRefTemp = createRef();
  const location = useLocation();

  useEffect(() => {
    dropdownRefTemp.current = dropdownRef.current;
    init(dropdownRef.current, {
      show,
      onShow,
      onShown,
      onHide,
      onHidden,
    });

    return () => {
      tailwind.Dropdown.getOrCreateInstance(dropdownRefTemp.current).hide();
    };
  }, [show, location]);

  return createElement(
    dropdownRefContext.Provider,
    {
      value: dropdownRef,
    },
    createElement(
      "div",
      {
        className: `dropdown ${className}`,
        ref: dropdownRef,
        "data-tw-placement": placement,
      },
      typeof children === "function"
        ? children({
            dismiss: () => {
              tailwind.Dropdown.getOrCreateInstance(dropdownRef.current).hide();
            },
          })
        : children
    )
  );
}

Dropdown.propTypes = {
  show: PropTypes.bool,
  placement: PropTypes.string,
  onShow: PropTypes.func,
  onShown: PropTypes.func,
  onHide: PropTypes.func,
  onHidden: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
};

function DropdownToggle({
  tag = "button",
  className = "",
  children,
  ...computedProps
}) {
  return createElement(
    tag,
    {
      ...computedProps,
      className: `dropdown-toggle cursor-pointer ${className}`,
      "aria-expanded": false,
      "data-tw-toggle": "dropdown",
    },
    children
  );
}

DropdownToggle.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

function DropdownMenu({ className = "", children }) {
  const dropdownRef = useContext(dropdownRefContext);
  const dropdownMenuRef = createRef();

  useEffect(() => {
    dom(dropdownMenuRef.current).appendTo(dropdownRef.current);
  }, [dropdownRef]);

  return createPortal(
    createElement(
      "div",
      {},
      createElement(
        "div",
        {
          className: `dropdown-menu ${className}`,
          ref: dropdownMenuRef,
        },
        children
      )
    ),
    dom("body")[0]
  );
}

DropdownMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

function DropdownContent({ tag = "ul", className = "", children }) {
  return createElement(
    tag,
    {
      className: `dropdown-content ${className}`,
    },
    children
  );
}

DropdownContent.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

function DropdownItem({
  tag = "a",
  className = "",
  children,
  ...computedProps
}) {
  return createElement(
    "li",
    {
      ...computedProps,
    },
    createElement(
      tag,
      {
        className: `dropdown-item cursor-pointer ${className}`,
      },
      children
    )
  );
}

DropdownItem.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

function DropdownHeader({
  tag = "h6",
  className = "",
  children,
  ...computedProps
}) {
  return createElement(
    "li",
    {
      ...computedProps,
    },
    createElement(
      tag,
      {
        className: `dropdown-header ${className}`,
      },
      children
    )
  );
}

DropdownHeader.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

function DropdownFooter({
  tag = "div",
  className = "",
  children,
  ...computedProps
}) {
  return createElement(
    "li",
    {
      ...computedProps,
    },
    createElement(
      tag,
      {
        className: `dropdown-footer ${className}`,
      },
      children
    )
  );
}

DropdownFooter.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

function DropdownDivider({ tag = "hr", className = "", children }) {
  return createElement(
    "li",
    {},
    createElement(
      tag,
      {
        className: `dropdown-divider ${className}`,
      },
      children
    )
  );
}

DropdownDivider.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

export {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownFooter,
  DropdownDivider,
};
