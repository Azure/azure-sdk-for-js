// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "fs-extra";
import path from "node:path";
import { findMatchingFiles } from "../../util/findMatchingFiles";
import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject } from "../../util/resolveProject";
import { getSampleConfiguration } from "../../util/samples/configuration";
import { run } from "../../util/run";
import { getSamplesVersionFolder } from "../../util/samples/generation";

const log = createPrinter("run-samples");

const IGNORE = ["node_modules"];

export const commandInfo = makeCommandInfo(
  "run",
  "execute a sample or all samples within a directory",
);

export default leafCommand(commandInfo, async (options) => {
  const filter = options.args[0];

  const projectInfo = await resolveProject(process.cwd());
  const { packageJson, path: packageLocation } = projectInfo;

  log.debug("Resolving samples metadata to:", packageLocation);

  const sampleConfiguration = getSampleConfiguration(packageJson);

  const skips = sampleConfiguration.skip ?? [];

  log.debug("Skipping the following samples:", skips);

  if (sampleConfiguration.skipFolder) {
    log.warn(
      "`skipFolder` is specified in the sample configuration, but it is ignored in this context.",
    );
    log.warn("To skip samples in live tests pipelines, disable them using the package's tests.yml");
  }

  const tsSamplesLocation = path.resolve(
    packageLocation,
    "samples",
    getSamplesVersionFolder(projectInfo),
    "typescript",
  );
  const samplesPackageJsonPath = path.resolve(tsSamplesLocation, "package.json");
  const originalPackageJson = fs.readFileSync(samplesPackageJsonPath);

  log.info("Installing sample dependencies");
  await run(["pnpm", "install", packageLocation], { cwd: tsSamplesLocation, stdio: "inherit" });
  await run(["pnpm", "install"], { cwd: tsSamplesLocation, stdio: "inherit" });

  log.info("Building TypeScript samples");
  await run(["pnpm", "run", "build"], { cwd: tsSamplesLocation, stdio: "inherit" });

  log.info("Running samples");

  const distFolder = path.resolve(tsSamplesLocation, "dist");
  for await (const filename of findMatchingFiles(
    distFolder,
    (name, entry) => entry.isFile() && !!new RegExp(filter ?? "").exec(name),
    {
      skips,
      ignore: IGNORE,
    },
  )) {
    log.info("Running sample:", filename);
    try {
      await run(["node", filename], { stdio: "inherit" });
    } catch (e) {
      log.error("Sample failed:", filename);
    }
  }

  await fs.writeFile(samplesPackageJsonPath, originalPackageJson);

  return true;
});
