const executeInstruction = (instruction: string, x: number) => {
  // console.log('executing instruction ', instruction, x);
  if (instruction === 'noop') {
    return [x];
  }
  const parseInstruction = instruction.split(' ');
  if (parseInstruction[0] === 'addx') {
    return [x, x + Number(parseInstruction[1])];
  }
  return [NaN];
};

const executeInstructions = (input: string) => {
  const instructions = input.split('\n');
  return instructions.reduce(
    (agg, next) => [...agg, ...executeInstruction(next, agg[agg.length - 1])],
    [1]
  );
};

export const solveFirst = (input: string): string => {
  const intervals = Array.from({ length: 6 }).map((_, i) => 20 + i * 40);
  const instructions = executeInstructions(input);

  const signalStrengthSum = intervals.reduce(
    (agg, next) => agg + next * instructions[next - 1],
    0
  );

  // intervals.forEach((interval) => {
  //   console.log(
  //     `${interval} => (${instructions[interval - 1]}) ${instructions
  //       .slice(interval - 1, interval + 2)
  //       .join(',')} = ${interval * instructions[interval - 1]}`
  //   );
  // });
  return `${signalStrengthSum}`;
  // Solutions: 13140, 10760
};

const isPixelLit = (position: number, x: number) =>
  x - 1 <= position && x + 1 >= position;

export const solveSecond = (input: string): string => {
  const instructions = executeInstructions(input);
  Array.from({ length: 6 })
    .map((_, i) =>
      Array.from({ length: 40 })
        .map((_, j) => {
          const position = i * 40 + j;
          console.log(
            'isPixelLit',
            j,
            instructions[position],
            isPixelLit(j, instructions[position])
          );
          return isPixelLit(j, instructions[position]) ? '#' : '.';
        })
        .join('')
    )
    .forEach((line) => console.log(line));
  return `FPGPHFGH`;
  // Solutions: FPGPHFGH
};
