// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { resolveRoot } from "../../util/resolveProject";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";

export const commandInfo = makeCommandInfo(
  "extract-api-v2",
  "Extracts the public API graph for all export conditions using sdk-chat.",
  {
    output: {
      shortName: "o",
      kind: "string",
      default: "review-v2",
      description: "Output directory for the API graph (default: review-v2)",
    },
    language: {
      shortName: "l",
      kind: "string",
      default: "typescript",
      description: "Language to extract (default: typescript)",
    },
  },
);

const log = createPrinter("extract-api-v2");

export default leafCommand(commandInfo, async (options) => {
  const packageDir = process.cwd();
  const repoRoot = await resolveRoot(packageDir);
  const sdkChatProject = path.join(repoRoot, "eng", "tools", "sdk-chat", "src", "Microsoft.SdkChat");
  const outputDir = path.resolve(packageDir, options.output);

  log.info(`Extracting API graph for ${packageDir}`);
  log.info(`Output: ${outputDir}`);

  // Clean output directory if it exists
  if (existsSync(outputDir)) {
    log.info("Cleaning existing output directory...");
    await rm(outputDir, { recursive: true });
  }

  const result = spawnSync(
    "dotnet",
    [
      "run",
      "--project",
      sdkChatProject,
      "--",
      "package",
      "api",
      "graph",
      packageDir,
      "--language",
      options.language,
      "--output",
      outputDir,
    ],
    {
      stdio: "inherit",
      cwd: packageDir,
    },
  );

  if (result.status !== 0) {
    log.error("API graph extraction failed.");
    if (result.error) {
      log.error(result.error.message);
    }
    return false;
  }

  log.info("API graph extraction complete.");

  // Type-check the generated declarations
  const tsconfigPath = path.join(outputDir, "tsconfig.json");
  if (existsSync(tsconfigPath)) {
    log.info("Running tsc -b --noEmit on generated output...");
    const tscResult = spawnSync("tsc", ["-b", "--noEmit", tsconfigPath], {
      stdio: "inherit",
      cwd: outputDir,
    });

    if (tscResult.status !== 0) {
      log.error("Type-checking failed for generated API declarations.");
      return false;
    }

    log.info("Type-checking passed.");
  }

  return true;
});
