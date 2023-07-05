import { ReactNode } from "react";

interface RowProps {
  children: ReactNode[];
}

export const Row = ({ children }: RowProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "fit-content",
        border: "solid",
        borderWidth: 1,
      }}
    >
      {children}
    </div>
  );
};
