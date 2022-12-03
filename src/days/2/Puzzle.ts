import Puzzle from '../../types/AbstractPuzzle';
type column1 = 'A' | 'B' | 'C';
type column2 = 'X' | 'Y' | 'Z';

// Rock: A and X
// Paper: B and Y
// Scissors: C and Z
const conversion = {
  X: 'A' as column1,
  Y: 'B' as column1,
  Z: 'C' as column1,
};

// Each row details winning and looses for each one. Example:
// Row1 => Rock wins against Scissors and looses to Paper
const winningMoves = {
  A: { wins: 'C' as column1, looses: 'B' as column1 },
  B: { wins: 'A' as column1, looses: 'C' as column1 },
  C: { wins: 'B' as column1, looses: 'A' as column1 },
};

const getShapeScore = (shape: column1) =>
  shape === 'A' ? 1 : shape === 'B' ? 2 : 3;

const getVictoryScore = (shape1: column1, shape2: column1) => {
  if (shape1 === shape2) {
    return 3;
  }

  return winningMoves[shape2].wins === shape1 ? 6 : 0;
};

// Loose: X scores 0
// Draw: Y scores 3
// Win: Z scores 6
const getVictoryScore2 = (outcome: string) =>
  outcome === 'X' ? 0 : outcome === 'Y' ? 3 : 6;

const getNeededShape = (shape1: column1, outcome: column2): column1 => {
  if (outcome === 'Y') {
    return shape1;
  }
  return outcome === 'Z'
    ? winningMoves[shape1].looses
    : winningMoves[shape1].wins;
};

export default class ConcretePuzzle extends Puzzle {
  private getElfStrategy() {
    return this.input
      .split('\n')
      .map((t) => t.split(' ') as [column1, column2]);
  }

  public solveFirst(): string {
    const getScore = (col1: column1, col2: column2) =>
      getShapeScore(conversion[col2]) + getVictoryScore(col1, conversion[col2]);

    return `${this.getElfStrategy().reduce(
      (agg, [col1, col2]) => agg + getScore(col1, col2),
      0
    )}`;
  }

  public getFirstExpectedResult(): string {
    return '15';
  }

  public solveSecond(): string {
    const getScore = (col1: column1, col2: column2) =>
      getShapeScore(getNeededShape(col1, col2)) + getVictoryScore2(col2);

    return `${this.getElfStrategy().reduce(
      (agg, [col1, col2]) => agg + getScore(col1, col2),
      0
    )}`;
  }

  public getSecondExpectedResult(): string {
    return '12';
  }
}
