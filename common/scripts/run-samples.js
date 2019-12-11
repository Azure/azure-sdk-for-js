// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * run-samples.js
 *
 * Runs all JavaScript files in a directory, using the calling convention for
 * our sample code.
 */

const baseFS = require("fs");
const path = require("path");

const IGNORE = ["node_modules", "sampleHelpers.js"];

// Node >= 10 provide fs.promises, but since we're still building Node 8 for now
// we need to use util.promisify if fs.promises doesn't exist
const fs =
  baseFS.promises ||
  (() => {
    const promisify = require("util").promisify;
    return {
      readdir: promisify(baseFS.readdir)
    };
  })();

/**
 * Breadth-first search for files matching a given predicate
 *
 * @param {string} tsDir The root of the sample tree to search
 * @param {(fs.Entry) => boolean} matches Predicate that decides whether or not a file entry is included
 * @returns
 */
async function* findMatchingFiles(tsDir, matches) {
  const initialFiles = await fs.readdir(tsDir, { withFileTypes: true });

  // BFS Queue and queue index
  const q = initialFiles.map(f => [f, tsDir]);

  while (q.length) {
    // [fs.Dirent, string] (file and dirName part of the full path)
    const [entry, dirName] = q.shift();
    const fullPath = path.join(dirName, entry.name);

    if (IGNORE.includes(entry.name)) {
      console.log("[run-samples] Ignoring", fullPath);
      continue;
    }

    if (entry.isDirectory()) {
      // Enqueue children of this directory to the bfs
      const children = await fs.readdir(fullPath, { withFileTypes: true });
      for (const child of children) {
        q.push([child, fullPath]);
      }
    } else if (matches(entry)) {
      yield fullPath;
    } else {
      console.log("[run-samples] Skipping", fullPath);
    }
  }

  // The full trace of files visited by the iterator is returned and can be accessed using `iter.value`
  // once it is `done`, in case it is ever needed for debugging
  return q;
}

async function main() {
  // Accept a base directory
  const args = process.argv.slice(2);

  let sampleDir;
  if (args.length) {
    sampleDir = path.resolve(args[0]);
  } else {
    sampleDir = process.cwd();
  }

  // Patch the environment for the sample helper
  process.env.BATCH_RUN_SAMPLES = "true";

  console.log("[run-samples] Running all samples in:", sampleDir);

  let didError = false;

  for await (const fileName of findMatchingFiles(
    sampleDir,
    entry => entry.isFile() && entry.name.endsWith(".js")
  )) {
    console.log("[run-samples] Running", fileName);
    const { main: sampleMain } = require(fileName);
    try {
      await sampleMain();
    } catch (err) {
      didError = true;
      console.error("[run-samples] Error in", fileName);
      console.error(err);
      console.warn("[run-samples] Continuing ...");
    }
  }

  if (didError) {
    throw new Error("errors occurred during sample execution");
  }
}

main().catch(err => {
  console.error("[run-samples] Error:", err);
  process.exit(1);
});
