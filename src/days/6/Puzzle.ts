import Puzzle from '../../types/AbstractPuzzle';

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

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    return `${findAllDifferent(this.input, 4)}`;
  }

  public getFirstExpectedResult(): string {
    return '10'; // 1142
  }

  public solveSecond(): string {
    return `${findAllDifferent(this.input, 14)}`;
  }

  public getSecondExpectedResult(): string {
    return '29'; // 2803
  }
}
