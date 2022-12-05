import Puzzle from '../../types/AbstractPuzzle';

type Stacks = string[][];
type Procedure = {
  num: number;
  from: number;
  to: number;
};

const from = ' from ';
const fromLen = from.length;
const to = ' to ';
const toLen = to.length;

const executeProcedure1 = (stacks: Stacks, procedure: Procedure) => {
  for (let i = 0; i < procedure.num; i++) {
    stacks[procedure.to].push(stacks[procedure.from].pop());
  }
  return stacks;
};
const executeProcedure2 = (stacks: Stacks, procedure: Procedure) => {
  stacks[procedure.to] = [
    ...stacks[procedure.to],
    ...stacks[procedure.from].slice(-1 * procedure.num),
  ];
  stacks[procedure.from] = stacks[procedure.from].slice(0, -1 * procedure.num);

  return stacks;
};
const executeProcedures = (
  stacks: Stacks,
  procedures: Procedure[],
  execute: (stacks: Stacks, procedure: Procedure) => Stacks
) => {
  for (let i = 0; i < procedures.length; i++) {
    execute(stacks, procedures[i]);
  }
  return stacks;
};

export default class ConcretePuzzle extends Puzzle {
  private getStacks() {
    const stackStrings = this.input.split('\n\n')[0];
    const stacksReversed = stackStrings.split('\n').reverse();
    const stackNumbers = stacksReversed[0].replaceAll(' ', '');
    return [...stackNumbers].reduce((agg, position) => {
      const index = stacksReversed[0].indexOf(position);
      return [
        ...agg,
        stacksReversed
          .slice(1)
          .map((t) => t[index])
          .filter((t) => t !== ' '),
      ];
    }, []);
  }
  private getProcedures() {
    const procedureStrings = this.input
      .split('\n\n')[1]
      .split('\n')
      .map((t) => {
        const indexFrom = t.indexOf(from);
        const indexTo = t.indexOf(to);
        return {
          num: Number(t.substring(5, indexFrom)),
          from: Number(t.substring(indexFrom + fromLen, indexTo)) - 1,
          to: Number(t.substring(indexTo + toLen)) - 1,
        };
      });
    return procedureStrings;
  }
  public solveFirst(): string {
    const stacks = executeProcedures(
      this.getStacks(),
      this.getProcedures(),
      executeProcedure1
    );
    return stacks.map((t) => t.pop()).join('');
  }

  public getFirstExpectedResult(): string {
    return 'CMZ'; // TWSGQHNHL
  }

  public solveSecond(): string {
    const stacks = executeProcedures(
      this.getStacks(),
      this.getProcedures(),
      executeProcedure2
    );
    return stacks.map((t) => t.pop()).join('');
  }

  public getSecondExpectedResult(): string {
    return 'MCD'; // JNRSCDWPP
  }
}
