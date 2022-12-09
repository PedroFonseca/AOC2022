type Section = {
  start: number;
  end: number;
};
const fullyContained = (section1: Section, section2: Section) =>
  section1.start <= section2.start && section1.end >= section2.end;

const partiallyContained = (section1: Section, section2: Section) =>
  (section1.start >= section2.start && section1.start <= section2.end) ||
  (section1.end >= section2.start && section1.end <= section2.end);

const getSections = (input: string) =>
  input.split('\n').map((t) =>
    t.split(',').map((t) => {
      const [start, end] = t.split('-').map(Number);
      return { start, end, length: end - start };
    })
  );

export const solveFirst = (input: string): string => {
  const contained = getSections(input).filter(
    ([section1, section2]) =>
      fullyContained(section1, section2) || fullyContained(section2, section1)
  );
  return `${contained.length}`;
  // Solutions: 2, 518
};

export const solveSecond = (input: string): string => {
  const contained = getSections(input).filter(
    ([section1, section2]) =>
      partiallyContained(section1, section2) ||
      partiallyContained(section2, section1)
  );
  return `${contained.length}`;
  // Solutions: 4, 909
};
