import { ReactNode } from "react";

interface IndexRowProps {
  children?: ReactNode;
}

export const IndexRow = ({ children }: IndexRowProps) => {
  return (
    <div
      style={{
        width: 25,
        height: 25,
        border: "solid",
        borderWidth: 1,
        background: "lightgrey",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};
