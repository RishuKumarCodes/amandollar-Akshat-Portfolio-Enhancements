import React from "react";
import "../../styles/Button.css";

export function PrimaryButton({ children, ...props }) {
  return (
    <button className="shiny-cta" {...props}>
      <span>{children}</span>
    </button>
  );
}


export function SecondaryButton({ children, ...props }) {
    return (
        <button className="subtle-cta" {...props}>
        <div className="flex text-black dark:text-white items-center gap-3">{children}</div>
      </button>
    );
}
export default {PrimaryButton, SecondaryButton};