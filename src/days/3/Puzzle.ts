const letterACode = 'A'.charCodeAt(0);
const letteraCode = 'a'.charCodeAt(0);
const getItemValue = (letter: string) => {
  const letterCode = letter.charCodeAt(0);
  return (
    letterCode - (letterCode > letteraCode ? letteraCode : letterACode - 26) + 1
  );
};

function* groupElfs<T>(arr: T[]): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += 3) {
    yield arr.slice(i, i + 3);
  }
}

const getRucksacks = (input: string) => input.split('\n');

export const solveFirst = (input: string): string => {
  const repeatedLetters = getRucksacks(input)
    .map((t) => [t.substring(0, t.length / 2), t.substring(t.length / 2)])
    .map(([compartment1, compartment2]) =>
      [...compartment1].find((letter) => compartment2.indexOf(letter) >= 0)
    );
  const valueForEachLetter = repeatedLetters.map(getItemValue);
  const finalSumOfValues = valueForEachLetter.reduce(
    (agg, next) => agg + next,
    0
  );
  return `${finalSumOfValues}`;
  // Solutions: 157, 8233
};

export const solveSecond = (input: string): string => {
  const groups = [...groupElfs(getRucksacks(input))];
  const groupBadges = groups.map(([elf1, elf2, elf3]) =>
    [...elf1].find(
      (letter) => elf2.indexOf(letter) >= 0 && elf3.indexOf(letter) >= 0
    )
  );
  const valueForEachBadge = groupBadges.map(getItemValue);
  const finalSumOfValues = valueForEachBadge.reduce(
    (agg, next) => agg + next,
    0
  );
  return `${finalSumOfValues}`;
  // Solutions: 70, 2821
};
