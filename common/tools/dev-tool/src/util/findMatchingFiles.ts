import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

/**
 * File information used during breadth-first search
 */
interface FileInfo {
  dir: string;
  fullPath: string;
  name: string;
  stat: fs.Stats;
}

export interface FindOptions {
  ignore: string[];
}

/**
 * Breadth-first search for files matching a given predicate
 *
 * @param dir The root of the sample tree to search
 * @param matches Predicate that decides whether or not a file entry is included
 */
export async function* findMatchingFiles(
  dir: string,
  matches: (name: string, entry: fs.Stats) => boolean,
  options?: Partial<FindOptions>
) {
  const q: FileInfo[] = [];

  const ignore = options?.ignore ?? [];

  async function enqueueAll(dir: string) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      q.push({
        dir,
        fullPath,
        name: file,
        stat: await fs.stat(fullPath)
      });
    }
  }

  await enqueueAll(dir);

  while (q.length) {
    const info = q.shift() as FileInfo;

    if (ignore.includes(info.name)) {
      console.warn(chalk.yellow("[run-samples] Ignoring", info.fullPath));
      continue;
    }

    if (info.stat.isDirectory()) {
      await enqueueAll(info.fullPath);
    } else if (matches(info.name, info.stat)) {
      yield info.fullPath;
    } else if (
      info.stat.isBlockDevice() ||
      info.stat.isCharacterDevice() ||
      info.stat.isFIFO() ||
      info.stat.isSocket() ||
      info.stat.isSymbolicLink()
    ) {
      console.warn(
        "[prep-samples] WARNING: Encountered a special file in the sample tree. Skipping:",
        info.fullPath
      );
    }
  }

  // The full trace of files visited by the iterator is returned and can be accessed using `iter.value`
  // once it is `done`, in case it is ever needed for debugging
  return q;
}

