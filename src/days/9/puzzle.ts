type Point = { x: number; y: number };
type Direction = 'U' | 'D' | 'L' | 'R';

const getPoint = (x: number, y: number): Point => ({ x, y });
// const print = (point: Point) => `[${point.x}, ${point.y}]`;

const getInstructions = (input: string): [Direction, number][] =>
  input.split('\n').map((t) => {
    const instruction = t.split(' ');
    return [instruction[0] as Direction, Number(instruction[1])];
  });

// Calculates new position of head
const moveHead = (headPosition: Point, direction: Direction): Point => {
  switch (direction) {
    case 'U':
      return getPoint(headPosition.x, headPosition.y + 1);
    case 'D':
      return getPoint(headPosition.x, headPosition.y - 1);
    case 'L':
      return getPoint(headPosition.x - 1, headPosition.y);
    case 'R':
      return getPoint(headPosition.x + 1, headPosition.y);
  }
};

// Calculates new position of tail
const moveKnot = (headPosition: Point, tailPosition: Point): Point => {
  // If it's already next to head, then don't move it
  if (
    Math.abs(headPosition.x - tailPosition.x) <= 1 &&
    Math.abs(headPosition.y - tailPosition.y) <= 1
  ) {
    return tailPosition;
  }
  // [-2,2] [0,0] => 1,1
  // If moved diagonally, then knot moves diagonally as well
  if (
    Math.abs(headPosition.x - tailPosition.x) > 1 &&
    Math.abs(headPosition.y - tailPosition.y) > 1
  ) {
    if (
      headPosition.x - tailPosition.x > 1 &&
      headPosition.y - tailPosition.y > 1
    ) {
      return getPoint(headPosition.x - 1, headPosition.y - 1);
    }
    if (
      tailPosition.x - headPosition.x > 1 &&
      tailPosition.y - headPosition.y > 1
    ) {
      return getPoint(headPosition.x + 1, headPosition.y + 1);
    }
    if (
      headPosition.x - tailPosition.x > 1 &&
      tailPosition.y - headPosition.y > 1
    ) {
      return getPoint(headPosition.x - 1, headPosition.y + 1);
    }
    if (
      tailPosition.x - headPosition.x > 1 &&
      headPosition.y - tailPosition.y > 1
    ) {
      return getPoint(headPosition.x + 1, headPosition.y - 1);
    }
  }
  // Move tail toward head
  if (headPosition.x - tailPosition.x > 1) {
    return getPoint(headPosition.x - 1, headPosition.y);
  }
  if (tailPosition.x - headPosition.x > 1) {
    return getPoint(headPosition.x + 1, headPosition.y);
  }
  if (headPosition.y - tailPosition.y > 1) {
    return getPoint(headPosition.x, headPosition.y - 1);
  }
  if (tailPosition.y - headPosition.y > 1) {
    return getPoint(headPosition.x, headPosition.y + 1);
  }

  throw new Error(
    `missing use case for followHead: ${headPosition} => ${tailPosition}`
  );
};

// const drawMapToConsole = (knotPositions: Point[]) => {
//   const mapSize = 10;
//   for (let i = mapSize; i > -mapSize; i--) {
//     let line = '';
//     for (let j = -mapSize; j < mapSize; j++) {
//       const index = knotPositions.findIndex((t) => t.x === j && t.y === i);
//       line +=
//         index < 0
//           ? i === 0 && j === 0
//             ? 's'
//             : '.'
//           : index === 0
//           ? 'H'
//           : index;
//     }
//     console.log(line, i);
//   }
// };

// const drawTailPositions = (tailPositions: Point[]) => {
//   const mapSize = 50;
//   for (let i = mapSize; i > -mapSize; i--) {
//     let line = '';
//     for (let j = -mapSize; j < mapSize; j++) {
//       const index = tailPositions.findIndex((t) => t.x === j && t.y === i);
//       line += index < 0 ? '.' : 'X';
//     }
//     console.log(line, i);
//   }
// };

type InstructionExecutionResult = {
  newKnotPositions: Point[];
  tailPositions: Point[];
};
const executeInstruction = (
  [direction, times]: [Direction, number],
  knotPositions: Point[]
) =>
  (Array.from({ length: times }) as undefined[]).reduce(
    (agg) => {
      const newKnotPositions = agg.newKnotPositions
        .slice(1)
        .reduce(
          (agg, position) => [...agg, moveKnot(agg[agg.length - 1], position)],
          [moveHead(agg.newKnotPositions[0], direction)]
        );
      const newTailPositions = [
        ...agg.tailPositions,
        newKnotPositions[newKnotPositions.length - 1],
      ];
      // console.log(`${direction} --> ${newKnotPositions.map(print).join(' ')}`);
      // drawMapToConsole(newKnotPositions);
      // console.log('knot positions: ', newKnotPositions.map(print).join(','));
      // console.log('newTailPositions: ', newTailPositions.map(print).join(','));

      return {
        newKnotPositions,
        tailPositions: newTailPositions,
      } as InstructionExecutionResult;
    },
    {
      newKnotPositions: knotPositions,
      tailPositions: [],
    } as InstructionExecutionResult
  );

const solveForNumberOfKnots = (input: string, numberOfKnots: number) => {
  const initialKnotPositions = Array.from({ length: numberOfKnots }).map((_) =>
    getPoint(0, 0)
  );
  const finalResult = getInstructions(input).reduce(
    (agg, instruction) => {
      const instructionResult = executeInstruction(
        instruction,
        agg.newKnotPositions
      );
      // console.log(`${instruction[0]}-${instruction[1]}`);
      // drawMapToConsole(instructionResult.newKnotPositions);
      // if (instructionResult.tailPositions.length > prevSize) {
      //   prevSize = instructionResult.tailPositions.length;
      //   drawTailPositions(instructionResult.tailPositions);
      // }
      const newTailPositions: Point[] = [
        ...agg.tailPositions,
        ...instructionResult.tailPositions,
      ];

      // console.log(
      //   `${instruction[0]} ${instruction[1]} tailPositions: `,
      //   [
      //     ...new Set(
      //       newTailPositions.map((position) => `${position.x},${position.y}`)
      //     ),
      //   ].join(' ')
      // );
      // console.log('tailPositions: ', newTailPositions.map(print).join(','));
      return {
        ...instructionResult,
        tailPositions: newTailPositions,
      };
    },
    {
      newKnotPositions: initialKnotPositions,
      tailPositions: [],
    } as InstructionExecutionResult
  );
  const uniqueTailPositions = new Set(
    finalResult.tailPositions.map((position) => `${position.x},${position.y}`)
  );

  // drawTailPositions(finalResult.tailPositions);

  return `${uniqueTailPositions.size}`;
};

export const solveFirst = (input: string): string => {
  return solveForNumberOfKnots(input, 2);
  // Solutions: 13, 5874
};

export const solveSecond = (input: string): string => {
  return solveForNumberOfKnots(input, 10);
  // Solutions: 36, 2467
};
