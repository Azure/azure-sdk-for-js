// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import fs from "fs-extra";
import os from "os";
import path from "path";

import { createPrinter } from "./printer";
import * as git from "./git";

const { debug } = createPrinter("fileTree");

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
  return (it as AsyncIterable<unknown>)[Symbol.asyncIterator] !== undefined;
}

/**
 * Removes a path before passing it to a child worker.
 *
 * This will fail if `git` believes the path is dirty.
 *
 * @param worker - the child factory to call after ensuring the dir is safe.
 */
export function safeClean(worker: FileTreeFactory): FileTreeFactory {
  return async (basePath) => {
    // If the path exists, then we will check it for a git diff before deleting it.
    if (await fs.pathExists(basePath)) {
      debug(basePath, "exists, checking it for safety.");

      if (await git.hasDiff(basePath)) {
        throw new Error(
          `the directory ${basePath} exists and is dirty (according to \`git\`); commit or stash your changes first`
        );
      }

      debug(basePath, "is clean, removing it");

      await fs.remove(basePath);
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
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "devtool"));
    await worker(tmp);
    // Now copy and remove the temp
    await fs.copy(tmp, basePath);
    await fs.remove(tmp);
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
  contents: FileTreeFactory | Iterable<FileTreeFactory> | AsyncIterable<FileTreeFactory>
): FileTreeFactory {
  return async (basePath) => {
    // Create the directory for this model
    const selfPath = path.join(basePath, name);
    await fs.ensureDir(selfPath);

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
  return (basePath) => fs.copy(source, path.join(basePath, name));
}

/**
 * Contents of a file, represented as one of:
 *
 * - a `Buffer` of bytes to be written.
 * - a string to be encoded as UTF-8 and written.
 * - a deferred computation (function/thunk) that yields one of the above.
 */
export type FileContents = Buffer | string | (() => Buffer | string);

/**
 * A file tree factory that creates a file with the given contents.
 *
 * @param name - the name of the destination file
 * @param contents - a `FileContents` representing the data to write
 */
export function file(name: string, contents: FileContents): FileTreeFactory {
  const getContentsAsBuffer = (): Buffer => {
    const immediateContents = typeof contents === "function" ? contents() : contents;
    return Buffer.isBuffer(immediateContents)
      ? immediateContents
      : Buffer.from(immediateContents, "utf8");
  };

  return async (basePath) => {
    const dirName = path.resolve(basePath, path.dirname(name));
    await fs.ensureDir(dirName);
    return fs.writeFile(path.join(basePath, name), getContentsAsBuffer());
  };
}
