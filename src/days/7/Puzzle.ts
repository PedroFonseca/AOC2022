type Instruction = {
  command: string;
  results: string[];
};

// Doubly Linked List
type Directory = {
  rootDir?: Directory;
  parentDir?: Directory;
  name: string;
  path: string[];
  contents?: DirContent;
};

type File = {
  name: string;
  size: number;
};

type DirContent = { [name: string]: Directory | File };

const isDirectory = (content: Directory | File): content is Directory =>
  (content as File)?.size === undefined;

const getDirContent = (result: string, directory: Directory) => {
  const resultParts = result.split(' ');

  return {
    [resultParts[1]]:
      resultParts[0] === 'dir'
        ? ({
            rootDir: directory.rootDir ?? directory,
            parentDir: directory,
            name: resultParts[1],
            path: [...directory.path, directory.name],
          } as Directory)
        : ({
            name: resultParts[1],
            size: Number(resultParts[0]),
          } as File),
  };
};

const executeInstruction = (
  instruction: Instruction,
  directory: Directory
): Directory => {
  // go back to home dir
  if (instruction.command === '$ cd /') {
    return directory.rootDir ?? directory;
  }

  // go back one dir
  if (instruction.command === '$ cd ..') {
    return directory.parentDir ?? directory;
  }

  // Fill current directory contents
  if (instruction.command === '$ ls') {
    directory.contents = instruction.results.reduce(
      (agg, next) => ({
        ...agg,
        ...getDirContent(next, directory),
      }),
      {} as DirContent
    );
    return directory;
  }

  // Navigate directory
  if (instruction.command.startsWith('$ cd ')) {
    return directory.contents[instruction.command.substring(5)] as Directory;
  }

  console.warn('command not recognized: ', instruction.command);

  return directory;
};

const getInstructions = (input: string) =>
  input.split('\n').reduce((agg, next) => {
    if (next.startsWith('$')) {
      return [...agg, { command: next, results: [] }];
    }
    agg[agg.length - 1].results.push(next);
    return agg;
  }, [] as Instruction[]);

const getStructure = (instructions: Instruction[]) => {
  const rootDirectory = { name: '~', path: [], contents: {} } as Directory;

  instructions.reduce((directory, instruction) => {
    const newDirectory = executeInstruction(instruction, directory);
    return newDirectory;
  }, rootDirectory);

  return rootDirectory;
};

const getDirectorySizes = (input: string) => {
  const instructions = getInstructions(input);
  const directorySizes = {} as { [dirPath: string]: number };
  const getDiretorySize = (directory: Directory): number => {
    const directorySize = Object.values(directory.contents).reduce(
      (agg, next) =>
        agg + (isDirectory(next) ? getDiretorySize(next) : next.size),
      0
    );
    directorySizes[[...directory.path, directory.name].join('/')] =
      directorySize;
    return directorySize;
  };

  getDiretorySize(getStructure(instructions));
  return directorySizes;
};

export const solveFirst = (input: string): string => {
  return `${Object.entries(getDirectorySizes(input))
    .filter(([_path, size]) => size <= 100000)
    .reduce((agg, [_path, size]) => agg + size, 0)}`;
  // Solutions: 95437, 1325919
};

export const solveSecond = (input: string): string => {
  const directorySizes = getDirectorySizes(input);
  const freeSpace = 70000000 - directorySizes['~'];
  const enoughSpaceToDelete = Object.values(directorySizes).filter(
    (size) => freeSpace + size > 30000000
  );
  return `${enoughSpaceToDelete.sort((a, b) => a - b)[0]}`;
  // Solutions: 24933642, 2050735
};
