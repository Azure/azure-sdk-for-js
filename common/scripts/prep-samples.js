// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const fs = require("fs");
const path = require("path");

// Accept a base directory (package directory) as an argument or use CWD
const args = process.argv.slice(2);

let baseDir;
if (args.length > 0) {
  baseDir = path.resolve(args[0]);
} else {
  baseDir = process.cwd();
}
const tsDir = path.join(baseDir, "samples", "typescript");

/**
 * Breadth-first search for files ending in .ts
 */
function findAllTsFiles(filesAndFolders) {
  const q = filesAndFolders.map(function(f) {
    return [f, tsDir];
  });
  const tsFiles = [];

  let idx = 0;

  while (idx !== q.length) {
    // [fs.Dirent, string] (file and dirName part of the full path)
    const [file, dirName] = q[idx];
    const fullPath = path.join(dirName, file.name);

    if (file.isSymbolicLink()) {
      continue;
    }

    if (file.isDirectory()) {
      // Enqueue children of this directory to the bfs
      fs.readdirSync(fullPath, { withFileTypes: true }).forEach(function(
        child
      ) {
        q.push([child, fullPath]);
      });
    } else if (file.isFile() && file.name.match(/.*\.ts$/)) {
      tsFiles.push(fullPath);
    }

    idx += 1;
  }

  return tsFiles;
}

/**
 * Replaces package imports with relative imports for CI
 *
 * @param {string} file the name of the file to open and process
 * @param {string} baseDir The base directory of the package
 * @param {string} pkgName name of the package to use when looking for package-local imports
 */
function enableLocalRun(file, baseDir, pkgName) {
  const fileContents = fs.readFileSync(file, { encoding: "utf-8" });
  const sbregex = new RegExp(
    `import\\s+(.*)\\s+from\\s+"${pkgName}";?\\s?`,
    "s"
  );
  if (!fileContents.match(sbregex)) {
    throw new Error(`Sample ${file} did not contain an import statement!`);
  }

  const relativeDir = path.dirname(file.replace(baseDir, ""));

  // `string.length - string.split(path.sep).join("").length` is a dirty but well-supported way to
  // count the depth of a path and that avoids the difficulty of creating a regexp constructor
  // that can escape both linux and windows path separators
  const depth =
    relativeDir.length - relativeDir.split(path.sep).join("").length;

  const relativeImportPath = new Array(depth).fill("..").join("/") + "/src";
  const updatedContents = fileContents.replace(
    sbregex,
    `import $1 from "${relativeImportPath}";`
  );

  fs.writeFileSync(file, updatedContents, { encoding: "utf-8" });
}

function main() {
  const package = require(path.join(baseDir, "package.json"));
  console.log(
    `Preparing samples for package: ${package.name}@${package.version}`
  );
  console.log("Package name", package.name);
  fs.readdir(tsDir, { withFileTypes: true }, function(err, files) {
    if (err) {
      console.error("Failed to read TypeScript samples directory:", args[0]);
      process.exit(1);
    }

    findAllTsFiles(files).forEach(function(fileName) {
      console.log("Updating imports in", fileName, "...");
      enableLocalRun(fileName, baseDir, package.name);
    });
  });
}

main();
