import { hasCircularDependency } from "../components/Sheet";
import { DB } from "../types/db";

describe("hasCircularDependency", () => {
  it("Adding a reference to a text field returns false", () => {
    const db: DB = {
      A1: "im some field text",
    };

    const result = hasCircularDependency(db, "=A1", ["A2"]);
    expect(result).toBeFalsy();
  });

  it("Adding a reference to self field returns true", () => {
    const db: DB = {
      A1: "im some field text",
    };

    const result = hasCircularDependency(db, "=A1", ["A1"]);
    expect(result).toBeTruthy();
  });

  it("Adding a reference to self field returns true", () => {
    const db: DB = {
      A1: "im some field text",
      A2: "=A1",
    };

    const result = hasCircularDependency(db, "=A2", ["A1"]);
    expect(result).toBeTruthy();
  });
});
