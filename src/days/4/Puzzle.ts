import Puzzle from '../../types/AbstractPuzzle';

type Section = {
  start: number;
  end: number;
};
const fullyContained = (section1: Section, section2: Section) =>
  section1.start <= section2.start && section1.end >= section2.end;
const partiallyContained = (section1: Section, section2: Section) =>
  (section1.start >= section2.start && section1.start <= section2.end) ||
  (section1.end >= section2.start && section1.end <= section2.end);

export default class ConcretePuzzle extends Puzzle {
  private getSections() {
    return this.input.split('\n').map((t) =>
      t.split(',').map((t) => {
        const [start, end] = t.split('-').map(Number);
        return { start, end, length: end - start };
      })
    );
  }
  public solveFirst(): string {
    const contained = this.getSections().filter(
      ([section1, section2]) =>
        fullyContained(section1, section2) || fullyContained(section2, section1)
    );
    return `${contained.length}`;
  }

  public getFirstExpectedResult(): string {
    return '2'; // 518
  }

  public solveSecond(): string {
    const contained = this.getSections().filter(
      ([section1, section2]) =>
        partiallyContained(section1, section2) ||
        partiallyContained(section2, section1)
    );
    return `${contained.length}`;
  }

  public getSecondExpectedResult(): string {
    return '4'; // 909
  }
}
