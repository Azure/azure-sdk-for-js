// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * prep-samples.js
 *
 * Prepares sample files for execution in CI by replacing abosolute package imports with relative
 * imports. This is useful because it allows us to check in "camera-ready" copies of our samples
 * so that they can be ingested directly into external documentation pipelines, while still allowing
 * us to compile and run our samples in CI.
 *
 * Usage: node prep-samples.js [PACKAGE PATH]
 * - PACKAGE PATH should be set to the directory of a `package.json` for a package that contains
 *   TypeScript samples.
 * - If PACKAGE PATH is not specified, CWD will be used
 *
 * The command expects to find a directory tree `samples/typescript` under PACKAGE PATH.
 *
 * WARNING: This script ___WILL NOT___ revert changes it makes to the samples. Make sure any staged
 * changes you have made to the samples are committed to git or otherwise preserved, as this script
 * will completely overwrite them!
 */

const baseFS = require("fs");
const path = require("path");

// Node >= 10 provide fs.promises, but since we're still building Node 8 for now
// we need to use util.promisify if fs.promises doesn't exist
const fs =
  baseFS.promises ||
  (() => {
    const promisify = require("util").promisify;
    return {
      readdir: promisify(baseFS.readdir),
      readFile: promisify(baseFS.readFile),
      stat: promisify(baseFS.stat),
      writeFile: promisify(baseFS.writeFile)
    };
  })();

/**
 * Breadth-first search for files ending in .ts, starting from `tsDir`
 *
 * @param {string} tsDir The root of the sample tree to search
 * @returns
 */
async function* findAllTsFiles(tsDir) {
  const initialFiles = await fs.readdir(tsDir, { withFileTypes: true });

  // BFS Queue and queue index
  const q = initialFiles.map(f => [f, tsDir]);

  while (q.length) {
    // [fs.Dirent, string] (file and dirName part of the full path)
    const [entry, dirName] = q.shift();
    const fullPath = path.join(dirName, entry.name);

    if (entry.isDirectory()) {
      // Enqueue children of this directory to the bfs
      const children = await fs.readdir(fullPath, { withFileTypes: true });
      for (const child of children) {
        q.push([child, fullPath]);
      }
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".ts") &&
      !entry.name.endsWith(".d.ts")
    ) {
      yield fullPath;
    } else if (
      entry.isBlockDevice() ||
      entry.isCharacterDevice() ||
      entry.isFIFO() ||
      entry.isSocket() ||
      entry.isSymbolicLink()
    ) {
      console.warn(
        "[prep-samples] WARNING: Encountered a special file in the sample tree. Skipping:",
        fullPath
      );
    }
  }

  // The full trace of files visited by the iterator is returned and can be accessed using `iter.value`
  // once it is `done`, in case it is ever needed for debugging
  return q;
}

/**
 * Replaces package imports with relative imports for CI
 *
 * @param {string} file the name of the file to open and process
 * @param {string} baseDir The base directory of the package
 * @param {string} pkgName name of the package to use when looking for package-local imports
 */
async function enableLocalRun(fileName, baseDir, pkgName) {
  const fileContents = await fs.readFile(fileName, { encoding: "utf-8" });
  const importRegex = new RegExp(
    `import\\s+(.*)\\s+from\\s+"${pkgName}";?\\s?`,
    "s"
  );

  if (!importRegex.exec(fileContents)) {
    throw new Error(`Sample ${fileName} did not contain an import statement!`);
  }

  const relativeDir = path.dirname(fileName.replace(baseDir, ""));

  // `string.length - string.split(path.sep).join("").length` is a dirty but well-supported way to
  // count the depth of a path and that avoids the difficulty of creating a regexp constructor
  // that can escape both linux and windows path separators
  const depth =
    relativeDir.length - relativeDir.split(path.sep).join("").length;

  const relativeImportPath = new Array(depth).fill("..").join("/") + "/src";
  const updatedContents = fileContents.replace(
    importRegex,
    `import $1 from "${relativeImportPath}";`
  );

  return fs.writeFile(fileName, updatedContents, { encoding: "utf-8" });
}

async function main() {
  // Accept a base directory (package directory) as an argument or use CWD
  const args = process.argv.slice(2);

  let baseDir;
  if (args.length) {
    baseDir = path.resolve(args[0]);
  } else {
    baseDir = process.cwd();
  }

  const tsDir = path.join(baseDir, "samples", "typescript");
  const package = require(path.join(baseDir, "package.json"));

  console.log(
    "[prep-samples] Preparing samples for package:",
    `${package.name}@${package.version}`
  );

  for await (const fileName of findAllTsFiles(tsDir)) {
    console.log("[prep-samples] Updating imports in", fileName);
    await enableLocalRun(fileName, baseDir, package.name);
  }
}

main().catch(err => {
  console.error("[prep-samples] Error:", err);
  process.exit(1);
});
