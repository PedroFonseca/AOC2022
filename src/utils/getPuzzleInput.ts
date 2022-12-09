import readFile from './readFile';

export default async (puzzleName: string, useSample?: boolean) => {
  const puzzlePath = `src/days/${puzzleName}`;
  try {
    return await readFile(
      `${puzzlePath}/${useSample ? 'sample' : 'input'}.txt`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
