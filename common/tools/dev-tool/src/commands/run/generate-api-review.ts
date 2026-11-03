// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { stringify } from "yaml";
import { leafCommand, makeCommandInfo } from "../../framework/command.ts";
import { generateApiReview } from "../../util/apiReview.ts";
import { createPrinter } from "../../util/printer.ts";
import { resolveProject } from "../../util/resolveProject.ts";

const log = createPrinter("generate-api-review");

export const commandInfo = makeCommandInfo(
  "generate-api-review",
  "Generate api.md and api.metadata.yml for API review.",
  {
    "package-root": {
      kind: "string",
      description: "Package directory (defaults to the package containing the current directory).",
    },
    "output-dir": {
      kind: "string",
      description: "Directory to write api.md and api.metadata.yml (defaults to the package root).",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  try {
    const packageRoot = path.resolve(options["package-root"] ?? (await resolveProject()).path);
    const outputDir = path.resolve(options["output-dir"] ?? packageRoot);
    const { apiMd, metadata } = await generateApiReview(packageRoot);
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, "api.md"), apiMd);
    await writeFile(path.join(outputDir, "api.metadata.yml"), stringify(metadata));
    log.info(`Wrote api.md and api.metadata.yml to ${outputDir}`);
    return true;
  } catch (error: unknown) {
    log.error(error instanceof Error ? error.message : String(error));
    return false;
  }
});
