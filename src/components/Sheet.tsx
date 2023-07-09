import { numberToLetter } from "../functions/numberToLetter";
import { Field } from "./Field";
import { IndexColumn } from "./IndexColumn";
import { IndexRow } from "./IndexRow";
import { Row } from "./Row";
import { UnusedField } from "./UnusedField";
import { DB, FieldData } from "../types/db";

interface SheetProps {
  db: DB;
  onChange: (db: DB) => void;
  columnCount: number;
  rowCount: number;
}

const ROW_INDEX = 1;

const OFFSET = 1;

const getCurrentPosition = (rowIndex: number, columnIndex: number): string =>
  `${numberToLetter(columnIndex - OFFSET)}${rowIndex + OFFSET}`;

const getTargetField = (fieldData: FieldData): string => fieldData.slice(1);

const isIndexColumn = (index: number): boolean => index === 0;

const isReferenceToAnotherField = (fieldData: FieldData): boolean =>
  fieldData?.startsWith("=");

export const hasCircularDependency = (
  db: DB,
  field: string,
  stack: string[] = []
): boolean => {
  if (!isReferenceToAnotherField(field)) return false;

  const targetField = getTargetField(field);

  if (stack.includes(targetField)) return true;

  return hasCircularDependency(db, db[targetField], [...stack, targetField]);
};

export const Sheet = ({ rowCount, columnCount, db, onChange }: SheetProps) => {
  const handleFieldChange = (position: string, value?: string): boolean => {
    if (value) {
      const validChange = !hasCircularDependency(db, value, [position]);
      validChange
        ? onChange({ ...db, [position]: value })
        : alert("Error: Creating a circular dependency is not allowed");
      return validChange;
    } else if (db[position]) {
      const { [position]: _removed, ...rest } = db;
      onChange(rest);
    }
    return true;
  };

  const getFieldData = (position: string): FieldData | undefined => {
    const fieldData = db[position];

    if (isReferenceToAnotherField(fieldData))
      return getFieldData(getTargetField(fieldData));

    return db[position];
  };

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
