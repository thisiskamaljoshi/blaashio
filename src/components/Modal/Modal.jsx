import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import PropTypes from "prop-types";

/**
 * Modal component for rendering content outside the normal DOM hierarchy.
 *
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.children - The content to render within the modal.
 * @returns {JSX.Element} The rendered JSX element.
 */

const Modal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.classList.add("modalMain");
  }

  useEffect(() => {
    const carouselRoot = document.getElementById("videoCarousel");

    if (carouselRoot && elRef.current) {
      carouselRoot.appendChild(elRef.current);
    }

    return () => {
      if (carouselRoot && elRef.current) {
        carouselRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return elRef.current ? createPortal(children, elRef.current) : null;
};

// Prop type validation
Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
