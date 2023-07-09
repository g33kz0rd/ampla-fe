import { useState } from "react";
import { numberToLetter } from "../functions/numberToLetter";
import { Field } from "./Field";
import { IndexColumn } from "./IndexColumn";
import { IndexRow } from "./IndexRow";
import { Row } from "./Row";
import { UnusedField } from "./UnusedField";
import { DB } from "../types/db";

interface SheetProps {
  columnCount: number;
  rowCount: number;
}

const ROW_INDEX = 1;

const isIndexColumn = (index: number): boolean => index === 0;

export const Sheet = ({ rowCount, columnCount }: SheetProps) => {
  const [db, setDB] = useState<DB>({});

  const handleFieldChange = (position: string, value?: string) => {
    if (value) setDB({ ...db, [position]: value });
  };

  const getCurrentPosition = (rowIndex: number, columnIndex: number): string =>
    `${rowIndex}-${numberToLetter(columnIndex)}`;

  return (
    <>
      {/*Column Index */}
      <Row>
        {Array(columnCount + ROW_INDEX)
          .fill(undefined)
          .map((_, columnIndex) =>
            isIndexColumn(columnIndex) ? (
              <UnusedField />
            ) : (
              <IndexColumn>{numberToLetter(columnIndex - 1)}</IndexColumn>
            )
          )}
      </Row>
      {Array(rowCount)
        .fill(undefined)
        .map((_, rowIndex) => (
          <Row>
            {Array(columnCount + ROW_INDEX)
              .fill(undefined)
              .map((_, columnIndex) => {
                const currentPosition = getCurrentPosition(
                  rowIndex,
                  columnIndex
                );

                return isIndexColumn(columnIndex) ? (
                  <IndexRow key={rowIndex + 1}>{rowIndex + 1}</IndexRow>
                ) : (
                  <Field
                    key={currentPosition}
                    onChange={(value) =>
                      handleFieldChange(currentPosition, value)
                    }
                    fieldData={db[currentPosition]}
                  />
                );
              })}
          </Row>
        ))}
    </>
  );
};
