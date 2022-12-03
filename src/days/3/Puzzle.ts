import Puzzle from '../../types/AbstractPuzzle';

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

export default class ConcretePuzzle extends Puzzle {
  private getRucksacks() {
    return this.input.split('\n');
  }
  public solveFirst(): string {
    const repeatedLetters = this.getRucksacks()
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
  }

  public getFirstExpectedResult(): string {
    return '157';
  }

  public solveSecond(): string {
    const groups = [...groupElfs(this.getRucksacks())];
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
  }

  public getSecondExpectedResult(): string {
    return '70';
  }
}
