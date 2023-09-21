import React, { useEffect, useState, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

type props = {
  children: ReactNode;
};

const Modal = ({ children }: props) => {
  const elRef = useRef<HTMLDivElement | null>(null);

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

export default Modal;
