import getPuzzle from './utils/getPuzzle';
import getPuzzleInput from './utils/getPuzzleInput';

const args = process.argv.slice(2);
const dayToSolve = args[0];
const useSample = args[1]?.length > 0;

if (!dayToSolve) {
  console.error('No day specified run with npm run dev {day}');
  process.exit(1);
}
console.log(`Solving Day #${dayToSolve}`);
(async () => {
  const input = await getPuzzleInput(dayToSolve, useSample);
  const puzzle = await getPuzzle(dayToSolve);
  console.log(puzzle.solveFirst(input));
  console.log(puzzle.solveSecond(input));
})();
