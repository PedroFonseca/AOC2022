import Puzzle from '../../types/AbstractPuzzle';

const allTreesBellowHeight = (trees: number[], maxHeight: number) => trees.every(height => height < maxHeight);

const getVerticalTreeLine = (treeMap: number[][], x: number) => treeMap.map(rows => rows[x]);

const getViewingDistance = (treeLine: number[], height: number) => {
  const indexTreeBlockingView = treeLine.findIndex(t => t >= height);
  return indexTreeBlockingView >= 0 ? indexTreeBlockingView + 1 : treeLine.length};

const isTreeVisible = (treeMap: number[][], x: number, y: number) => {
  // Edges
  if (x === 0 || x === treeMap[0].length -1 || y === 0 || y === treeMap.length - 1) {
    return true;
  }

  // Horizontal check
  if (allTreesBellowHeight(treeMap[y].slice(0, x), treeMap[y][x]) || allTreesBellowHeight(treeMap[y].slice(x + 1), treeMap[y][x])) {
    return true;
  }

  // Vertical check
  const verticalTreeLine = getVerticalTreeLine(treeMap, x);
  if (allTreesBellowHeight(verticalTreeLine.slice(0, y), treeMap[y][x]) || allTreesBellowHeight(verticalTreeLine.slice(y + 1), treeMap[y][x])) {
    return true;
  }
 
  return false;
}

const getScenicScore = (treeMap: number[][], x: number, y: number) => {
  const verticalTreeLine = getVerticalTreeLine(treeMap, x);
  const rightScore = getViewingDistance(treeMap[y].slice(x + 1), treeMap[y][x]);
  const leftScore = getViewingDistance(treeMap[y].slice(0, x).reverse(), treeMap[y][x]);
  const topScore = getViewingDistance(verticalTreeLine.slice(0, y).reverse(), treeMap[y][x]);
  const botScore = getViewingDistance(verticalTreeLine.slice(y + 1), treeMap[y][x]);
  return rightScore * leftScore * topScore * botScore;
}

export default class ConcretePuzzle extends Puzzle {
  private getMap(){
    return this.input.split('\r\n').map(t => [...t].map(Number))
  }
  public solveFirst(): string {
    const treeMap = this.getMap();
    const countVisibleTrees = treeMap.reduce((aggRows, rows, y) => aggRows + rows.reduce((aggCells, _, x) => aggCells + (isTreeVisible(treeMap, x, y) ? 1 : 0), 0), 0);
    return `${countVisibleTrees}`;
  }

  public getFirstExpectedResult(): string {
    return '21'; // 1763
  }

  public solveSecond(): string {
    const treeMap = this.getMap();
    const maxScenicScore = treeMap.reduce((aggRows, rows, y) => {
      const calcScenicScore = rows.reduce((aggCells, _, x) => {
        const scenicScore = getScenicScore(treeMap, x, y);
        return aggCells > scenicScore ? aggCells : scenicScore
      }, 0);
      return aggRows > calcScenicScore ? aggRows : calcScenicScore;
    }, 0);
    return `${maxScenicScore}`;
  }

  public getSecondExpectedResult(): string {
    return '8'; // 671160
  }
}
