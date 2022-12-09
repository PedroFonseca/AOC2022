type Point = { x: number; y: number };
type Direction = 'U' | 'D' | 'L' | 'R';

const getPoint = (x: number, y: number): Point => ({ x, y });
const print = (point: Point) => `[${point.x}, ${point.y}]`;

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
const moveTail = (headPosition: Point, tailPosition: Point): Point => {
  // If it's already next to head, then don't move it
  if (
    Math.abs(headPosition.x - tailPosition.x) <= 1 &&
    Math.abs(headPosition.y - tailPosition.y) <= 1
  ) {
    return tailPosition;
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

type InstructionExecutionResult = {
  newHeadPosition: Point;
  newTailPosition: Point;
  tailPositions: Point[];
};
const executeInstruction = (
  [direction, times]: [Direction, number],
  headPosition: Point,
  tailPosition: Point
) =>
  (Array.from({ length: times }) as undefined[]).reduce(
    (agg) => {
      const newHeadPosition = moveHead(agg.newHeadPosition, direction);
      const newTailPosition = moveTail(newHeadPosition, agg.newTailPosition);
      // console.log(
      //   `Moved direction ${direction}. Head: ${print(
      //     newHeadPosition
      //   )}, tail: ${print(newTailPosition)}`
      // );
      return {
        newHeadPosition,
        newTailPosition,
        tailPositions: [...agg.tailPositions, newTailPosition],
      } as InstructionExecutionResult;
    },
    {
      newHeadPosition: headPosition,
      newTailPosition: tailPosition,
      tailPositions: [],
    } as InstructionExecutionResult
  );

export const solveFirst = (input: string): string => {
  console.log(getInstructions(input));
  const finalResult = getInstructions(input).reduce(
    (agg, instruction) => {
      const instructionResult = executeInstruction(
        instruction,
        agg.newHeadPosition,
        agg.newTailPosition
      );
      return {
        ...instructionResult,
        tailPositions: [
          ...agg.tailPositions,
          ...instructionResult.tailPositions,
        ],
      };
    },
    {
      newHeadPosition: getPoint(0, 0),
      newTailPosition: getPoint(0, 0),
      tailPositions: [],
    } as InstructionExecutionResult
  );
  const uniqueTailPositions = new Set(
    finalResult.tailPositions.map((position) => `${position.x},${position.y}`)
  );

  return `${uniqueTailPositions.size}`;
  // Solutions: 13, 5874
};

export const solveSecond = (input: string): string => {
  return `solution 2 for input :`;
  // Solutions:
};
