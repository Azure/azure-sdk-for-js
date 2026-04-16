// Copyright (c) Microsoft Corporation
// Licensed under the MIT License.

import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createPrinter } from "./printer";
import * as git from "./git";

const { debug, warn } = createPrinter("fileTree");

/**
 * Provides a way to instantiate a file within a base path.
 *
 * Note that the factory is NOT guaranteed to run in one shot (i.e. it may fail
 * partially and leave your directory in a dirty state). Please use the {@link
 * `temp`} factory adapter to run a factory in a temporary directory and copy
 * it to a destination directory for safety.
 *
 * @param basePath - the ABSOLUTE base path of the file tree
 * @returns - a promise that will resolve if the instantiation is successful
 * and reject otherwise.
 */
export type FileTreeFactory = (basePath: string) => Promise<void>;

function isAsyncIterable<T>(it: Iterable<T> | AsyncIterable<T>): it is AsyncIterable<T> {
  return (it as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] !== undefined;
}

/**
 * Removes a path before passing it to a child worker.
 *
 * This will fail if `git` believes the path is dirty.
 *
 * @param worker - the child factory to call after ensuring the dir is safe.
 */
export function safeClean(
  worker: FileTreeFactory,
  options?: { actionIfDirty: "warn" | "throw" },
): FileTreeFactory {
  const { actionIfDirty } = options ?? {};
  return async (basePath) => {
    // If the path exists, then we will check it for a git diff before deleting it.
    if (existsSync(basePath)) {
      debug(basePath, "exists, checking it for safety.");

      const hasDiff = await git.hasDiff(basePath);
      if (hasDiff) {
        if (actionIfDirty === "warn") {
          warn(
            `the directory ${basePath} exists and is dirty (according to \`git\`); It will be overwritten`,
          );
        } else {
          throw new Error(
            `the directory ${basePath} exists and is dirty (according to \`git\`); commit or stash your changes first`,
          );
        }
      }

      debug(basePath, `is ${hasDiff ? "dirty" : "clean"}, removing it`);

      await rm(basePath, { recursive: true, force: true });
    }

    return worker(basePath);
  };
}

/**
 * Runs a file tree factory in a temporary directory before copying it for
 * safety.
 *
 * @param worker - the child factory to run in the temp directory
 */
export function temp(worker: FileTreeFactory): FileTreeFactory {
  return async (basePath) => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "devtool"));
    await worker(tmp);
    // Now copy and remove the temp
    await cp(tmp, basePath, { recursive: true });
    await rm(tmp, { recursive: true, force: true });
  };
}

/**
 * A file tree factory representing the creation of a directory named `name`,
 * with contents specified by an (async) iterator of child file tree factories.
 *
 * @param name - the name of the directory to create
 * @param contents - an Iterable or AsyncIterable of child factories to
 * instantiate within the directory, or a file tree to execute in the path
 * @returns - a factory for the directory
 */
export function dir(
  name: string,
  contents: FileTreeFactory | Iterable<FileTreeFactory> | AsyncIterable<FileTreeFactory>,
): FileTreeFactory {
  return async (basePath) => {
    // Create the directory for this model
    const selfPath = path.join(basePath, name);
    await mkdir(selfPath, { recursive: true });

    if (typeof contents === "function") {
      await contents(selfPath);
    } else if (isAsyncIterable(contents)) {
      for await (const model of contents) {
        await model(selfPath);
      }
    } else {
      for (const model of contents) {
        await model(selfPath);
      }
    }
  };
}

/**
 * Pass a file tree factory through to another lazy factory. This gives a user the opportunity to observe the path name.
 *
 * @param thunk - a function that will yield a file tree factory given a path
 * @returns a file tree factory that will first evaluate the thunk and then run it
 */
export function lazy(thunk: (name: string) => FileTreeFactory): FileTreeFactory {
  return (name) => thunk(name)(name);
}

/**
 * A file tree factory that copies a file from a source.
 *
 * @param name - the name of the destination file (to create within the file
 * tree)
 * @param source - the path (absolute or relative to CWD) to the source file to
 * copy
 */
export function copy(name: string, source: string): FileTreeFactory {
  return (basePath) => cp(source, path.join(basePath, name), { recursive: true });
}

/**
 * Contents of a file, represented as one of:
 *
 * - a `Buffer` of bytes to be written.
 * - a string to be encoded as UTF-8 and written.
 * - a deferred computation (function/thunk) that yields one of the above.
 */
export type FileContents =
  | Buffer
  | string
  | (() => Buffer | string)
  | (() => Promise<Buffer | string>);

/**
 * A file tree factory that creates a file with the given contents.
 *
 * @param name - the name of the destination file
 * @param contents - a `FileContents` representing the data to write
 */
export function file(name: string, contents: FileContents): FileTreeFactory {
  const getContentsAsBuffer = async (): Promise<Buffer> => {
    const immediateContents = typeof contents === "function" ? await contents() : contents;
    return Buffer.isBuffer(immediateContents)
      ? immediateContents
      : Buffer.from(immediateContents, "utf8");
  };

  return async (basePath) => {
    const dirName = path.resolve(basePath, path.dirname(name));
    await mkdir(dirName, { recursive: true });
    return writeFile(path.join(basePath, name), await getContentsAsBuffer());
  };
}
