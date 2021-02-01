// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";

import { findMatchingFiles } from "../../util/findMatchingFiles";
import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject } from "../../util/resolveProject";

const log = createPrinter("run-samples");

const IGNORE = ["node_modules"];

const SAMPLE_CONFIGURATION_KEY = "//sampleConfiguration";

/**
 * An interface for the sample configuration metadata within an Azure SDK for
 * JavaScript package.json file
 */
interface SampleConfiguration {
  /**
   * The names of sample files to skip (if a file extension is provided, it
   * will be ignored)
   */
  skip: string[];
}

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
    if (/.*[\\\/]samples[\\\/].*/.exec(name)) {
      // This is an un-prepared sample, so just require it and it will run.
      await import(name);
    } else if (!/.*[\\\/]dist-samples[\\\/].*/.exec(name)) {
      // This is not an unprepared or a prepared sample
      log.warn("Executing a file that is neither in samples nor dist-samples.");
    } else {
      const { main: sampleMain } = await import(name);
      await sampleMain();
    }
  } catch (err) {
    const truncatedError: string = err
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
    throw new Error("At least one argument is required for run-samples");
  }

  const { packageJson, path: packageLocation } = await resolveProject(process.cwd());

  log.debug("Resolving samples metadata to:", packageLocation);

  const sampleConfiguration = packageJson[SAMPLE_CONFIGURATION_KEY] as
    | SampleConfiguration
    | undefined;

  const skips = sampleConfiguration?.skip?.map((skip) => skip.replace(/\.[jt]s$/, "")) ?? [];

  log.debug("Skipping the following samples:", skips);

  const samples = options.args.map((dir) => path.resolve(dir));

  // Patch the environment for the sample helper
  process.env.BATCH_RUN_SAMPLES = "true";

  const errors: Array<[string, string]> = [];

  for (const sample of samples) {
    const stats = await fs.stat(sample);
    if (stats.isFile()) {
      if (skips.some((skip) => sample.replace(/\.[jt]s$/, "").endsWith(skip))) {
        log.info(`Skipping ${sample} because it was configured to be skipped.`);
      } else {
        runSingle(sample, errors);
      }
    } else if (stats.isDirectory()) {
      for await (const fileName of findMatchingFiles(
        sample,
        (name, entry) => entry.isFile() && name.endsWith(".js"),
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
