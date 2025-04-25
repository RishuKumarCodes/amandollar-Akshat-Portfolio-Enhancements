import React, { createContext, useContext } from "react";
import { containerVariants, itemVariants } from "../variants";

const VariantsContext = createContext({
  container: containerVariants,
  item: itemVariants,
});

export function VariantsProvider({ children }) {
  return (
    <VariantsContext.Provider
      value={{
        container: containerVariants,
        item: itemVariants,
      }}
    >
      {children}
    </VariantsContext.Provider>
  );
}

// custom hook for consuming both variants
export function useVariants() {
  return useContext(VariantsContext);
}
