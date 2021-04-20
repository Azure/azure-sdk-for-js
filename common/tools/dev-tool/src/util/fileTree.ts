// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import fs from "fs-extra";
import os from "os";
import path from "path";

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
 * instantiate within the directory
 * @returns - a factory for the directory
 */
export function dir(
  name: string,
  contents: Iterable<FileTreeFactory> | AsyncIterable<FileTreeFactory>
): FileTreeFactory {
  return async (basePath) => {
    // Create the directory for this model
    const selfPath = path.join(basePath, name);
    await fs.ensureDir(selfPath);

    if (isAsyncIterable(contents)) {
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

  return async (basePath) => fs.writeFile(path.join(basePath, name), getContentsAsBuffer());
}
