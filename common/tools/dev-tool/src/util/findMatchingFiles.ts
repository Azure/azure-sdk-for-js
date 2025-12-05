// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { readdir, stat } from "node:fs/promises";
import type { Stats } from "node:fs";
import path from "node:path";
import { createPrinter } from "./printer";
import { shouldSkip } from "./samples/configuration";

const { debug, info: logInfo } = createPrinter("find-matching-files");

/**
 * File information used during breadth-first search
 *
 * In a collection of `FileInfo`, such as `FileInfo[]`, or `Set<FileInfo>`, all
 * FileInfo objects are considered to be relative to a common base directory.
 */
export interface FileInfo {
  /**
   * The directory part of the file name
   */
  dir: string;
  /**
   * A full path to the file relative to the base directory
   */
  fullPath: string;
  /**
   * The file's basename (does not include the directory part)
   */
  name: string;
  /**
   * File stats from the `fs.stat` Node API
   */
  stat: Stats;
  /**
   * Depth of this find.
   */
  depth: number;
}

/**
 * Options for {@link findMatchingFiles}
 */
export interface FindOptions {
  ignore: string[];
  skips: string[];
  maxDepth: number;
}

const defaultFindOptions: FindOptions = {
  ignore: [],
  skips: [],
  maxDepth: Number.MAX_SAFE_INTEGER,
};

/**
 * Breadth-first search for files matching a given predicate
 *
 * @param dir The root of the directory tree to search
 * @param matches Predicate that decides whether or not a file entry is included
 * @param options options bag for extra settings
 */
export async function* findMatchingFiles(
  dir: string,
  matches: (name: string, entry: Stats) => boolean,
  findOptions?: Partial<FindOptions>,
): AsyncGenerator<string> {
  const q: FileInfo[] = [];

  const options: FindOptions = { ...defaultFindOptions, ...findOptions };

  async function enqueueAll(dir: string, depth: number) {
    const files = await readdir(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      q.push({
        dir,
        fullPath,
        name: file,
        stat: await stat(fullPath),
        depth,
      });
    }
  }

  if (options.maxDepth > 0) {
    await enqueueAll(dir, 1);
  }

  while (q.length) {
    const info = q.shift() as FileInfo;

    if (options.ignore.includes(info.name)) {
      debug("Ignoring", info.fullPath);
      continue;
    }

    if (info.stat.isDirectory()) {
      if (info.depth < options.maxDepth) {
        await enqueueAll(info.fullPath, info.depth + 1);
      }
    } else if (shouldSkip(info, options.skips)) {
      logInfo(`Skipping ${info.fullPath} because it was configured to be skipped.`);
    } else if (matches(info.name, info.stat)) {
      yield info.fullPath;
    } else if (
      info.stat.isBlockDevice() ||
      info.stat.isCharacterDevice() ||
      info.stat.isFIFO() ||
      info.stat.isSocket() ||
      info.stat.isSymbolicLink()
    ) {
      debug("Encountered a special file in the sample tree. Skipping:", info.fullPath);
    }
  }
}
