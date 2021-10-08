// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";

import { findMatchingFiles } from "../../util/findMatchingFiles";
import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject } from "../../util/resolveProject";
import { getSampleConfiguration } from "../../util/sampleConfiguration";

const log = createPrinter("run-samples");

const IGNORE = ["node_modules"];

export const commandInfo = makeCommandInfo(
  "run",
  "execute a sample or all samples within a directory"
);

/**
 * Run a single sample file, accumulating any thrown errors into `accumulatedErrors`
 *
 * @param name the file to run
 * @param accumulatedErrors an array to push truncated errors onto as tuples of [fileName, error]
 */
async function runSingle(name: string, accumulatedErrors: Array<[string, string]>) {
  log("Running", name);
  try {
    if (/.*[\\\/]samples(-dev)?[\\\/].*/.exec(name)) {
      // This is an un-prepared sample, so just require it and it will run.
      await import(name);
    } else if (!/.*[\\\/]dist-samples[\\\/].*/.exec(name)) {
      // This is not an unprepared or a prepared sample
      log.error("Skipped. This file is not in any samples folder.");
    } else {
      const { main: sampleMain } = await import(name);
      await sampleMain();
    }
  } catch (err) {
    const truncatedError: string = (err as Error)
      .toString()
      .split("\n")[0]
      .slice(0, 100);
    accumulatedErrors.push([path.basename(name), truncatedError]);
    log.warn(`Error in ${name}:`);
    log.warn(err);
  }
}

export default leafCommand(commandInfo, async (options) => {
  if (options.args.length === 0) {
    log.error("at least one argument is required");
    return false;
  }

  const { packageJson, path: packageLocation } = await resolveProject(process.cwd());

  log.debug("Resolving samples metadata to:", packageLocation);

  const sampleConfiguration = getSampleConfiguration(packageJson);

  const skips = sampleConfiguration.skip ?? [];

  log.debug("Skipping the following samples:", skips);

  if (sampleConfiguration.skipFolder) {
    log.warn(
      "`skipFolder` is specified in the sample configuration, but it is ignored in this context."
    );
    log.warn("To skip samples in live tests pipelines, disable them using the package's tests.yml");
  }

  const samples = options.args.map((dir) => path.resolve(dir));

  const errors: Array<[string, string]> = [];

  for (const sample of samples) {
    const stats = await fs.stat(sample);
    if (stats.isFile()) {
      // We don't consider the skips if the file was _explicitly_ asked for
      runSingle(sample, errors);
    } else if (stats.isDirectory()) {
      for await (const fileName of findMatchingFiles(
        sample,
        (name, entry) => entry.isFile() && /\.[jt]s$/.exec(name) !== null,
        {
          ignore: IGNORE,
          skips
        }
      )) {
        await runSingle(fileName, errors);
      }
    } else {
      log.warn(`Sample ${sample} is neither a file nor a directory.`);
      log.warn("Continuing ...");
      errors.push([path.basename(sample), "Neither a file nor a directory"]);
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
});
