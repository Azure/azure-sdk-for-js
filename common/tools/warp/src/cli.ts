#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseArgs } from "node:util";
import { build } from "./build.ts";
import { setLogLevel } from "./logger.ts";

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      config: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      "no-clean": { type: "boolean", default: false },
      incremental: { type: "boolean", default: false },
      parallel: { type: "boolean", default: false },
      stats: { type: "boolean", default: false },
      verbose: { type: "boolean", default: false },
      quiet: { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
    allowPositionals: true,
    strict: true,
  });

  const command = positionals[0];

  if (!command || command === "help" || values.help) {
    printUsage();
    process.exit(0);
  }

  // Set log level (#7)
  if (values.quiet) {
    setLogLevel("quiet");
  } else if (values.verbose) {
    setLogLevel("verbose");
  }

  if (command === "watch") {
    // Watch mode (#6)
    const { watch } = await import("./watch.js");
    const ac = await watch({
      configPath: values.config,
      clean: !values["no-clean"],
      incremental: values.incremental,
      parallel: values.parallel,
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      ac.abort();
      process.exit(0);
    });
    return;
  }

  if (command !== "build") {
    console.error(`[warp] Unknown command: ${command}`);
    printUsage();
    process.exit(1);
  }

  const result = await build({
    dryRun: values["dry-run"],
    clean: !values["no-clean"],
    incremental: values.incremental,
    parallel: values.parallel,
    stats: values.stats,
    configPath: values.config,
  });

  if (!result.success) {
    process.exit(1);
  }
}

function printUsage(): void {
  console.log(`
Usage: warp <command> [options]

Commands:
  build             Compile all targets
  watch             Build then watch for source changes and rebuild

Options:
  --config <path>   Path to warp config file (resolved relative to cwd)
  --dry-run         Validate config and show exports diff without compiling
  --no-clean        Skip cleaning outDirs before compilation
  --incremental     Use .tsbuildinfo for faster warm builds
  --parallel        Compile independent targets in parallel using worker threads
  --stats           Compute and display size and API surface report
  --verbose         Print debug-level detail (cache hits, file lists)
  --quiet           Suppress all output except errors
  --help            Show this help message
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
