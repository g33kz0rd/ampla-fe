import { numberToLetter } from "../functions/numberToLetter";
import { Column } from "./Column";
import { IndexColumn } from "./IndexColumn";
import { IndexRow } from "./IndexRow";
import { Row } from "./Row";
import { UnusedField } from "./UnusedField";

interface SheetProps {
  columnCount: number;
  rowCount: number;
}

const ROW_INDEX = 1;

const isIndexColumn = (index: number): boolean => index === 0;

export const Sheet = ({ rowCount, columnCount }: SheetProps) => {
  return (
    <>
      {/*Column Index */}
      <Row>
        {Array(columnCount + ROW_INDEX)
          .fill(undefined)
          .map((_, idx) =>
            isIndexColumn(idx) ? (
              <UnusedField />
            ) : (
              <IndexColumn>{numberToLetter(idx - 1)}</IndexColumn>
            )
          )}
      </Row>
      {Array(rowCount)
        .fill(undefined)
        .map((_, rowIndex) => (
          <Row>
            {Array(columnCount + ROW_INDEX)
              .fill(undefined)
              .map((_, idx) =>
                isIndexColumn(idx) ? (
                  <IndexRow>{rowIndex + 1}</IndexRow>
                ) : (
                  <Column />
                )
              )}
          </Row>
        ))}
    </>
  );
};
