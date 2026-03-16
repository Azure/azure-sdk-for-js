// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * cli.ts — Entry point for the test-gen CLI tool.
 *
 * Usage:
 *   test-gen <package-dir> [--model <name>] [--dry-run]
 */

import { parseArgs } from "node:util";
import { resolve } from "node:path";
import { runSinglePass } from "./runner.ts";
import { fileExists } from "./utils.ts";
import { defaults } from "./config.ts";

function usage(): void {
  console.log(`
test-gen — Coverage-driven test generation tool for Azure SDK packages

USAGE:
  test-gen <package-dir> [options]

  Runs single-pass test generation: measure once → generate → verify.

OPTIONS:
  --model <name>    LLM model name (default: ${defaults.llm.model})
  --concurrency <n> Process N source files in parallel (default: 1)
  --dry-run         Print generated tests to console instead of writing to disk
  --help            Show this help message
`);
}

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      model: { type: "string", default: defaults.llm.model },
      concurrency: { type: "string", default: "1" },
      "dry-run": { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
    allowPositionals: true,
    strict: true,
  });

  if (values.help || positionals.length === 0) {
    usage();
    process.exit(0);
  }

  const packageDir = resolve(positionals[0]);
  if (!(await fileExists(packageDir))) {
    console.error(`ERROR: Package directory not found: ${packageDir}`);
    process.exit(1);
  }

  const concurrency = Math.max(1, parseInt(values.concurrency!, 10) || 1);

  const controller = new AbortController();
  process.on("SIGINT", () => {
    console.log("\n⏹️  Aborting after current iteration…");
    controller.abort();
  });

  await runSinglePass({
    packageDir,
    dryRun: values["dry-run"] ?? false,
    signal: controller.signal,
    config: {
      llm: {
        model: values.model!,
      },
      loop: {
        concurrency,
      },
    },
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
