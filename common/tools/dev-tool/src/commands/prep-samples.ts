// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * prep-samples.ts
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

import fs from "fs-extra";
import minimist from "minimist";
import path from "path";

import { createPrinter } from "../util/printer";
import { findMatchingFiles } from "../util/findMatchingFiles";
import { resolveProject } from "../util/resolveProject";

const log = createPrinter("prep-samples");

export const helpText = "prepare samples for local source-linked execution";

/**
 * Replaces package require/import statements with relative paths for CI
 *
 * @param fileName the name of the file to open and process
 * @param baseDir the base directory of the package
 * @param pkgName name of the package to use when looking for package-local imports
 */
async function enableLocalRun(
  fileName: string,
  baseDir: string,
  pkgName: string
) {
  const fileContents = await fs.readFile(fileName, { encoding: "utf-8" });
  const isTs = fileName.endsWith(".ts");
  const importRegex = isTs
    ? new RegExp(`import\\s+(.*)\\s+from\\s+"${pkgName}";?\\s?`, "s")
    : new RegExp(`const\\s+(.*)\\s*=\\s*require\\("${pkgName}"\\);?\\s?`, "s");

  if (!importRegex.exec(fileContents)) {
    // With the newer methods of using helper files and batch running, this
    // should be a warning
    log.warn(
      `skipping ${fileName} because it did not contain a matching import/require`
    );
    return;
  }

  const relativeDir = path.dirname(fileName.replace(baseDir, ""));

  // `string.length - string.split(path.sep).join("").length` is a dirty but well-supported way to
  // count the depth of a path and that avoids the difficulty of creating a regexp constructor
  // that can escape both linux and windows path separators
  const depth =
    relativeDir.length - relativeDir.split(path.sep).join("").length;

  let relativePath = new Array(depth).fill("..").join("/");

  if (isTs) {
    // TypeScript imports should use src directly
    relativePath += "/src";
  }

  const importRenamedContents = fileContents.replace(
    importRegex,
    isTs
      ? `import $1 from "${relativePath}";`
      : `const $1 = require("${relativePath}");`
  );

  // Remove trailing call to main()
  const updatedContents = importRenamedContents.replace(
    new RegExp("main\\(\\)\\.catch.*", "s"),
    isTs ? "" : "module.exports = { main };\n"
  );

  log("Updating imports in", fileName);
  return fs.writeFile(fileName, updatedContents, { encoding: "utf-8" });
}

async function* cat<T>(...generators: AsyncIterable<T>[]): AsyncIterable<T> {
  for (const g of generators) {
    yield* g;
  }
}

export default async function(...args: string[]): Promise<boolean> {
  const parsedArgs = minimist(args);

  let argumentDir;
  if (parsedArgs._.length) {
    argumentDir = path.resolve(parsedArgs._[0]);
  } else {
    argumentDir = process.cwd();
  }

  const pkg = await resolveProject(argumentDir);

  log.info("Preparing samples for package:", `${pkg.name}@${pkg.version}`);

  // Create dist-samples and copy to it
  const outputDir = path.join(pkg.path, "dist-samples");
  if (fs.existsSync(outputDir)) {
    log.warn("Cleaning up old dist-samples folder.");
    await fs.remove(outputDir);
  }
  await fs.copy(path.join(pkg.path, "samples"), outputDir);

  const tsDir = path.join(outputDir, "typescript", "src");
  const tsFiles = findMatchingFiles(
    tsDir,
    (name, entry) =>
      entry.isFile() && name.endsWith(".ts") && !name.endsWith(".d.ts")
  );

  const jsDir = path.join(outputDir, "javascript");
  const jsFiles = findMatchingFiles(
    jsDir,
    (name, entry) => entry.isFile() && name.endsWith(".js")
  );

  for await (const fileName of cat(tsFiles, jsFiles)) {
    await enableLocalRun(fileName, pkg.path, pkg.name);
  }

  return true;
}
