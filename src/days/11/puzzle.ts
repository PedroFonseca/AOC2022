type MonkeyStatus = {
  index: number;
  initialItems: bigint[];
  operation: (num: bigint) => bigint;
  ifDivisibleBy: bigint;
  trueThrowTo: number;
  falseThrowTo: number;

  inspectedItems: number;
};

const getOperation = ([firstStr, operator, secondStr]: string[]) => {
  const getHand = (str: string) => {
    const num = str === 'old' ? 0n : BigInt(str);
    return str === 'old' ? (num: bigint) => num : () => num;
  };
  const firstHand = getHand(firstStr);
  const secondHand = getHand(secondStr);
  switch (operator) {
    case '+':
      return (num: bigint) => firstHand(num) + secondHand(num);
    case '*':
      return (num: bigint) => firstHand(num) * secondHand(num);
  }
};
const getMonkeyFromInput = (monkeyInput: string): MonkeyStatus => {
  const inputLines = monkeyInput.split('\n');
  const index = Number(inputLines[0].substring(7, 8));
  const initialItems = inputLines[1].substring(18).split(', ').map(BigInt);
  const operation = getOperation(inputLines[2].substring(19).split(' '));
  const ifDivisibleBy = BigInt(inputLines[3].substring(21));
  const trueThrowTo = Number(inputLines[4].substring(29));
  const falseThrowTo = Number(inputLines[5].substring(30));
  return {
    index,
    initialItems,
    operation,
    ifDivisibleBy,
    trueThrowTo,
    falseThrowTo,
    inspectedItems: 0,
  };
};

const getInitialInput = (input: string) => {
  const monkeysInputs = input.split('\n\n');
  return monkeysInputs.map(getMonkeyFromInput);
};

const executeMonkeyTestEx1 = (
  itemWorryLevel: bigint,
  operation: (num: bigint) => bigint
) => operation(itemWorryLevel) / 3n;

const executeMonkeyTestEx2 = (
  itemWorryLevel: bigint,
  operation: (num: bigint) => bigint
): bigint => operation(itemWorryLevel);

const executeRound = (
  monkeys: MonkeyStatus[],
  monkeyItems: bigint[][],
  monkeyInspectionCount: number[],
  getNewWorryLevel: (
    itemWorryLevel: bigint,
    operation: (num: bigint) => bigint
  ) => bigint
): {
  itemWorryLevels: bigint[][];
  inspectedItems: number[];
} => {
  const newMonkeyItems = monkeys.reduce((newMonkeyItems, currentMonkey) => {
    // Increase number of inspections
    monkeyInspectionCount[currentMonkey.index] +=
      newMonkeyItems[currentMonkey.index].length;
    // Foreach item carried by the monkey
    newMonkeyItems[currentMonkey.index].forEach((itemWorryLevel) => {
      // Monkey inspection and relief effect
      const newWorryLevel = getNewWorryLevel(
        itemWorryLevel,
        currentMonkey.operation
      );

      // Monkey test
      if (newWorryLevel % currentMonkey.ifDivisibleBy === 0n) {
        newMonkeyItems[currentMonkey.trueThrowTo].push(newWorryLevel);
      } else {
        newMonkeyItems[currentMonkey.falseThrowTo].push(newWorryLevel);
      }
    });
    newMonkeyItems[currentMonkey.index] = [];
    return newMonkeyItems;

    // const currentMonkeyItems = monkeyItems[currentMonkey.index];
    // const execution = currentMonkeyItems.map((itemWorryLevel) =>
    //   executeMonkeyTest(itemWorryLevel, currentMonkey.operation)
    // );
    // const newItems = execution.reduce(
    //   (agg, nextItem) => {
    //     if (nextItem % currentMonkey.ifDivisibleBy === 0n) {
    //       agg[currentMonkey.trueThrowTo].push(nextItem);
    //     } else {
    //       agg[currentMonkey.falseThrowTo].push(nextItem);
    //     }
    //     return agg;
    //   },
    //   { [currentMonkey.trueThrowTo]: [], [currentMonkey.falseThrowTo]: [] } as {
    //     [key: number]: bigint[];
    //   }
    // );
    // const newItems = {
    //   [currentMonkey.trueThrowTo]: execution.filter(
    //     (t) => t % currentMonkey.ifDivisibleBy === 0n
    //   ),
    //   [currentMonkey.falseThrowTo]: execution.filter(
    //     (t) => t % currentMonkey.ifDivisibleBy !== 0n
    //   ),
    // } as { [key: number]: bigint[] };

    // console.log('newItems: ', execution, newItems);
    // return agg.map((monkey, i) => ({
    //   ...monkey,
    //   inspectedItems:
    //     monkey.inspectedItems +
    //     (i === currentMonkey.index ? monkey.items.length : 0),
    //   items:
    //     i === currentMonkey.index
    //       ? []
    //       : [...monkey.items, ...(newItems[i] ?? [])],
    // }));
  }, monkeyItems);
  return {
    itemWorryLevels: newMonkeyItems,
    inspectedItems: monkeyInspectionCount,
  };
};

export const solveFirst = (input: string): string => {
  const monkeys = getInitialInput(input);
  const resultAfter20Rounds = (
    Array.from({ length: 20 }) as undefined[]
  ).reduce(
    ({ itemWorryLevels, inspectedItems }) =>
      executeRound(
        monkeys,
        itemWorryLevels,
        inspectedItems,
        executeMonkeyTestEx1
      ),
    {
      itemWorryLevels: monkeys.map((monkey) => monkey.initialItems),
      inspectedItems: monkeys.map(() => 0),
    }
  );

  const inspectedItems = resultAfter20Rounds.inspectedItems
    .sort((a, b) => b - a)
    .slice(0, 2);
  return `${inspectedItems[0] * inspectedItems[1]}`;
  // Solutions: 10605, 107822
};

export const solveSecond = (input: string): string => {
  const monkeys = getInitialInput(input);
  const result = (Array.from({ length: 1000 }) as undefined[]).reduce(
    ({ itemWorryLevels, inspectedItems }, _, i) => {
      if (i % 100 === 0) {
        console.log('round:', i);
      }
      return executeRound(
        monkeys,
        itemWorryLevels,
        inspectedItems,
        executeMonkeyTestEx2
      );
    },
    {
      itemWorryLevels: monkeys.map((monkey) => monkey.initialItems),
      inspectedItems: monkeys.map(() => 0),
    }
  );
  // // printMonkeys(a);
  console.log('1', result.inspectedItems);
  const inspectedItems = result.inspectedItems
    .sort((a, b) => b - a)
    .slice(0, 2);
  console.log(inspectedItems);
  return `solution 2 for input :\n`;
  // Solutions:
};
