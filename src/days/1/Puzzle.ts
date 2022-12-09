const getElfFoods = (input: string): string[] => {
  return `${input}\n`.split('\n');
};

export const solveFirst = (input: string): string => {
  const elfFoods = getElfFoods(input);
  const elfFoodsComputed = elfFoods.reduce(
    (agg, next) => {
      const foodCalories = next.trim();
      if (foodCalories.length === 0) {
        return {
          currentElfCalorieCount: 0,
          maxCalorieCount:
            agg.maxCalorieCount < agg.currentElfCalorieCount
              ? agg.currentElfCalorieCount
              : agg.maxCalorieCount,
        };
      }

      agg.currentElfCalorieCount += Number(foodCalories);
      return agg;
    },
    { currentElfCalorieCount: 0, maxCalorieCount: 0 }
  );

  return `${elfFoodsComputed.maxCalorieCount}`;
  // Solutions: 24000, 69281
};

export const solveSecond = (input: string): string => {
  const elfFoods = getElfFoods(input);
  const elfFoodsComputed = elfFoods.reduce(
    (agg, next) => {
      const foodCalories = next.trim();
      if (foodCalories.length === 0) {
        return {
          currentElfCalorieCount: 0,
          max3CalorieCount: [
            ...agg.max3CalorieCount,
            agg.currentElfCalorieCount,
          ]
            .sort((a, b) => b - a)
            .slice(0, 3),
        };
      }

      agg.currentElfCalorieCount += Number(foodCalories);
      return agg;
    },
    { currentElfCalorieCount: 0, max3CalorieCount: [0] }
  );

  return `${elfFoodsComputed.max3CalorieCount.reduce(
    (agg, calories) => agg + calories,
    0
  )}`;
  // Solutions: 45000, 201524
};
