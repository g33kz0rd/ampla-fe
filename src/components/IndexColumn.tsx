import { ReactNode } from "react";

interface IndexColumnProps {
  children?: ReactNode;
}

export const IndexColumn = ({ children }: IndexColumnProps) => {
  return (
    <div
      style={{
        width: 150,
        height: 25,
        border: "solid",
        borderWidth: 1,
        background: "lightgrey",
      }}
    >
      {children}
    </div>
  );
};
