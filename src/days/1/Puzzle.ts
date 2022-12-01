import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  private getElfFoods(): string[] {
    return `${this.input}\n`.split('\n');
  }

  public solveFirst(): string {
    const elfFoods = this.getElfFoods().reduce((agg, next) => {
    const foodCalories = next.trim();
    if (foodCalories.length === 0) 
    {
      return {
        currentElfCalorieCount: 0,
        maxCalorieCount: agg.maxCalorieCount < agg.currentElfCalorieCount ? agg.currentElfCalorieCount : agg.maxCalorieCount,
      }
    } 

    agg.currentElfCalorieCount += Number(foodCalories);
    return agg;
    }, { currentElfCalorieCount: 0, maxCalorieCount: 0});
    
    return `${elfFoods.maxCalorieCount}`;
  }

  public solveSecond(): string {
    const elfFoods = this.getElfFoods().reduce((agg, next) => {
      const foodCalories = next.trim();
      if (foodCalories.length === 0) 
      {
        return {
          currentElfCalorieCount: 0,
          max3CalorieCount: [...agg.max3CalorieCount, agg.currentElfCalorieCount].sort((a, b) => b - a).slice(0, 3)
        }
      } 
  
      agg.currentElfCalorieCount += Number(foodCalories);
      return agg;
      }, { currentElfCalorieCount: 0, max3CalorieCount: [0]});
      
      return `${elfFoods.max3CalorieCount.reduce((agg, calories) => agg+calories, 0)}`;
  }

  public getFirstExpectedResult(): string {
    return '24000';
  }
  public getSecondExpectedResult(): string {
    return '45000';
  }
}
