// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * run-samples.js
 *
 * Runs all JavaScript files in a directory, using the calling convention for
 * our sample code.
 */

import chalk from "chalk";
import path from "path";

import { findMatchingFiles } from "../util/findMatchingFiles";
import { createPrinter } from "../util/printer";

const log = createPrinter("run-samples");

const IGNORE = ["node_modules"];

export default async function(...args: string[]): Promise<boolean> {
  if (args.length === 0) {
    throw new Error("At least one argument is required for run-samples");
  }

  const sampleDirs = args.map(dir => path.resolve(dir));

  // Patch the environment for the sample helper
  process.env.BATCH_RUN_SAMPLES = "true";

  log.info("Running all samples in:", sampleDirs.join(", "));

  let errors = [];

  for (const sampleDir of sampleDirs) {
    for await (const fileName of findMatchingFiles(
      sampleDir,
      (name, entry) => entry.isFile() && name.endsWith(".js"),
      {
        ignore: IGNORE
      }
    )) {
      log("Running", fileName);
      const { main: sampleMain } = require(fileName);
      try {
        await sampleMain();
      } catch (err) {
        const truncatedError = err
          .toString()
          .split("\n")[0]
          .slice(0, 100);
        errors.push([path.basename(fileName), truncatedError]);
        log.warn("Error in", fileName, ":", err);
        log.warn("Continuing ...");
      }
    }
  }

  if (errors.length > 0) {
    log.error("Errors occurred in the following files:");
    for (const [fileName, error] of errors) {
      log.error("  -", fileName, "(", error, ")");
    }

    return false;
  }

  return true;
}
