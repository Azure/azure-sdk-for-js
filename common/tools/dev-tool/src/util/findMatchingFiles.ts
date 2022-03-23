// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import fs from "fs-extra";
import path from "path";
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
  stat: fs.Stats;
}

/**
 * Options for {@link findMatchingFiles}
 */
export interface FindOptions {
  ignore: string[];
  skips: string[];
}

const defaultFindOptions: FindOptions = {
  ignore: [],
  skips: [],
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
  matches: (name: string, entry: fs.Stats) => boolean,
  findOptions?: Partial<FindOptions>
): AsyncGenerator<string> {
  const q: FileInfo[] = [];

  const options: FindOptions = { ...defaultFindOptions, ...findOptions };

  async function enqueueAll(dir: string) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      q.push({
        dir,
        fullPath,
        name: file,
        stat: await fs.stat(fullPath),
      });
    }
  }

  await enqueueAll(dir);

  while (q.length) {
    const info = q.shift() as FileInfo;

    if (options.ignore.includes(info.name)) {
      debug("Ignoring", info.fullPath);
      continue;
    }

    if (info.stat.isDirectory()) {
      await enqueueAll(info.fullPath);
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
