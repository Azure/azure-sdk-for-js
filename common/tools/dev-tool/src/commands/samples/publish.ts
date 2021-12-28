// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This module is the core of the samples publication system.
 *
 * It handles collecting, checking, and processing all of the package's data
 * that are eventually used to generate a coherent set of sample programs.
 */

import path from "path";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import { PUBLIC_SAMPLES_BASE } from "../../util/samples/info";
import { makeSamplesFactory } from "../../util/samples/generation";

export const log = createPrinter("publish");

export const commandInfo = makeCommandInfo(
  "publish",
  `make a "camera-ready" copy of a package's samples`,
  {
    "output-path": {
      kind: "string",
      description: "specify the path of the output directory where the samples will be written",
      shortName: "o",
    },
  } as const
);

/**
 * "Publishes" samples by creating copies of the existing samples sources that
 * have the associated metadata used to publish samples.
 */
export default leafCommand(commandInfo, async (options) => {
  const projectInfo = await resolveProject(process.cwd());

  log.info(`Creating camera-ready samples for ${projectInfo.name}@${projectInfo.version}`);

  const basePath = options["output-path"] ?? path.join(projectInfo.path, PUBLIC_SAMPLES_BASE);

  log.debug("Using output path:", basePath);

  // This creates the samples output
  try {
    // Gather sample meta-information and use it to assemble a template
    const factory = await makeSamplesFactory(projectInfo);

    // This is where the actual magic of creating the output from the template happens
    await factory(basePath);
  } catch (ex) {
    log.error((ex as Error).message);
    return false;
  }

  log.success("Created camera-ready samples.");

  return true;
});
