const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const numberToLetter = (idx: number): string => {
  const exceeding = Math.floor(idx / ALPHABET.length);
  const rest = idx % ALPHABET.length;

  return exceeding >= 1
    ? `${numberToLetter(exceeding - 1)}${ALPHABET[rest]}`
    : ALPHABET[rest];
};
