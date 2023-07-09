import { useState } from "react";
import { numberToLetter } from "../functions/numberToLetter";
import { Field } from "./Field";
import { IndexColumn } from "./IndexColumn";
import { IndexRow } from "./IndexRow";
import { Row } from "./Row";
import { UnusedField } from "./UnusedField";
import { DB, FieldData } from "../types/db";

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
    `${numberToLetter(columnIndex - OFFSET)}${rowIndex + OFFSET}`;

  const getFieldData = (position: string): FieldData | undefined => {
    const fieldData = db[position];

    if (fieldData?.startsWith("=")) return getFieldData(fieldData.slice(1));

    return db[position];
  };

  const OFFSET = 1;

  return (
    <>
      {/*Column Index */}
      <Row>
        {Array(columnCount + ROW_INDEX)
          .fill(undefined)
          .map((_, columnIndex) =>
            isIndexColumn(columnIndex) ? (
              <UnusedField key={columnIndex} />
            ) : (
              <IndexColumn key={columnIndex}>
                {numberToLetter(columnIndex - OFFSET)}
              </IndexColumn>
            )
          )}
      </Row>
      {Array(rowCount)
        .fill(undefined)
        .map((_, rowIndex) => (
          <Row key={rowIndex}>
            {Array(columnCount + ROW_INDEX)
              .fill(undefined)
              .map((_, columnIndex) => {
                const currentPosition = getCurrentPosition(
                  rowIndex,
                  columnIndex
                );

                return isIndexColumn(columnIndex) ? (
                  <IndexRow key={rowIndex + OFFSET}>
                    {rowIndex + OFFSET}
                  </IndexRow>
                ) : (
                  <Field
                    key={currentPosition}
                    onChange={(value) =>
                      handleFieldChange(currentPosition, value)
                    }
                    fieldData={getFieldData(currentPosition)}
                  />
                );
              })}
          </Row>
        ))}
    </>
  );
};
