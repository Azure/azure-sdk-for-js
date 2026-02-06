// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import { resolveProject } from "../util/resolveProject.ts";
import { createPrinter } from "../util/printer.ts";
import { leafCommand } from "../framework/command.ts";
import { makeCommandInfo } from "../framework/command.ts";
import fs from "node:fs/promises";
import { Check, isCheckFailedError } from "../framework/check.ts";

const log = createPrinter("check");

export const commandInfo = makeCommandInfo("check", "run package checks", {
  fix: {
    kind: "boolean",
    description: "attempt to fix failing checks, where supported",
    default: false,
  },
  tag: {
    kind: "string",
    description: "run checks that match the given tag only. Available tags: 'release', 'ci'",
  },
  verbose: {
    kind: "boolean",
    shortName: "v",
    description: "show output of check commands",
    default: false,
  },
});

export default leafCommand(commandInfo, async (options) => {
  const checkFileNames = await fs.readdir(path.join(import.meta.dirname, "..", "checks"));

  log.info("Running checks");

  let checksRun = 0;
  let checksPassed = 0;
  let checksFailed = 0;
  let warnings = 0;
  let checksSkipped = 0;

  for (const checkFile of checkFileNames) {
    const checks = (await import(path.posix.join("../checks", checkFile))) as Record<string, Check>;
    log(checkFile);
    for (const [exportName, check] of Object.entries(checks)) {
      if (options.tag) {
        // --tag specified, run checks which match that tag (including checks with wildcard "*")
        if (!check.tags) {
          continue;
        }

        if (
          check.tags !== "*" &&
          !check.tags.some((x) => x.toLowerCase() === options.tag?.toLowerCase())
        ) {
          continue;
        }
      } else {
        // --tag not specified, only run checks which don't have a tag or have tag "*"
        if (check.tags && check.tags !== "*") {
          continue;
        }
      }

      const name = check.name ?? exportName;
      try {
        const project = await resolveProject();

        if (!check.enable || (await check.enable?.(project))) {
          ++checksRun;
          await check.check({
            fix: !!check.hasFix && options.fix,
            verbose: options.verbose,
            project,
          });
          ++checksPassed;
          log(`  ✅ ${name}`);
        } else {
          ++checksSkipped;
        }
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        if (check.severity === "warning") {
          ++warnings;
          log(`  ⚠️  ${name} - ${errorMessage}`);
        } else {
          ++checksFailed;
          log(`  ❌ ${name} - ${errorMessage}`);
        }
        if (isCheckFailedError(e) && e.detail) {
          e.detail
            .split("\n")
            .map((x) => `  > ${x}`)
            .forEach((x) => log(x));
        }
      }
    }
  }

  log(
    `Ran ${checksRun} checks (passed: ${checksPassed}, failed: ${checksFailed}, warnings: ${warnings}, skipped: ${checksSkipped})`,
  );

  return checksFailed === 0;
});
