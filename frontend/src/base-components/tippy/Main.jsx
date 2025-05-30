import { createElement, createRef, useEffect } from "react";
import tippy, { roundArrow, animateFill } from "tippy.js";
import PropTypes from "prop-types";

const init = (el, props) => {
  tippy(el, {
    plugins: [animateFill],
    content: props.content,
    arrow: roundArrow,
    popperOptions: {
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
          },
        },
      ],
    },
    animateFill: false,
    animation: "shift-away",
    ...props.options,
  });
};

function Tippy({
  content = "",
  tag = "span",
  options = {},
  getRef = () => {},
  ...props
}) {
  const tippyRef = createRef();

  useEffect(() => {
    getRef(tippyRef.current);
    init(tippyRef.current, { content, options, ...props });
  }, [content, options, props]);

  return createElement(
    tag,
    {
      ...props,
      ref: tippyRef,
    },
    props.children
  );
}

Tippy.propTypes = {
  content: PropTypes.string,
  tag: PropTypes.string,
  options: PropTypes.object,
  getRef: PropTypes.func,
};

export default Tippy;
