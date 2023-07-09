import { CSSProperties, useState } from "react";
import { FieldData } from "../types/db";

interface FieldProps {
  onChange: (value?: string) => void;
  fieldData?: FieldData;
}

const containerStyle: CSSProperties = {
  width: 150,
  height: 25,
  border: "solid",
  borderWidth: 1,
  cursor: "text",
};

const inputStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  cursor: "text",
  outlineColor: "blue",
  boxSizing: "border-box",
};

export const Field = ({ fieldData, onChange }: FieldProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [content, setContent] = useState<string | undefined>(fieldData);
  const handleSelect = () => setSelected(true);

  return (
    <div style={containerStyle} onClick={handleSelect}>
      {selected ? (
        <input
          autoFocus
          style={inputStyle}
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => {
            setSelected(false);
            onChange(content);
          }}
        />
      ) : (
        fieldData
      )}
    </div>
  );
};
