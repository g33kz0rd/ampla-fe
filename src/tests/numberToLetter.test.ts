import { numberToLetter } from "../functions/numberToLetter";

describe("numberToLetter", () => {
  it("works when one letter represtantion is needed", () => {
    const letter = numberToLetter(0);
    expect(letter).toBe("A");
  });

  it("number 25 is Z", () => {
    const letter = numberToLetter(25);
    expect(letter).toBe("Z");
  });

  it("works when two letters represtantion is needed", () => {
    const letter = numberToLetter(26);
    expect(letter).toBe("AA");
  });

  it("works when three letters represtantion is needed", () => {
    const letter = numberToLetter(702);
    expect(letter).toBe("AAA");
  });

  it("works when four letters represtantion is needed", () => {
    const letter = numberToLetter(18278);
    expect(letter).toBe("AAAA");
  });
});
