// Checks if all chars in string are different
const allDifferent = (chars: string) => {
  const countChars = [...chars].reduce(
    (agg, next) => ({ ...agg, [next]: 1 + (agg[next] ?? 0) }),
    {} as { [key: string]: number }
  );
  return Object.values(countChars).every((t) => t === 1);
};

const findAllDifferent = (input: string, len: number) =>
  [...input].findIndex(
    (t, index) =>
      index >= len && allDifferent(input.substring(index - len, index))
  );

export const solveFirst = (input: string): string => {
  return `${findAllDifferent(input, 4)}`;
  // Solutions: 10, 1142
};

export const solveSecond = (input: string): string => {
  return `${findAllDifferent(input, 14)}`;
  // Solutions: 29, 2803
};
